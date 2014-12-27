(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditReleaseController', ProjectEditReleaseController);

    ProjectEditReleaseController.$inject = ['RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'ProjectGauges', 'ProjectTechniques', 'ProjectStandards', 'project'];

    function ProjectEditReleaseController(RESOURCE_TYPES, Resources, ProjectProducts, ProjectGauges, ProjectTechniques, ProjectStandards, project) {
        var vm = this;
        vm.project = project;
        vm.getResources = getResources;

        getProjectProducts();
        getProjectGauges();
        getProjectTechniques();
        getProjectStandards();

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
                getProductSample();
            });
        }

        function getProductSample() {
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document].join(','),
                owner_ids: [project.id].concat(vm.$products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                vm.resources = result.data;
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
                vm.techniques = result.data;
            });
        }

        function getProjectStandards() {
            ProjectStandards.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
            });
        }

        function getResources(type, id, singular) {
            vm.resources = vm.resources || [];
            return vm.resources[singular ? 'findOne' : 'find'](function (resource) {
                return resource.owner_type == type && resource.owner_id == id;
            });
        }

    }

})();