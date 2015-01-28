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
        vm.filter = filter;
        vm.isSelected = isSelected;
        vm.hasSelected = hasSelected;
        vm.setList = setList;
        vm.add = add;
        vm.remove = remove;

        getUsers();
        getMembers();
        $scope.$on('onMembersChange', getMembers);

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
                getUsers();
            }else{
                delete vm.users;
                Groups.get({
                    groupId: list,
                    include: 'member_ships,students'
                }, function (result) {
                    vm.users = result.data.clazz && result.data.clazz.students ?
                        result.data.clazz.students.map(function (student) {
                            return student.user;
                        }):
                        result.data.members.map(function (member) {
                            return member.user;
                        });

                });
            }
            vm.list = list;
        }

        function getUsers(){
            vm.users = angular.copy($rootScope.friends).map(function (friend_ship) {
                return friend_ship.friend;
            });
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
            }, emit);
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
            }, emit);

        }

        function emit(){
            $scope.$emit('onMembersChange');
        }

    }

})();