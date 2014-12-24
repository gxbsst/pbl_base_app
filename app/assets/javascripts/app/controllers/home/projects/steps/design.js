(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController);

    HomeProjectCreateDesignController.$inject = ['$scope', 'RESOURCE_TYPES', 'ProjectStandards', 'ProjectTechniques', 'ProjectProducts', 'Resources', 'project'];

    function HomeProjectCreateDesignController($scope, RESOURCE_TYPES, ProjectStandards, ProjectTechniques, ProjectProducts, Resources, project) {

        var vm = this;

        vm.project = project;
        vm.resources = [];
        vm.findByOwner = findByOwner;
        vm.removeStandardItem = removeStandardItem;
        vm.removeTechnique = removeTechnique;
        vm.removeProduct = removeProduct;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;

        $scope.$on('onProjectStandards', onProjectStandards);
        $scope.$on('onProjectTechniques', onProjectTechniques);
        $scope.$on('onProjectProducts', onProjectProducts);

        onProjectStandards();
        onProjectTechniques();
        onProjectProducts();

        function onProjectStandards() {
            $scope.$broadcast('getProjectStandards', true);
            ProjectStandards.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
                $scope.$broadcast('getProjectStandards', false);
            });
        }

        function onProjectTechniques() {
            ProjectTechniques.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.techniques = result.data;
            });
        }

        function onProjectProducts() {
            ProjectProducts.all({
                project_id: vm.project.id
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
                owner_types: RESOURCE_TYPES.project.product,
                owner_ids: vm.$products.map(function (product) {
                    return product.id;
                }).join(',')
            }, function (result) {
                vm.resources = result.data;
            });
        }

        function findByOwner(id) {
            return vm.resources.findOne(function (resource) {
                return resource.owner_id == id;
            });
        }

        function removeStandardItem(standard) {
            ProjectStandards.remove({
                standardItemId: standard.id
            }, onProjectStandards);
        }

        function removeTechnique(skill) {
            ProjectTechniques.remove({
                techniqueId: skill.id
            }, onProjectTechniques);
        }

        function removeProduct(product) {
            ProjectProducts.remove({
                productId: product.id
            }, onProjectProducts);
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
                getProductSample();
            }
        }

    }

})();