(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowAssignmentController', ProjectShowAssignmentController);

    ProjectShowAssignmentController.$inject =  ['$scope', 'RESOURCE_TYPES', 'Resources', 'project', 'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts','ProjectGauges','Groupings','Discussions'];

    function ProjectShowAssignmentController($scope, RESOURCE_TYPES, Resources, project, Disciplines, Knowledge, Tasks, ProjectProducts,ProjectGauges,Groupings,Discussions) {

        var vm = this;
        vm.project = project;
        vm.showTask=showTask;
        vm.showtask=[];
        console.log(vm.project);


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

        function getProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function (result) {
                project.rules = result.data;
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
                    vm.tasks[i].rule_ids=vm.tasks[i].rule_ids||[];
                    getTaskRules(vm.tasks[i]);
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

        vm.showTask(0);

        function showTask(id){
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id]=!vm.showtask[id];
        }

    }

})();