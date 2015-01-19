(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SchoolCreatorController', SchoolCreatorController);

    SchoolCreatorController.$inject = ['$scope', 'Schools'];

    function SchoolCreatorController($scope, Schools) {

        var vm = this;

        vm.regionConfig = {
            fixed: true,
            country: false
        };
        vm.onRegion = onRegion;
        vm.create = create;

        $scope.$watch('region', function (region) {
            region && angular.extend(vm.regionConfig, region);
        }, true);

        function onRegion($regionType, $regionId) {
            vm.region = {
                id: $regionId,
                type: $regionType
            };
            console.log(vm.region);
        }

        function create(){
            console.log(vm.region);
            Schools.add({
                school: {
                    name: vm.name,
                    region_id: vm.region.id
                }
            }, emit);
        }

        function emit(){
            $scope.$emit('onSchools');
        }

    }
})();
