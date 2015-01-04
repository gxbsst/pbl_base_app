(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowMembersController', ProjectShowMembersController);

    ProjectShowMembersController.$inject = ['utils', 'ProjectMembers', 'project'];

    function ProjectShowMembersController(utils, ProjectMembers, project) {

        var vm = this;
        vm.project = project;
        vm.destroy = destroy;
        vm._destroy = _destroy;
        vm.getUser = getUser;
        vm.grouping = grouping;

        getMembers();

        function getMembers() {
            ProjectMembers.all({
                projectId: project.id
            }, function (result) {
                vm.members = result.data;
                vm.usersHash = {};
                angular.forEach(vm.members, function (member) {
                    vm.usersHash[member.user.id] = member.user;
                });
            });
        }

        function destroy(member, $event) {
            $event.stopPropagation();
            member.$disabled = true;
            ProjectMembers.remove({
                projectId: project.id,
                assignmentId: member.id
            }, getMembers);
        }

        function _destroy(group, user_id, $event) {
            $event.stopPropagation();
            group.members.remove(function (item) {
                return item == user_id;
            });
        }

        function getUser(user_id) {
            return vm.usersHash[user_id];
        }

        function grouping(count) {
            count = parseInt(count, 10);
            var members = angular.copy(vm.members).sort(function () {
                    return Math.random() > .5;
                }).map(function (member) {
                    return member.user.id;
                }),
                remainder = members.length % count,
                size = parseInt(members.length / count, 10),
                groups = [];
            for (var i = 0; i < count; i++) {
                groups.push({
                    name: '分组',
                    no: i + 1,
                    members: members.slice(i * size, i * size + size)
                });
            }
            if (remainder) {
                angular.forEach(members.slice(count * size, members.length), function (user_id, i) {
                    groups[i].members.push(user_id);
                });
            }
            vm.groups = groups;
        }

    }

})();