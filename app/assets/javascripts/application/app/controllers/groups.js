(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GroupsListController', GroupsListController)
        .controller('GroupJoinController', GroupJoinController)
        .controller('GroupEditController', GroupEditController)
        .controller('GroupsShowController', GroupsShowController)
        .controller('GroupsMembersController', GroupsMembersController);

    GroupsListController.$inject = ['$scope', '$filter'];

    function GroupsListController($scope, $filter) {

        var vm = this;
        vm.filter = filter;

        function filter(group) {
            var name = $filter('group')(group);
            return !vm.keyword || name.toLowerCase().indexOf(vm.keyword.toLowerCase()) >= 0;
        }
    }

    GroupJoinController.$inject = ['$scope', '$state', 'User'];

    function GroupJoinController($scope, $state, User) {

        var vm = this;
        vm.join = join;

        function join() {
            User.add({
                action: 'join'
            }, {
                code: vm.code
            }, function (result) {
                if(result.errors){
                    vm.errors = result.errors;
                }else{
                    $scope.$emit('onGroupsChanged');
                    $state.go('base.home.groups.show.posts', {groupId: result.data.id});
                    $scope.destroyModal();
                }
            });
        }
    }

    GroupEditController.$inject = ['$scope', '$state', 'Groups'];

    function GroupEditController($scope, $state, Groups) {

        var vm = this,
            group = $scope.group;

        vm.group = group || {};
        vm.save = save;
        vm.label = label;
        vm.addTag = addTag;

        function save(){
            vm.$submitting = true;
            if(vm.group.id){
                Groups.update({
                    groupId: vm.group.id
                }, {
                    group: vm.group
                }, callback);
            }else{
                Groups.add({
                    group: vm.group
                }, callback);
            }

            function callback(result){
                delete vm.$submitting;
                $scope.$emit('onGroupsChanged', result.data);
                $state.go('base.home.groups.show.posts', {groupId: result.data.id});
                $scope.destroyModal();
            }
        }

        function addTag(tag) {
            vm.group.label = vm.group.label || [];
            if (!vm.group.label.has(tag)) {
                vm.group.label.push(tag);
            }
        }

        function label() {
            return function (tag, tags) {
                vm.group.label = tags.map(function (item) {
                    return item.$label;
                });
            };
        }

    }

    GroupsShowController.$inject = ['$scope', '$state', 'group', 'Groups'];

    function GroupsShowController($scope, $state, group, Groups) {

        var vm = this;
        vm.group = group;
        vm.isCreator = isCreator;
        vm.leave = leave;
        vm.remove = remove;

        $scope.$on('onGroupsChanged', function (event, data) {
            if(data && data.id === vm.group.id){
                angular.extend(vm.group, data);
            }
        });

        function isCreator(user_id){
            return user_id == (vm.group.clazz ? vm.group.clazz.user_id : vm.group.owner_id);
        }

        function leave(){
            if(confirm('您确定要退出吗？')){
                Groups.remove({
                    namespace: 'user',
                    groupId: group.id,
                    action: 'leave'
                }, function () {
                    $scope.$emit('onGroupsChanged');
                    $state.go('base.home.user');
                });
            }
        }

        function remove(){
            if(confirm('您确定要删除该群组吗？')){
                Groups.remove({
                    groupId: group.id
                }, function () {
                    $scope.$emit('onGroupsChanged');
                    $state.go('base.home.user');
                });
            }
        }
    }

    GroupsMembersController.$inject = ['$scope', 'group'];

    function GroupsMembersController($scope, group) {

        var vm = this;
        vm.group = group;

    }

})();
