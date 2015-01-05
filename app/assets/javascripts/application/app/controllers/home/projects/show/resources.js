(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowResourcesController', ProjectShowResourcesController);

    ProjectShowResourcesController.$inject = ['$scope', 'RESOURCE_TYPES', 'ProjectProducts', 'Discussions', 'Tasks', 'Resources', 'project'];

    function ProjectShowResourcesController($scope, RESOURCE_TYPES, ProjectProducts, Discussions, Tasks, Resources, project) {

        var vm = this;
        vm.project = project;
        vm.resources = {};
        vm.setDiscussion = setDiscussion;
        vm.setTask = setTask;

        getDiscussions();
        getTasks();
        getProjectProducts();

        $scope.$watch(function () {
            return [vm.discussions, vm.tasks];
        }, function (values) {
            var discussions = values[0],
                tasks = values[1];
            if(discussions && tasks){
                var ids = [];
                angular.forEach(discussions, function (discussion) {
                    ids.concat(discussion.resource_ids);
                });
                angular.forEach(tasks, function (discussion) {
                    ids.concat(discussion.resource_ids);
                });
                getResources({ ids: ids });
            }
        }, true);

        function getDiscussions(){
            Discussions.all({
                project_id: project.id
            }, function (result) {
                vm.discussions = result.data;
            });
        }

        function getTasks(){
            Tasks.all({
                project_id: project.id
            }, function (result) {
                vm.tasks = result.data;
            });
        }

        function getProjectProducts() {
            ProjectProducts.all({
                project_id: project.id
            }, function (result) {
                vm.products = result.data;
                getProjectResources();
            });
        }

        function getResources(query) {
            if(query){
                Resources.all(query, function (result) {
                    angular.forEach(result.data, function (resource) {
                        vm.resources[resource.id] = resource;
                    });
                });
            }
        }

        function getProjectResources(){
            getResources({
                owner_types: [
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document,
                    RESOURCE_TYPES.project.resource].join(','),
                owner_ids: [project.id].concat(vm.products.map(function (product) {
                    return product.id;
                })).join(',')
            });
        }

        function getResource(resource_id){
            return vm.resources[resource_id];
        }

        function setDiscussion(discussion){
            console.log(discussion)
        }

        function setTask(task){
            console.log(task)
        }

    }

})();