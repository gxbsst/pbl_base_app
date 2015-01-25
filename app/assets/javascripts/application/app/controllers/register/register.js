(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$rootScope', '$state', '$q', 'Users', 'User', 'Steps', 'Schools', 'Students', 'Clazzs'];

    function RegisterController($scope, $rootScope, $state, $q, Users, User, Steps, Schools, Students, Clazzs) {

        var vm = this;

        vm.user = $scope.currentUser || {};
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
        vm.removeClazz = removeClazz;
        vm.getClazzs = getClazzs;
        vm.getInvitation = getInvitation;
        vm.enter = enter;
        vm.region = {};
        vm.clazz = {};
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
                var ctrl = $scope.getModalConfig();
                $scope.RegisterModalConfig(ctrl.$scope, type);
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
            if(typeof fields == 'number'){
                step = fields;
                fields = null;
            }
            if(fields){
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
                            if(create){
                                $rootScope.HANDLES.login(vm.user).then(function () {
                                    getCurrentUser().then(function (currentUser) {
                                        $rootScope.currentUser = currentUser;
                                        setStep(step);
                                    });
                                });
                            }else{
                                setStep(step);
                            }
                        }
                    } else {
                        vm.verification.errors = result.errors[0];
                    }
                });
            }else{
                setStep(step);
            }
        }

        function setStep(step){
            if($rootScope.currentUser){
                Steps.post({
                    current_step: step
                }, function () {
                    $scope.setStep(step);
                });
            }else{
                $scope.setStep(step);
            }
        }

        function getCurrentUser(){
            var defer = $q.defer();
            User.get(function (result) {
                defer.resolve(result.data);
            }, function () {
                defer.reject();
            });
            return defer.promise;
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
            vm.clazz.user_id = vm.user.id;
            Students.add({
                type: vm.user.type,
                student: vm.clazz
            }, function () {
                if (typeof step === 'number') {
                    save(step);
                } else {
                    vm.clazz = {};
                    getClazzs();
                }
            });
        }

        function removeClazz(id){
            if(confirm('您确定要退出这个班级吗？')){
                Students.remove({
                    studentId: id
                }, getClazzs);
            }
        }

        function getClazzs(one) {
            Students.all({
                user_id: vm.user.id
            }, function (result) {
                var clazzs = result.data;
                if(one){
                    vm.user.clazz = clazzs[0];
                    vm.clazz = {
                        $grade_id: clazzs[0].clazz.grade_id,
                        clazz_id: clazzs[0].clazz.id
                    };
                }else{
                    vm.user.clazzs = clazzs;
                }
            });
        }

        function getInvitation(){
            User.get({
                action: 'invitations'
            }, function (result) {
                 vm.invitation = result.data[0];
            });
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
                school_id: vm.user.school ? vm.user.school.id : vm.user.school_id,
                grade_id: vm.clazz ? vm.clazz.$grade_id : vm.user.grade_id
            }, function (result) {
                vm.clazzs = result.data;
            });
        }


    }

})();