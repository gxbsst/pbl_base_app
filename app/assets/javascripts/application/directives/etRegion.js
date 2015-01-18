(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etRegion', etRegion);

    etRegion.$inject = ['$parse', 'Regions'];

    function etRegion($parse, Regions){
        return {
            require: 'etRegion',
            restrict: 'A',
            replace: true,
            scope: true,
            link: etRegionLink,
            templateUrl: 'directives/et-region.html',
            controller: angular.noop,
            controllerAs: 'regionConfig'
        };

        function etRegionLink(scope, element, attr, ctrl){

            angular.extend(ctrl, {
                country: true,
                province: true,
                city: true,
                district: true,
                fixed: false
            });

            var onChange = $parse(attr.onChange),
                levels = ['Country', 'Province', 'City', 'District'];

            ctrl.setRegion = setRegion;
            ctrl.getProvinces = getProvinces;
            ctrl.getCities = getCities;
            ctrl.getDistricts = getDistricts;

            scope.$watch(attr.etRegion, function (config) {
                config && angular.extend(ctrl, config);
            }, true);

            getCountries();

            function setRegion(type, id){
                if (id == ctrl[type])return;
                ctrl[type] = id;
                angular.forEach(levels.slice(levels.idx(type) + 1), function (regionType) {
                    delete ctrl[regionType];
                    delete ctrl[regionType.toLowerCase() + 'Id'];
                });
                onChange(scope, {$regionType: type, $regionId: id});
            }

            function getCountries() {
                ctrl.provinces = [];
                ctrl.cities = [];
                ctrl.districts = [];
                Regions.all({
                    type: 'Country'
                }, function (result) {
                    ctrl.countries = result.data;
                    if(!ctrl.country){
                        ctrl.countryId = (ctrl.countries.findOne(function (country, i) {
                            return country.name === ctrl.defaultCountry;
                        }) || ctrl.countries[0]).id;
                    }
                });
            }

            function getProvinces(countryId) {
                if (!countryId)return;
                ctrl.cities = [];
                ctrl.districts = [];
                Regions.all({
                    type: 'Province',
                    parent_id: countryId
                }, function (result) {
                    ctrl.provinces = result.data;
                });
            }

            function getCities(provinceId) {
                if (!provinceId)return;
                ctrl.districts = [];
                Regions.all({
                    type: 'City',
                    parent_id: provinceId
                }, function (result) {
                    ctrl.cities = result.data;
                });
            }

            function getDistricts(cityId) {
                if (!ctrl.district || !cityId)return;
                Regions.all({
                    type: 'District',
                    parent_id: cityId
                }, function (result) {
                    ctrl.districts = result.data;
                });
            }

        }
    }

})();