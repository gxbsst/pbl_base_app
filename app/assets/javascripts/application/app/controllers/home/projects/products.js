(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', 'ProjectProducts'];

    function ProductsController($scope, ProjectProducts) {

        var vm = this;
        vm.product = $scope.product = $scope.product || {};
        vm.project = $scope.project;
        vm.add = add;
        vm.remove = remove;

        vm.product.project_id = vm.project.id;

        function add() {
            ProjectProducts.add({
                product: vm.product
            }, emit);
        }

        function remove() {
            ProjectProducts.remove({
                productId: vm.product.id
            }, emit);
        }

        function emit() {
            $scope.$emit('onProjectProducts');
            $scope.destroyModal();
        }
    }

})();