(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('TechniqueSelectorController', TechniqueSelectorController);

    TechniqueSelectorController.$inject = ['$scope'];

    function TechniqueSelectorController($scope){
        var vm = this;
        vm.select = select;

        function select(technique){
            $scope.gauge.technique = technique;
            $scope.destroyModal();
        }
    }

})();