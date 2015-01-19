(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLController', PBLController)
        .controller('PBLShowController', PBLShowController);

    PBLController.$inject = ['$scope'];

    function PBLController($scope) {
        var vm = this;
    }

    PBLShowController.$inject = ['$rootScope','$scope', '$filter', 'RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'ProjectGauges', 'ProjectTechniques', 'ProjectStandards', 'ProjectMembers', 'ProjectTeachers', 'project','Tasks'];
    function PBLShowController($rootScope,$scope, $filter, RESOURCE_TYPES, Resources, ProjectProducts, ProjectGauges, ProjectTechniques, ProjectStandards, ProjectMembers, ProjectTeachers, project, Tasks) {

        var vm = this;
        vm.project = project;
        vm.project.resources = [];
        vm.getResources = getResources;
        vm.resouceDelete=resouceDelete;
        vm.tab=1;
        vm.infoTab=infoTab;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.findByType = findByType;

        getProjectProducts();
        getProjectGauges();
        getProjectTechniques();
        getProjectStandards();
        getProjectTeacher();
        onProjectTasks();
console.log($rootScope.currentUser);

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {
            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

        function onProjectTasks() {
            Tasks.all({
                project_id: vm.project.id
            }, function (result) {
                vm.tasks = result.data;
            });
        }
        function getProjectTeacher() {
            ProjectTeachers.all({
                projectId: project.id
            }, function (result) {
                vm.teachers = result.data.map(function (role) {
                    role.user_id = role.user.id;
                    role.label = role.user.username;
                    return role;
                });
            });
        }

        function findByType(ownerType, multiple) {
            return vm.project.resources[multiple ? 'find' : 'findOne'](function (resource) {
                return resource.owner_type == ownerType;
            });
        }

        function getProjectProducts() {
            ProjectProducts.all({
                project_id: project.id
            }, function (result) {
                vm.$products = angular.copy(result.data);
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                vm.project.final_product = products.findOne(findFinal);
                if (vm.project.final_product) {
                    products.remove(findFinal);
                }
                vm.project.products = result.data;
                getProjectResources();
            });
        }
        function getProjectResources() {
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document,
                    RESOURCE_TYPES.project.resource].join(','),
                owner_ids: [project.id].concat(vm.$products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                vm.project.resources = result.data;
                console.log(vm.project.resources);
            });
        }


        function getResources(type, id, singular) {
            return vm.project.resources[singular ? 'findOne' : 'find'](function (resource) {
                return resource.owner_type == type && resource.owner_id == id;
            });
        }

        function getProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function (result) {
                project.rules = result.data;
            });
        }

        function getProjectTechniques() {
            ProjectTechniques.all({
                project_id: project.id
            }, function (result) {
                vm.project.techniques = result.data;
            });
        }

        function getProjectStandards() {
            ProjectStandards.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
            });
        }
        function resouceDelete(doc){
            Resources.remove({
                resourceId: doc.id
            }, getProjectResources);
        }

        function onUploadBegin(type) {
            return function () {
                project['$uploading_' + type] = true;
            }
        }

        function onUploadSuccess(type) {
            return function () {
                if (type == 'cover' && project.cover && project.cover.id) {
                    Resources.remove({
                        resourceId: project.cover.id
                    });
                }
                delete project['$uploading_' + type];
                getProjectResources();
            }
        }
        function infoTab(tab){
            vm.tab=tab;
        }
    }

})();
