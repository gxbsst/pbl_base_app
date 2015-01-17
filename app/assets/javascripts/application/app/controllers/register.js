(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', 'Register'];

    function RegisterController($scope, Register) {

        var vm = this;

        vm.user = {};
        vm.btn = btn;
        vm.create = create;

        $scope.$watch(function () {
            return vm.user.type;
        }, function (type) {
            for (var i = 2; i < 3; i++) {
                switch (type) {
                    case 'Teacher':
                        angular.extend($scope.$get(i), {
                            bgColor: '#4182F0',
                            src: 'register/teacher/info.html'
                        });
                        break;
                    case 'Student':
                        angular.extend($scope.$get(i), {
                            bgColor: '#73c828',
                            src: 'register/student/info.html'
                        });
                        break;
                    case 'Parent':
                        angular.extend($scope.$get(i), {
                            bgColor: '#46c8f0',
                            src: 'register/parent/info.html'
                        });
                        break;
                }
            }
        });

        function btn(){
            return {
                Teacher: 'btn-blue',
                Student: 'btn-green',
                Parent: 'btn-azure'
            }[vm.user.type];
        }

        function create() {
            vm.account = {
                errors: {
                    username: [],
                    email: [],
                    password: []
                }
            };
            if (!vm.user.username) {
                vm.account.hasError = true;
                vm.account.errors.username.push('required');
            } else if (!/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(vm.user.username)) {
                vm.account.hasError = true;
                vm.account.errors.username.push('invalid');
            }
            if (!vm.user.email) {
                vm.account.hasError = true;
                vm.account.errors.email.push('required');
            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.user.email)) {
                vm.account.hasError = true;
                vm.account.errors.email.push('invalid');
            }
            if (!vm.user.password) {
                vm.account.hasError = true;
                vm.account.errors.password.push('required');
            } else if (vm.user.password.length < 4) {
                vm.account.hasError = true;
                vm.account.errors.password.push('invalid');
            }
            if (vm.account.hasError)return;
            Register.add({
                user: vm.user
            }, function (result) {
                if (!result.errors) {
                    $scope.$go(2);
                } else {
                    vm.account.errors = result.errors[0];
                }
            });

        }

    }

})();