(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$state', '$q', 'Schools', 'Students', 'Clazzs', 'Users'];

    function RegisterController($scope, $state, $q, Schools, Students, Clazzs, Users) {

        var vm = this;

        vm.user = {};
        vm.btn = btn;
        vm.save = save;
        vm.onSuccess = onSuccess;
        vm.onRegion = onRegion;
        vm.onGrade = onGrade;
        vm.onDisciplines = onDisciplines;
        vm.addDiscipline = addDiscipline;
        vm.onInterests = onInterests;
        vm.addInterest = addInterest;
        vm.addClazz = addClazz;
        vm.getClazzs = getClazzs;
        vm.enter = enter;
        vm.region = {};
        vm.regionConfig = {
            fixed: true,
            country: false
        };

        $scope.$on('onSchools', function (event, school) {
            setSchool(school);
        });

        $scope.$on('onClazzs', function (event, clazz) {
            if (clazz) {
                vm.user.clazz_id = clazz.id;
                vm.user.grade_id = clazz.grade_id;
            }
            onClazzs();
        });

        $scope.$watch(function () {
            return vm.school;
        }, setSchool, true);

        $scope.$watch(function () {
            return vm.user.type;
        }, function (type) {
            if (type) {
                var config;
                for (var i = 1; i < 5; i++) {
                    config = $scope.$modalConfig(i);
                    config.src = config.src.replace(/register\/(.+?)\/(.+?)/, 'register/' + type.toLowerCase() + '/$2');
                    switch (type) {
                        case 'Teacher':
                            $scope.$modalConfig({
                                bgColor: '#4182F0'
                            }, i);
                            break;
                        case 'Student':
                            $scope.$modalConfig({
                                bgColor: '#73c828'
                            }, i);
                            break;
                        case 'Parent':
                            $scope.$modalConfig({
                                bgColor: '#46c8f0'
                            }, i);
                            break;
                    }
                }
            }
        });

        $scope.$watch(function () {
            return {fields: vm.$fields, user: vm.user};
        }, function (values) {
            if (values.fields && values.user)check();
        }, true);

        function btn() {
            return {
                Teacher: 'btn-blue',
                Student: 'btn-green',
                Parent: 'btn-azure'
            }[vm.user.type];
        }

        function save(fields, step, create) {
            vm.$fields = fields.replace(/\s/g, '');
            var user = filter();
            if (check())return;
            Users[create ? 'add' : 'update']({
                userId: create ? null : vm.user.id
            }, {
                user: user
            }, function (result) {
                if (!result.errors) {
                    delete vm.$fields;
                    angular.extend(vm.user, result.data);
                    if (typeof step == 'number') {
                        $scope.$go(step);
                    }
                } else {
                    vm.verification.errors = result.errors[0];
                }
            });
        }

        function filter() {
            vm.$fields = vm.$fields || '';
            if (typeof vm.$fields == 'string') {
                vm.$fields = vm.$fields.split(',');
            }
            var user = vm.user;
            if (vm.$fields.length) {
                user = {};
                angular.forEach(vm.$fields, function (field) {
                    user[field] = vm.user[field];
                });
            }
            return user;
        }

        function check() {
            var user = filter(),
                keys = {},
                hasError = false;
            angular.forEach(user, function (v, k) {
                keys[k] = [];
            });
            vm.verification = {
                errors: keys
            };
            if (vm.$fields.has('username')) {
                if (!vm.user.username) {
                    hasError = true;
                    vm.verification.errors.username.push('required');
                } else if (!/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(vm.user.username)) {
                    hasError = true;
                    vm.verification.errors.username.push('invalid');
                }
            }
            if (vm.$fields.has('email')) {
                if (!vm.user.email) {
                    hasError = true;
                    vm.verification.errors.email.push('required');
                } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.user.email)) {
                    hasError = true;
                    vm.verification.errors.email.push('email_format');
                }
            }
            if (vm.$fields.has('password')) {
                if (!vm.user.password) {
                    hasError = true;
                    vm.verification.errors.password.push('required');
                } else if (vm.user.password.length < 4) {
                    hasError = true;
                    vm.verification.errors.password.push('invalid');
                }
            }
            if (vm.$fields.has('gender')) {
                if (!user.gender) {
                    hasError = true;
                    vm.verification.errors.gender.push('required');
                }
            }
            if (vm.$fields.has('realname')) {
                if (!user.realname) {
                    hasError = true;
                    vm.verification.errors.realname.push('required');
                } else if (!/^[\u2E80-\u9FFFa-zA-Z\s]+$/.test(user.realname)) {
                    hasError = true;
                    vm.verification.errors.realname.push('invalid');
                }
            }
            return hasError;
        }

        function onSuccess(user) {
            return function (result) {
                delete user.$uploading;
                user.avatar = result.key;
            }
        }

        function onRegion($regionType, $regionId) {
            vm.region[$regionType.toLowerCase() + 'Id'] = vm.region.lastId = $regionId;
            delete vm.user.school_id;
            onSchools();
        }

        function onGrade() {
            onClazzs();
        }

        function addClazz(step) {
            Students.add({
                type: vm.user.type,
                student: vm.clazz
            }, function () {
                if (typeof step === 'number') {
                    $scope.$go(step);
                } else {
                    getClazzs();
                }
            });
        }

        function getClazzs() {
            var defer = $q.defer();
            Students.all({
                user_id: vm.user.id
            }, function (result) {
                vm.user.clazzs = result.data;
                defer.resolve(result.data);
            });
            return defer.promise;
        }

        function enter() {
            $state.go('base.pbl.list');
        }

        function onDisciplines() {
            return function (tag, tags) {
                vm.user.disciplines = tags.map(function (item) {
                    return item.$label;
                });
            };
        }

        function addDiscipline(discipline) {
            vm.user.disciplines = vm.user.disciplines || [];
            if (!vm.user.disciplines.has(discipline)) {
                vm.user.disciplines.push(discipline);
            }
        }

        function onInterests() {
            return function (tag, tags) {
                vm.user.interests = tags.map(function (item) {
                    return item.$label;
                });
            };
        }

        function addInterest(interest) {
            vm.user.interests = vm.user.interests || [];
            if (!vm.user.interests.has(interest)) {
                vm.user.interests.push(interest);
            }
        }

        function onSchools(region_id) {
            Schools.all({
                region_id: region_id || vm.region.lastId
            }, function (result) {
                vm.schools = result.data;
            });
        }

        function setSchool(school) {
            if (school) {
                vm.user.school_id = school.id;
                var regions = {
                    countryId: school.country_id,
                    provinceId: school.province_id,
                    cityId: school.city_id,
                    districtId: school.district_id
                };
                angular.extend(vm.regionConfig, regions);
                angular.extend(vm.region, regions);
                vm.region.lastId = school.region_id;
                onSchools(school.region_id);
            } else {
                onSchools();
            }
        }

        function onClazzs() {
            Clazzs.all({
                school_id: vm.user.school_id,
                grade_id: vm.user.grade_id
            }, function (result) {
                vm.clazzs = result.data;
            });
        }


    }

})();