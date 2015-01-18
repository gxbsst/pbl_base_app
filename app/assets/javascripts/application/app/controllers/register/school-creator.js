(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SchoolCreatorController', SchoolCreatorController);

    SchoolCreatorController.$inject = ['$scope'];

    function SchoolCreatorController($scope) {

        var vm = this;

        vm.regionConfig = {
            fixed: true,
            country: false,
            district: false
        };
        vm.onRegion = onRegion;
        vm.create = create;

        $scope.$watch('region', function (region) {
            region && angular.extend(vm.regionConfig, region);
        }, true);

        function onRegion($regionType, $regionId) {

        }

        function create(){

        }

    }
})();
