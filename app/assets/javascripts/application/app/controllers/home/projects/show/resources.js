(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowResourcesController', ProjectShowResourcesController)
        .controller('ResourceUploaderController', ResourceUploaderController);

    ProjectShowResourcesController.$inject = ['$scope', 'RESOURCE_TYPES', 'ProjectProducts', 'Discussions', 'Tasks', 'Resources', 'project'];

    function ProjectShowResourcesController($scope, RESOURCE_TYPES, ProjectProducts, Discussions, Tasks, Resources, project) {

        var vm = this;
        vm.project = project;
        vm.resources = {};
        vm.show = show;

        getDiscussions();
        getTasks();
        getProjectProducts();
        $scope.$on('onProjectResources', getProjectResources);

        $scope.$watch(function () {
            return [vm.discussions, vm.tasks];
        }, function (values) {
            var discussions = values[0],
                tasks = values[1];
            if (discussions && tasks) {
                var ids = [];
                angular.forEach(discussions, function (discussion) {
                    ids = ids.concat(discussion.resource_ids);
                });
                angular.forEach(tasks, function (task) {
                    ids = ids.concat(task.resource_ids);
                });
                ids.length && getResources({ids: ids.join(',')});
            }
        }, true);

        function getDiscussions() {
            Discussions.all({
                project_id: project.id
            }, function (result) {
                vm.discussions = result.data;
            });
        }

        function getTasks() {
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
            if (query) {
                Resources.all(query, function (result) {
                    vm.loaded = true;
                    angular.forEach(result.data, function (resource) {
                        vm.resources[resource.id] = resource;
                    });
                });
            }
        }

        function getProjectResources() {
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

        function show(resource) {
            return !(
            (vm.keyword && resource.name.toLowerCase().indexOf(vm.keyword.toLowerCase()) < 0) ||
            vm.discussion && !(vm.discussions.findOne(function (item) {
                return item.id == vm.discussion;
            }).resource_ids || []).has(function (resource_id) {
                    return resource_id == resource.id;
                }) ||
            (vm.task && !(vm.tasks.findOne(function (item) {
                return item.id == vm.task;
            }).resource_ids || []).has(function (resource_id) {
                    return resource_id == resource.id;
                }))
            );
        }

    }

    ResourceUploaderController.$inject = ['$scope', 'RESOURCE_TYPES', 'Discussions', 'Tasks'];

    function ResourceUploaderController($scope, RESOURCE_TYPES, Discussions, Tasks) {
        var vm = this,
            project = $scope.project,
            discussions = $scope.discussions,
            tasks = $scope.tasks;

        vm.ownerType = ownerType;
        vm.ownerId = ownerId;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;

        function ownerType() {
            return (vm.discussion || vm.task) ? '' : RESOURCE_TYPES.project.resource;
        }

        function ownerId() {
            return (vm.discussion || vm.task) ? '' : project.id;
        }

        function onUploadBegin() {
            vm.$uploading = true;
        }

        function onUploadSuccess(data) {
            var resource_ids;
            if (vm.discussion) {
                resource_ids = discussions.findOne(function (item) {
                    return item.id == vm.discussion;
                }).resource_ids || [];
                resource_ids.push(data.resource.id);
                Discussions.update({
                    discussionId: vm.discussion
                }, {
                    discussion: {
                        resource_ids: resource_ids
                    }
                });
            }

            if (vm.task) {
                resource_ids = tasks.findOne(function (item) {
                    return item.id == vm.task;
                }).resource_ids || [];
                resource_ids.push(data.resource.id);
                Tasks.update({
                    taskId: vm.task
                }, {
                    task: {
                        resource_ids: resource_ids
                    }
                });
            }

            if(!vm.discussion && !vm.task){
                $scope.$emit('onProjectResources');
            }

            delete vm.$uploading;

        }
    }

})();