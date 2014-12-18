(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController);

    HomeProjectCreateDesignController.$inject = ['$scope', '$state', 'Projects', 'ProjectStandards', 'ProjectSkills', 'ProjectProducts', 'project'];

    function HomeProjectCreateDesignController($scope, $state, Projects, ProjectStandards, ProjectSkills, ProjectProducts, project) {

        var vm = this;

        vm.project = project;
        vm.removeStandardItem = removeStandardItem;
        vm.removeTechnique = removeTechnique;
        vm.removeProduct = removeProduct;
        vm.saveProject = saveProject;

        $scope.$on('onProjectStandards', onProjectStandards);
        $scope.$on('onProjectSkills', onProjectSkills);
        $scope.$on('onProjectProducts', onProjectProducts);

        onProjectStandards();
        onProjectSkills();
        onProjectProducts();

        function onProjectStandards() {
            ProjectStandards.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
            });
        }

        function onProjectSkills() {
            ProjectSkills.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.techniques = result.data;
            });
        }

        function onProjectProducts() {
            ProjectProducts.all({
                project_id: vm.project.id
            }, function (result) {
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                vm.project.final_product = products.findOne(findFinal);
                if (vm.project.final_product) {
                    products.remove(findFinal);
                }
                vm.project.products = result.data;
            });
        }

        function removeStandardItem(standard) {
            ProjectStandards.remove({
                standardItemId: standard.id
            }, onProjectStandards);
        }

        function removeTechnique(skill) {
            ProjectSkills.remove({
                techniqueId: skill.id
            }, onProjectSkills);
        }

        function removeProduct(product) {
            ProjectProducts.remove({
                productId: product.id
            }, onProjectProducts);
        }

        function saveProject() {
            Projects.update({projectId: project.id}, {data: project}, function (result) {
                //console.log(result.result);
            });
        }
    }

})();