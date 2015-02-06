
(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowAssignmentController', ProjectShowAssignmentController);

    ProjectShowAssignmentController.$inject = ['$rootScope','$scope', 'RESOURCE_TYPES', 'Resources', 'project','authority',
        'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts', 'ProjectGauges', 'ProjectMembers',
        'Groupings', 'Discussions', 'Works', 'Scores', 'TYPE_DEFIN','WORK_TYPES'];

    function ProjectShowAssignmentController($rootScope,$scope, RESOURCE_TYPES, Resources, project,authority,
                                             Disciplines, Knowledge, Tasks, ProjectProducts, ProjectGauges, ProjectMembers,
                                             Groupings, Discussions, Works, Scores, TYPE_DEFIN,WORK_TYPES) {

        var vm = this;
        vm.project = project;
        vm.showTask = showTask;
        vm.showtask = [];
        vm.disciplines = [];
        vm.isgroup = isgroup;
        vm.dateFormat = dateFormat;
        vm.getResources = getResources;
        vm.getResourcesWork = getResourcesWork;
        vm.removeResource = removeResource;
        vm.removeResourceWork = removeResourceWork;
        vm.workAction = workAction;
        vm.workssubmitted=workssubmitted;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.project.rules=[];

        getProjectGauges();
        onProjectTasks();
        onProjectProducts();
        getMembers();
        getDiscussions();
        getAuthority();

        console.log($rootScope.currentUser);
        Disciplines.all(function (data) {
            vm.disciplines = data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {

            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

        function workAction(work,action){
            Works.update({workId:work.id,
                work:{content:work.content,state:action,worker_id:$rootScope.currentUser.id}
            },function(){
                work.state=action;
                work.worker_id=$rootScope.currentUser.id;
                work.submitter =vm.usersHash[$rootScope.currentUser.id];
            });
        }
        function removeResource(resource) {
            resource.$disabled = true;
            Resources.remove({
                resourceId: resource.id
            }, getTaskResources);
        }
        function removeResourceWork(resource,work) {
            resource.$disabled = true;
            Resources.remove({
                resourceId: resource.id
            }, function(){
                //console.log(new Date());
                getWorkResources(work)
            });
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
                getWorkResources(product);
            }
        }

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

        function getMembers() {
            ProjectMembers.all({
                projectId: project.id
            }, function (result) {
                vm.members = result.data;
                vm.usersHash = {};
                angular.forEach(vm.members, function (member) {
                    vm.usersHash[member.user.id] = member.user;
                });
            });
        }

        function getProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function (result) {
                vm.project.rules = result.data;
            });
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

        function onProjectTasks() {
            Tasks.all({
                project_id: vm.project.id,
                state:'released',
                order:'created_at asc',
                limit:100
            }, function (result) {
                vm.tasks = result.data;

                for (var i = 0; i < vm.tasks.length; i++) {
                    vm.tasks[i].rule_ids = vm.tasks[i].rule_ids || [];
                    getTaskRules(vm.tasks[i]);
                    getTaskWorks(vm.tasks[i]);
                }
                getTaskResources();
            });
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

        function getTaskRules(task) {
            task.rules = [];
            for (var i = 0, rule; i < task.rule_ids.length; i++) {
                rule = vm.project.rules.findOne(function (item) {
                    return item.id == task.rule_ids[i];
                });
                task.rules.push(rule);
            }

        }

        function getTaskWorks(task) {
            Works.all({
                taskId: task.id,task_type:task.task_type,limit:'100',include:'scores'
            }, function (result) {
                task.works = result.data.find(function(item){
                   return item.task_id==task.id;
                });
                task.worksHash={};
                angular.forEach(WORK_TYPES, function (item) {
                    task.worksHash[item]=[];
                });
                task.worksHash['self']=[];

                for (var i = 0; i < task.works.length; i++) {
                    getWorkResources(task.works[i]);
                    task.works[i].usersHash = {};
                    var worksstudent=false;
                    if (task.works[i].acceptor_type == TYPE_DEFIN.Group) {
                        var groups = vm.groups.find(function (item) {
                            return task.works[i].acceptor_id == item.id;
                        });

                        task.works[i].userScores = {};
                        angular.forEach(groups, function (group) {
                            angular.forEach(group.members, function (member) {
                                task.works[i].usersHash[member] = vm.usersHash[member];
                                vm.usersHash[member].scores ={};
                                //vm.usersHash[member].scores = getWorkScores(task.works[i], vm.usersHash[member].id);
                                Object.merge(vm.usersHash[member].scores,getWorkScores(task.works[i], vm.usersHash[member].id));

                                task.works[i].userScores[member] ={};
                                //task.works[i].userScores[member] = getWorkScores(task.works[i], vm.usersHash[member].id);
                                Object.merge(task.works[i].userScores[member],getWorkScores(task.works[i], vm.usersHash[member].id));
                                //console.log(task.works[i].id);
                                //console.log(task.works[i].usersHash[member].scores);
                                //console.log(task.works[i].usersHash[member]);
                                //console.log(task.works[i].userScores[member]);
                                if(member==$rootScope.currentUser.id){
                                    worksstudent=true;
                                }
                            });
                        });
                        task.works[i].submitter =vm.usersHash[task.works[i].worker_id];
                    } else {
                        task.works[i].submitter = vm.usersHash[task.works[i].acceptor_id];
                        task.works[i].scores = getWorkScores(task.works[i], vm.usersHash[task.works[i].acceptor_id]);

                        if(task.works[i].acceptor_id==$rootScope.currentUser.id){
                            worksstudent=true;
                        }
                    }

                    if(worksstudent){
                        task.worksHash['self'].push(task.works[i]);
                    }else
                    {
                        task.worksHash[task.works[i].state].push(task.works[i]);
                    }
                }
            });
        }

        function getWorkScores(work, userId) {
            if(work&&userId){
                //Scores.all({owner_id:work.id,owner_type:TYPE_DEFIN.Work,userId: user.id}, function (result) {
                //    return result;
                //});
                var score=work.scores.findOne(function(score){
                    return score.user_id==userId;
                });
                return score;
            }else{
                return {};
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

        vm.showTask(0);

        function showTask(id) {
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id] = !vm.showtask[id];
        }

        function isgroup(id, ids) {
            return ids.has(function (item) {
                return item == id;
            })
        }

        function dateFormat(date) {
            if (date == null) {
                date = new Date();
            } else {
                date = new Date(date)
            }

            var datetime;
            datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours()
            + ":" + date.getMinutes() + ":00";
            return (datetime);
        }

        function getResources(task) {
            return (vm.resources || []).find(function (resource) {
                return resource.owner_type == RESOURCE_TYPES.project.task && resource.owner_id == task.id;
            });
        }

        function getResourcesWork(work) {
            return (work.resources || []).find(function (resource) {
                return resource.owner_type == RESOURCE_TYPES.project.work && resource.owner_id == work.id;
            });
        }

        function getWorkResources(work) {
            Resources.all({
                owner_types: RESOURCE_TYPES.project.work,
                owner_ids: work.id
            }, function (result) {
                work.resources = result.data;
                //console.log(new Date());
            });
        }

        function workssubmitted(task) {
            if(task.works){
                return task.works.find(function(item){
                    return (item.submit_at)!=null;
                }).length;
            }else{
                return 0;
            }
        }
    }

})();