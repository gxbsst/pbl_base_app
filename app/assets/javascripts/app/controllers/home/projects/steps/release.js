(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateReleaseController', HomeProjectCreateReleaseController);

    HomeProjectCreateReleaseController.$inject = ['RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'project', 'Cycles'];

    function HomeProjectCreateReleaseController(RESOURCE_TYPES, Resources, ProjectProducts, project, Cycles) {
        var vm = this;
        vm.project = project;
        vm.getResource = getResource;

        ProjectProducts.all({
            project_id: project.id
        }, function (result) {
            vm.products = result.data;
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document].join(','),
                owner_ids: [project.id].concat(vm.products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                vm.resources = result.data;
            });
        });

        function getResource(type, id){
            return vm.resources && vm.resources.findOne(function (resource) {
                return resource.owner_type == type && resource.owner_id == id;
            });
        }

        if (vm.project.duration_unit > 0 && vm.project.duration) {
            vm.duration = vm.project.duration + Cycles[(parseInt(vm.project.duration_unit) - 1)].title;
        }
    }

})();