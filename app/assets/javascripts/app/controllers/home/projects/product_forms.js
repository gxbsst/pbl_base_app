(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProductFormsController', ProductFormsController);

    ProductFormsController.$inject = ['$scope', 'ProductForms', 'ProjectProducts'];

    function ProductFormsController($scope, ProductForms, ProjectProducts) {

        var vm = this,
            project = $scope.project,
            product = $scope.product,
            isFinal = $scope.isFinal;

        vm.select = select;
        vm.enter = enter;

        ProductForms.all(function (result) {
            vm.productForms = result.data;
            if(product){
                vm.selected = vm.productForms.findOne(function (form) {
                    return form.id == product.product_form.id;
                }) || {};
            }
        });

        function select(form) {
            vm.selected = form;
        }

        function enter() {
            var params = {
                product: {
                    project_id: project.id,
                    product_form_id: vm.selected.id
                }
            };
            if (!product || !product.id) {
                if (isFinal) {
                    params.product.is_final = true;
                    ProjectProducts.add(params, emit);
                }else{
                    product.product_form_id = vm.selected.id;
                    $scope.destroyModal();
                }
            } else {
                ProjectProducts.update({
                    productId: product.id
                }, params, emit);
            }

            function emit() {
                $scope.$emit('onProjectProducts');
                $scope.destroyModal();
            }
        }
    }

})();