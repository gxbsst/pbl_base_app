(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditReleaseController', ProjectEditReleaseController);

    ProjectEditReleaseController.$inject = ['$scope','$state', '$filter', 'RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'ProjectGauges', 'ProjectTechniques', 'ProjectStandards', 'ProjectMembers', 'ProjectTeachers', 'Projects', 'project'];

    function ProjectEditReleaseController($scope,$state, $filter, RESOURCE_TYPES, Resources, ProjectProducts, ProjectGauges, ProjectTechniques, ProjectStandards, ProjectMembers, ProjectTeachers,Projects, project) {
        var vm = this;
        vm.project = project;
        vm.project.resources = [];
        vm.getResources = getResources;
        vm.limit = 10;
        vm.limitTo = vm.limit;
        vm.toggle = toggle;
        vm.releaseProject=releaseProject;

        getProjectProducts();
        getProjectGauges();
        getProjectTechniques();
        getProjectStandards();
        getProjectMembers();
        getProjectTeachers();

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {
            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

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
                    RESOURCE_TYPES.project.document].join(','),
                owner_ids: [project.id].concat(vm.$products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                vm.project.resources = result.data;
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

        function getProjectMembers() {
            ProjectMembers.all({
                projectId: vm.project.id
            }, function (result) {
                vm.project.members = result.data;
            });
        }

        function getProjectTeachers() {
            ProjectTeachers.all({
                projectId: vm.project.id
            }, function (result) {
                vm.project.teachers = result.data;
            });
        }

        function toggle() {
            if (vm.showed) {
                vm.limitTo = vm.limit;
                vm.showed = false;
            } else {
                vm.limitTo = vm.project.members.length;
                vm.showed = true;
            }
        }

        function getResources(type, id, singular) {
            return vm.project.resources[singular ? 'findOne' : 'find'](function (resource) {
                return resource.owner_type == type && resource.owner_id == id;
            });
        }

        function releaseProject(project, $event) {
            $event.stopPropagation();
            if (confirm('您确定要发布这个项目吗？')) {
                Projects.release({
                    projectId: project.id,
                    action:'release'
                }, function (result) {
                    $state.go('base.home.projects.show.info',{projectId:project.id});
                });
            }
        }

    }

})();