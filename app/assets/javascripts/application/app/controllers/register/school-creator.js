(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SchoolCreatorController', SchoolCreatorController);

    SchoolCreatorController.$inject = ['$scope', 'Schools'];

    function SchoolCreatorController($scope, Schools) {

        var vm = this,
            regions = ['countryId', 'provinceId', 'cityId', 'districtId'];

        vm.regionConfig = {
            fixed: true,
            country: false
        };
        vm.school = {};
        vm.onRegion = onRegion;
        vm.check = check;
        vm.create = create;

        $scope.$watch('region', function (region) {
            region && angular.extend(vm.regionConfig, region);
        }, true);

        $scope.$watch(function () {
            return vm.regionConfig;
        }, function (config) {
            if (config) {
                angular.forEach(regions, function (region) {
                    var regionId = vm.regionConfig[region];
                    if (regionId) {
                        vm.school[region.hump(false)] = vm.school.region_id = regionId;
                    }
                });
            }
        }, true);

        function onRegion($regionType, $regionId) {
            vm.regionConfig[$regionType.toLowerCase() + 'Id'] = $regionId;
        }

        function check() {
            return vm.school.country_id && vm.school.province_id && vm.school.city_id && vm.school.district_id && vm.school.name;
        }

        function create() {
            Schools.add({
                school: vm.school
            }, function (result) {
                $scope.$emit('onSchools', result.data);
                $scope.destroyModal();
            });
        }

    }
})();
