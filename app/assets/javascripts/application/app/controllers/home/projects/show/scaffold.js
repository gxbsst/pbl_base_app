(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowScaffoldController', ProjectShowScaffoldController);

    ProjectShowScaffoldController.$inject = ['$scope', 'RESOURCE_TYPES', 'Resources', 'project', 'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts','ProjectGauges','Groupings','Discussions'];

    function ProjectShowScaffoldController($scope, RESOURCE_TYPES, Resources, project, Disciplines, Knowledge, Tasks, ProjectProducts,ProjectGauges,Groupings,Discussions) {

        var vm = this;
        vm.showTask=showTask;
        vm.showtask=[];

        project.knowledge = project.knowledge || [];
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
        vm.dateFormat=dateFormat;
        vm.finalpost=finalpost;
        vm.releaseTask=releaseTask;

        $scope.$on('setAddTask', setAddTask);

        $scope.$on('onProjectTaskGauges',onProjectTaskGauges);

        getProjectGauges();
        onProjectTasks();
        onProjectProducts();

        getDiscussions();

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
            console.log("getGroupings");
            Groupings.get({
                projectId: project.id
            }, function (result) {
                console.log("getGroupings");
                var cache = result.cache;
                if (cache) {
                    cache = JSON.parse(cache);
                    vm.count = cache.count;
                    vm.groups = cache.groups;

                    console.log("getGroupingscache");
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

        function releaseTask() {
            Task.release({
                project_id: project.id,
                action:'release'
            }, function (result) {
                onProjectTasks();
            });
        }


        function showTask(id){
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id]=!vm.showtask[id];
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
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'task_type': typeval}});
            }
        }

        function chooseSubmitWay(task, typeval, disabled) {
            task.submit_way = typeval;
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'submit_way': typeval}});
            }
        }

        function finalpost(task, typeval, disabled) {
            console.log("finalpost");
            task.final = typeval;
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'final': typeval}});
            }
        }

        function addKnowledge() {
            //vm.project.knowledge.push(vm.tempKnowledge);
            Knowledge.add({
                "knowledge": {
                    "project_id": vm.project.id,
                    "description": vm.tempKnowledge
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
                    vm.project.knowledge = data.data;
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

            var taskitem=vm.tasks.findOne(function (item) {
                return item.id == data.id;
            });
            taskitem.rule_ids=data.rule_ids;
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
                project_id: vm.project.id
            }, function (result) {
                vm.tasks = result.data;

                for(var i=0;i<vm.tasks.length;i++){
                    if(vm.tasks[i].start_at){
                        vm.tasks[i].start_at_time=new Date(vm.tasks[i].start_at);
                        vm.tasks[i].start_at_date=new Date(vm.tasks[i].start_at);
                    }else{
                        vm.tasks[i].start_at_time=new Date();
                        vm.tasks[i].start_at_date=new Date();
                    }
                    if(!vm.tasks[i].submit_way){
                        vm.tasks[i].submit_way=1;
                        Tasks.update({taskId: vm.tasks[i].id, task: {'submit_way': 1}});
                    }
                    if(!vm.tasks[i].final){
                        console.log("final");
                        vm.tasks[i].final=false;
                    }
                    vm.tasks[i].rule_ids=vm.tasks[i].rule_ids||[];
                    getTaskRules(vm.tasks[i]);
                }
                getTaskResources();
            });
        }

        function getTaskRules(task){
            task.rules=[];
            console.log("getTaskRules");
            for(var i= 0,rule;i<task.rule_ids.length;i++){
                rule=vm.project.rules.findOne(function (item) {
                        return item.id == task.rule_ids[i];
                    });
                task.rules.push(rule);
            }

        }
        function onProjectProducts() {
            console.log("products");
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

                console.log(vm.products);
            });
        }

        function dateFormat(date, time, task) {
            if(date==null){date=new Date();}
            if(time==null){time=new Date();}

            var datetime;
            datetime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+time.getHours()
                    +":"+time.getMinutes()+":"+time.getSeconds();
            datetime.replace(/-/g,"/");
            console.log(datetime);
            var oDate = new Date(datetime);
            console.log(oDate);
            Tasks.update({taskId:task.id,task:{start_at:oDate}});
            return(oDate);
        }
    }

})();