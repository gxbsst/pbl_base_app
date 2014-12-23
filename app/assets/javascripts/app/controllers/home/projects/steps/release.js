(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateReleaseController', HomeProjectCreateReleaseController);

    HomeProjectCreateReleaseController.$inject = ['RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'project'];

    function HomeProjectCreateReleaseController(RESOURCE_TYPES, Resources, ProjectProducts, project) {
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

    }

})();