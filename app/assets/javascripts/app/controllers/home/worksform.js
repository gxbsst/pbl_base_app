(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('WorksformController', WorksformController)
    ;

    WorksformController.$inject = ['$scope', 'Worksforms'];

    function WorksformController($scope, Worksforms) {
        Worksforms.all({}, function (result) {
            $scope.worksforms = result.data;
            $scope.explain = $scope.worksforms[0].explain;
            $scope.activeItem = 0;
        });
        $scope.choose = choose;
        $scope.modalEmit = modalEmit;

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