(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditInfoController', ProjectEditInfoController);

    ProjectEditInfoController.$inject = ['RESOURCE_TYPES', 'Resources', 'Projects', 'ProjectTeachers', 'Regions', 'project'];

    function ProjectEditInfoController(RESOURCE_TYPES, Resources, Projects, ProjectTeachers, Regions, project) {

        var vm = this;
        project.cover = project.cover || {};
        vm.resources = [];
        vm.project = project;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.findByType = findByType;
        vm.removeDocument = removeDocument;
        vm.onTagsChange = onTagsChange;
        vm.onTeachersChange = onTeachersChange;
        vm.teachersFormatter = teachersFormatter;
        vm.setCountry = setCountry;
        vm.setProvince = setProvince;
        vm.setCity = setCity;
        vm.setDistrict = setDistrict;
        vm.getProvinces = getProvinces;
        vm.getCities = getCities;
        vm.getDistricts = getDistricts;

        getProjectRegion();
        getProjectResources();
        getCountries();
        getTeachers();

        function getProjectRegion() {
            project.region_id && Regions.all({
                regionId: project.region_id
            }, function (result) {
                project.region = angular.copy(result.data);
                var regions = result.data.parents;
                delete result.data.parents;
                regions.push(result.data);
                vm.regions = regions;
                vm.$countryId = vm.countryId = findRegion('Country').id;
                vm.$provinceId = vm.provinceId = findRegion('Province').id;
                vm.$cityId = vm.cityId = findRegion('City').id;
                vm.$districtId = vm.districtId = findRegion('District').id;
            });
        }

        function findRegion(type) {
            return vm.regions.findOne(function (region) {
                    return region.type == type;
                }) || {};
        }

        function setCountry(countryId) {
            if (countryId == vm.$countryId)return;
            vm.$countryId = countryId;
            Object.removeAll(vm, 'provinceId $provinceId cityId $cityId districtId $districtId');
            Projects.update({
                projectId: project.id
            }, {
                project: {region_id: countryId}
            });
        }

        function setProvince(provinceId) {
            if (provinceId == vm.$provinceId)return;
            vm.$provinceId = provinceId;
            Object.removeAll(vm, 'cityId $cityId districtId $districtId');
            Projects.update({
                projectId: project.id
            }, {
                project: {region_id: provinceId}
            });
        }

        function setCity(cityId) {
            if (cityId == vm.$cityId)return;
            vm.$cityId = cityId;
            Object.removeAll(vm, 'districtId $districtId');
            Projects.update({
                projectId: project.id
            }, {
                project: {region_id: cityId}
            });
        }

        function setDistrict(districtId) {
            if (districtId == vm.$districtId)return;
            vm.$districtId = districtId;
            Projects.update({
                projectId: project.id
            }, {
                project: {region_id: districtId}
            });
        }

        function getCountries() {
            vm.provinces = [];
            vm.cities = [];
            vm.districts = [];
            Regions.all({
                type: 'Country'
            }, function (result) {
                vm.countries = result.data;
            });
        }

        function getTeachers(){
            ProjectTeachers.all({
                project_id: project.id
            }, function (result) {
                vm.teachers = result.data;
            });
        }

        function getProvinces(countryId) {
            if (!countryId)return;
            vm.cities = [];
            vm.districts = [];
            Regions.all({
                type: 'Province',
                parent_id: countryId
            }, function (result) {
                vm.provinces = result.data;
            });
        }

        function getCities(provinceId) {
            if (!provinceId)return;
            vm.districts = [];
            Regions.all({
                type: 'City',
                parent_id: provinceId
            }, function (result) {
                vm.cities = result.data;
            });
        }

        function getDistricts(cityId) {
            if (!cityId)return;
            Regions.all({
                type: 'District',
                parent_id: cityId
            }, function (result) {
                vm.districts = result.data;
            });
        }

        function onUploadBegin(type) {
            return function () {
                project['$uploading_' + type] = true;
            }
        }

        function onUploadSuccess(type) {
            return function () {
                if (type == 'cover' && project.cover && project.cover.id) {
                    Resources.remove({
                        resourceId: project.cover.id
                    });
                }
                delete project['$uploading_' + type];
                getProjectResources();
            }
        }

        function getProjectResources() {
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.document].join(','),
                owner_ids: project.id
            }, function (result) {
                vm.resources = result.data;
            });
        }

        function findByType(ownerType, multiple) {
            return vm.resources[multiple ? 'find' : 'findOne'](function (resource) {
                return resource.owner_type == ownerType;
            });
        }

        function removeDocument(doc) {
            Resources.remove({
                resourceId: doc.id
            }, getProjectResources);
        }

        function onTagsChange() {
            return function (tag, tags) {
                Projects.update({
                    projectId: vm.project.id
                }, {
                    project: {
                        tag_list: tags.map(function (item) {
                            return item.$label;
                        })
                    }
                });
            };
        }

        function onTeachersChange() {
            return function (teacher, teachers) {

            }
        }

        function teachersFormatter(teachers) {
            if (!teachers) {
                return [];
            }
            return model.map();
        }

    }

})();