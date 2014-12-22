(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('MemberSelectorController', MemberSelectorController);

    MemberSelectorController.$inject = ['$scope', 'Friends', 'Groups', 'ProjectMembers'];

    function MemberSelectorController($scope, Friends, Groups, ProjectMembers) {

        var vm = this;

        vm.friends = Friends.all();
        vm.groups = Groups.all();
        vm.members = [];
        vm.users = [];
        vm.onSearch = onSearch;
        vm.isSelected = isSelected;
        vm.findSelected = findSelected;
        vm.add = add;
        vm.remove = remove;

        ProjectMembers.all(function (result) {
            vm.members = result.data;
        });

        $scope.$watch(function () {
            return vm.friends.data;
        }, function (users) {
            if(users){
                vm.users = users;
                vm.$users = users;
            }
        });

        function onSearch() {
            if (vm.keyword) {
                vm.users = vm.$users.find(function (user) {
                    return user.name.toLowerCase().indexOf(vm.keyword.toLowerCase()) >= 0;
                });
            } else {
                vm.users = vm.$users;
            }
        }

        function findSelected(users) {
            return users && users.find(function (user) {
                return user.$selected;
            });
        }

        function isSelected(user) {
            return vm.members.has(function (u) {
                return u.id === user.id;
            });
        }

        function add() {
            var users = angular.copy(vm.users),
                finder = function (user) {
                    return user.$selected;
                },
                map = function (user) {
                    delete user.$selected;
                    return user;
                };
            vm.members = users.find(finder).map(map).concat(vm.members);
            vm.users.map(map);
        }

        function remove() {
            vm.members.removeAll(function (user) {
                return user.$selected;
            });
        }


    }

})();