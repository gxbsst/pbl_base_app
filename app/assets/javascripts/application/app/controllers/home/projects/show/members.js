(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowMembersController', ProjectShowMembersController);

    ProjectShowMembersController.$inject = ['$scope', 'Groupings', 'Discussions', 'ProjectMembers', 'project'];

    function ProjectShowMembersController($scope, Groupings, Discussions, ProjectMembers, project) {

        var vm = this;
        vm.project = project;
        vm.destroy = destroy;
        vm._destroy = _destroy;
        vm.getUser = getUser;
        vm.grouping = grouping;
        vm.release = release;
        vm.isGrouped = isGrouped;
        vm.grouped = grouped;
        vm.onBegin = onBegin;
        vm.onDropped = onDropped;

        getMembers();
        getDiscussions();
        $scope.$on('onMembersChange', getMembers);

        function getMembers() {
            ProjectMembers.all({
                projectId: project.id
            }, function (result) {
                vm.members = result.data;
                vm.usersHash = {};
                angular.forEach(vm.members, function (member) {
                    vm.usersHash[member.user.id] = member.user;
                });
                save();
            });
        }

        function getGroupings() {
            Groupings.get({
                projectId: project.id
            }, function (result) {
                var cache = result.cache;
                if (cache) {
                    cache = JSON.parse(cache);
                    vm.count = cache.count;
                    vm.groups = cache.groups;
                }
            });
        }

        function getDiscussions() {
            Discussions.all({
                project_id: project.id
            }, function (result) {
                var discussions = result.data,
                    count = discussions.length;
                if (count) {
                    vm.released = true;
                    vm.count = count;
                    vm.groups = discussions;
                } else {
                    getGroupings();
                }
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
            $event && $event.stopPropagation();
            group.members.remove(function (item) {
                return item == user_id;
            });
            save();
        }

        function getUser(user_id, group) {
            var user = vm.usersHash[user_id];
            if (!user) {
                group.members.remove(function (item) {
                    return item == user_id;
                });
                return {};
            }
            return user;
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
                    project_id: project.id,
                    members: members.slice(i * size, i * size + size)
                });
            }
            if (remainder) {
                angular.forEach(members.slice(count * size, members.length), function (user_id, i) {
                    groups[i].members.push(user_id);
                });
            }
            vm.groups = groups;
            save();
        }

        function save() {
            if (vm.count && vm.groups) {
                if(vm.released){
                    angular.forEach(vm.groups, function (discussion) {
                        Discussions.update({discussionId: discussion.id}, {discussion: {members: discussion.members}});
                    });
                }else{
                    Groupings.add({
                        grouping: {
                            project_id: project.id,
                            cache: JSON.stringify({
                                count: vm.count,
                                groups: vm.groups
                            })
                        }
                    });
                }
            }
        }

        function release() {
            if (confirm('分组发布后将不可修改，是否现在发布？')) {
                vm.released = true;
                Discussions.add({discussion: vm.groups});
            }
        }

        function isGrouped(member) {
            if (vm.groups) {
                for (var i = 0, l = vm.groups.length; i < l; i++) {
                    if (vm.groups[i].members.has(function (user_id) {
                            return member.user.id === user_id;
                        })) {
                        return true;
                    }
                }
            }
        }

        function grouped() {
            var grouped = 0;
            if (vm.groups) {
                angular.forEach(vm.groups, function (group) {
                    grouped += group.members.length;
                });
            }
            return vm.members && vm.members.length && grouped == vm.members.length;
        }

        function onBegin(group) {
            vm.origin = group;
        }

        function onDropped(user_id, $target) {
            if ($target) {
                $target.members.push(user_id);
            }
            if (vm.origin) {
                vm.origin.members.remove(function (item) {
                    return item == user_id;
                });
            }
            if ($target || vm.origin) {
                save();
            }
        }

    }

})();