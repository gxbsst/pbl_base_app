(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('MemberSelectorController', MemberSelectorController);

    MemberSelectorController.$inject = ['$rootScope', '$scope', 'ProjectMembers', 'Groups'];

    function MemberSelectorController($rootScope, $scope, ProjectMembers, Groups) {

        var vm = this,
            project = $scope.project;

        vm.list = 'friends';
        vm.users = angular.copy($rootScope.friends);
        vm.member_ships = angular.copy($rootScope.member_ships);
        vm.filter = filter;
        vm.isSelected = isSelected;
        vm.hasSelected = hasSelected;
        vm.setList = setList;
        vm.add = add;
        vm.remove = remove;

        getMembers();

        function getMembers(){
            ProjectMembers.all({
                projectId: project.id
            },function (result) {
                vm.members = result.data;
            });
        }

        function filter(user){
            return vm.keyword && user.username.toLowerCase().indexOf(vm.keyword.toLowerCase()) < 0;
        }

        function isSelected(user){
            return !vm.members.has(function (member) {
                return member.user.id == user.id;
            });
        }

        function hasSelected(users) {
            return (users || []).find(function (user) {
                return user.$selected;
            }).length;
        }

        function setList(list){
            if(list == 'friends'){
                vm.users = angular.copy($rootScope.friends);
            }else{
                Groups.get({
                    groupId: list
                }, function (result) {
                    vm.users = result.data.members.map(function (member) {
                        return member.user;
                    });
                });
            }
            vm.list = list;
        }

        function add() {
            ProjectMembers.add({
                projectId: project.id
            }, {
                user_ids: vm.users.find(function (user) {
                    return user.$selected;
                }).map(function (user) {
                    delete user.$selected;
                    return user.id;
                }).join(',')
            }, getMembers);
        }

        function remove() {
            ProjectMembers.remove({
                projectId: project.id,
                assignmentId: vm.members.find(function (member) {
                    return member.$selected;
                }).map(function (member) {
                    delete member.$selected;
                    return member.id;
                }).join(',')
            }, getMembers);
        }


    }

})();