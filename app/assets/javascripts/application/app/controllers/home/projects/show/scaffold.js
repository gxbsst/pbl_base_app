(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowScaffoldController', ProjectShowScaffoldController);

    ProjectShowScaffoldController.$inject = ['$scope', 'RESOURCE_TYPES', 'Resources', 'project','authority',
        'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts', 'ProjectGauges', 'Groupings',
        'Discussions', 'Works', 'TYPE_DEFIN'];

    function ProjectShowScaffoldController($scope, RESOURCE_TYPES, Resources, project,authority,
                                           Disciplines, Knowledge, Tasks, ProjectProducts, ProjectGauges, Groupings,
                                           Discussions, Works, TYPE_DEFIN) {

        var vm = this;
        vm.showTask = showTask;
        vm.showtask = [];

        project.knowledges = project.knowledges || [];
        vm.project = project;
        vm.tempKnowledge = '';
        vm.addKnowledge = addKnowledge;
        vm.removeKnowledge = removeKnowledge;
        vm.disciplines = [];
        vm.chooseType = chooseType;
        vm.chooseSubmitWay = chooseSubmitWay;
        vm.getResources = getResources;
        vm.removeResource = removeResource;
        vm.removeTask = removeTask;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.onSetTime = onSetTime;
        vm.beforeRender = beforeRender;
        vm.getTask = getTask;
        vm.finalpost = finalpost;
        vm.releaseTask = releaseTask;
        vm.groupcheck = groupcheck;
        vm.groupclick = groupclick;
        $scope.$on('setAddTask', setAddTask);

        $scope.$on('onProjectTaskGauges', onProjectTaskGauges);

        getProjectGauges();
        onProjectTasks();
        onProjectProducts();

        getDiscussions();
        getAuthority();

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {

            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });
        Disciplines.all(function (data) {
            vm.disciplines = data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });

        vm.chooseType = chooseType;

        vm.showTask(0);

        function getAuthority(){
            switch(authority)
            {
                case 'teacher':
                    vm.authority=true;
                    break;
                case 'student':
                    vm.authority=false;
                    break;
                default:
                    vm.authority=false;
            }
        }
        function getDiscussions() {
            Discussions.all({
                project_id: project.id
            }, function (result) {
                var discussions = result.data,
                    count = discussions.length;
                if (count) {
                    vm.released = true;
                    vm.count = count;
                    vm.groups = discussions;
                } else {
                    getGroupings();
                }
            });
        }

        function getGroupings() {
            Groupings.get({
                projectId: project.id
            }, function (result) {
                var cache = result.cache;
                if (cache) {
                    cache = JSON.parse(cache);
                    vm.count = cache.count;
                    vm.groups = cache.groups;
                }
            });
        }


        function getProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function (result) {
                project.rules = result.data;
            });
        }

        function releaseTask(task, $event) {
            $event.stopPropagation();
            var request = releaseTaskTest(task);
            if (request[0]) {
                if (confirm('您确定要发布这个任务吗？')) {
                    console.log(task.submit_way);
                    if (task.submit_way == TYPE_DEFIN.Group) {
                        console.log(task.discussion_ids);
                        for (var i = 0; i < task.discussion_ids.length; i++) {
                            console.log(task.discussion_ids[i]);
                            Works.add({
                                work: {
                                    'task_id': task.id, 'task_type': task.task_type,
                                    'acceptor_id': task.discussion_ids[i], 'acceptor_type': task.submit_way,
                                    'sender_id': vm.project.user_id
                                }
                            });
                        }
                    } else {
                        var groups = vm.groups.find(function (item) {
                            return task.discussion_ids.findOne(function (taskitem) {
                                return taskitem == item.id;
                            })
                        });
                        var members = groups.map(function (group) {
                            return group.members;
                        }).join(",").split(",");

                        console.log(members);
                        for (var i = 0; i < members.length; i++) {
                            console.log(members[i]);
                            Works.add({
                                work: {
                                    'task_id': task.id, 'task_type': task.task_type,
                                    'acceptor_id': members[i], 'acceptor_type': task.submit_way,
                                    'sender_id': vm.project.user_id
                                }
                            });
                        }
                    }
                    Tasks.release({
                        taskId: task.id,
                        action: 'release'
                    }, function (result) {
                        onProjectTasks();
                    });
                }

            } else {
                alert(request[1]);
            }
        }

        function releaseTaskTest(task) {
            if (task.discussion_ids.length == 0 || task.discussion_ids == null) {
                return [false, "请选择参与组后再提交任务"];
            }
            return [true, ""];

        }


        function showTask(id) {
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id] = !vm.showtask[id];
        }

        function onUploadBegin(product) {
            return function () {
                product.$uploading = true;
            }
        }

        function onUploadSuccess(product) {
            return function () {
                product.resource && Resources.remove({
                    resourceId: product.resource.id
                });
                delete product.$uploading;
                getTaskResources();
            }
        }

        function getTaskResources() {
            Resources.all({
                owner_types: RESOURCE_TYPES.project.task,
                owner_ids: vm.tasks.map(function (task) {
                    return task.id;
                }).join(',')
            }, function (result) {
                vm.resources = result.data;
            });
        }

        function getResources(task) {
            return (vm.resources || []).find(function (resource) {
                return resource.owner_type == RESOURCE_TYPES.project.task && resource.owner_id == task.id;
            });
        }

        function removeResource(resource) {
            resource.$disabled = true;
            Resources.remove({
                resourceId: resource.id
            }, getTaskResources);
        }

        function chooseType(task, typeval, disabled) {
            task.task_type = typeval;
            Tasks.update({taskId: task.id, task: {'task_type': typeval}});
        }

        function chooseSubmitWay(task, typeval, disabled) {
            task.submit_way = typeval;
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'submit_way': typeval}});
            }
        }

        function finalpost(task) {
            console.log(typeof task.final, task.final)
            Tasks.update({taskId: task.id, task: {'final': task.final}});
        }

        function addKnowledge() {
            //vm.project.knowledge.push(vm.tempKnowledge);
            Knowledge.add({
                knowledge: {
                    project_id: vm.project.id,
                    description: vm.tempKnowledge
                }
            }, onProjectKnowledge);
            vm.tempKnowledge = "";
        }

        function removeKnowledge(knowledge) {
            Knowledge.remove({knowledgeId: knowledge.id}, onProjectKnowledge);
        }

        function onProjectKnowledge() {
            Knowledge.all(
                {project_id: vm.project.id},
                function (data) {
                    vm.project.knowledges = data.data;
                    console.log(data);
                });
        }

        function setAddTask(event, task) {
            //vm.project.tasks.splice(vm.project.tasks.length, 0, task);
            console.log(task);
            task.project_id = vm.project.id;
            console.log(task);
            Tasks.add({"task": task}, onProjectTasks);
        }

        function onProjectTaskGauges(event, data) {
            console.log("onProjectTaskGauges");

            var taskitem = vm.tasks.findOne(function (item) {
                return item.id == data.id;
            });
            taskitem.rule_ids = data.rule_ids;
            getTaskRules(taskitem);
            //onProjectTasks();
        }

        function removeTask(task, $event) {
            //vm.project.tasks.splice(vm.project.tasks.length, 0, task);
            $event.stopPropagation();
            if (confirm('您确定要删除这个任务吗？')) {
                Tasks.remove({taskId: task.id}, onProjectTasks);
            }
        }


        function onProjectTasks() {
            Tasks.all({
                project_id: vm.project.id,
                state: 'draft',
                order:'created_at asc',
                limit:100
            }, function (result) {
                vm.tasks = result.data;

                for (var i = 0; i < vm.tasks.length; i++) {
                    if (vm.tasks[i].start_at) {
                        vm.tasks[i].start_at_time = new Date(vm.tasks[i].start_at);
                        vm.tasks[i].start_at_date = new Date(vm.tasks[i].start_at);
                    } else {
                        vm.tasks[i].start_at_time = new Date();
                        vm.tasks[i].start_at_date = new Date();
                    }
                    if (!vm.tasks[i].submit_way) {
                        vm.tasks[i].submit_way = TYPE_DEFIN.Group;
                        Tasks.update({taskId: vm.tasks[i].id, task: {submit_way: TYPE_DEFIN.Group}});
                    }
                    if (!vm.tasks[i].final) {
                        vm.tasks[i].final = false;
                    }
                    vm.tasks[i].rule_ids = vm.tasks[i].rule_ids || [];
                    getTaskRules(vm.tasks[i]);
                }
                getTaskResources();
            });
        }

        function getTaskRules(task) {
            task.rules = [];
            for (var i = 0, rule; i < task.rule_ids.length; i++) {
                rule = vm.project.rules.findOne(function (item) {
                    return item.id == task.rule_ids[i];
                });
                task.rules.push(rule);
            }

        }

        function onProjectProducts() {
            ProjectProducts.all({
                project_id: vm.project.id
            }, function (result) {
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                //vm.project.final_product = products.findOne(findFinal);
                if (vm.project.final_product) {
                    products.remove(findFinal);
                }
                vm.products = products;

            });
        }

        function onSetTime(newDate, task) {
            Tasks.update({
                taskId: task.id
            }, {
                task: {
                    start_at: newDate
                }
            });
            $scope.$broadcast('onDocumentClick');
        }

        function beforeRender($view, $dates, $upDate) {
            switch ($view) {
                case 'day':
                    $upDate.display = moment($upDate.dateValue).add(1, 'month').format('YYYY年MM月');
                    break;
                /*case 'month':
                 $upDate.display = moment($upDate.dateValue).add(1, 'year').format('YYYY年');
                 break;*/
            }
            var start = moment(project.start_at),
                end = moment(project.end_at).add(1, 'days');
            angular.forEach($dates, function (date) {
                if (!moment(date.dateValue).utcOffset(0).isBetween(start, end, 'day')) {
                    date.selectable = false;
                }
            });
        }

        function getTask(task){
            return (vm.tasks || []).findOne(function (item) {
                return item.id == task.id
            });
        }

        function groupcheck(id, ids) {
            if (id && ids) {
                return ids.has(function (item) {
                    return item == id;
                })
            }
        }

        function groupclick(id, task) {
            if (id && task) {
                if (task.discussion_ids.has(function (item) {
                        return item == id;
                    })) {
                    task.discussion_ids.remove(function (item) {
                        return item == id;
                    });
                } else {
                    task.discussion_ids.push(id);
                }
                Tasks.update({taskId: task.id, task: {'discussion_ids': task.discussion_ids}});
            }
        }

    }

})();