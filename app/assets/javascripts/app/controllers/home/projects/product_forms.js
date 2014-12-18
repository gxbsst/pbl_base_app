(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProductFormsController', ProductFormsController);

    ProductFormsController.$inject = ['$scope', 'ProductForms', 'ProjectProducts'];

    function ProductFormsController($scope, ProductForms, ProjectProducts) {

        $scope.choose = choose;
        $scope.modalEmit = modalEmit;

        var vm = this,
            project = $scope.project,
            product = $scope.product,
            isFinal = $scope.isFinal;

        vm.productForms = ProductForms.all();
        vm.selected = product ? product.form : null;
        vm.select = select;
        vm.enter = enter;

        function select(form) {
            vm.selected = form;
        }

        function enter() {
            var params = {
                product: {
                    form: vm.selected.id
                }
            };
            if (isFinal) {
                params.product.is_final = true;
            }
            if (!product) {
                params.project_id = project;
                ProjectProducts.add(params, destroyModal);
            } else {
                ProjectProducts.update({
                    productFormId: product.id
                }, params, destroyModal);
            }

            function destroyModal() {
                $scope.destroyModal();
            }
        }

        function modalEmit() {
            $scope.$emit('setWorksforms', $scope.worksforms[$scope.activeItem]);
            $scope.destroyModal();
        }

        function choose(index) {
            $scope.explain = $scope.worksforms[index].explain;
            $scope.activeItem = index;
        }
    }

})();