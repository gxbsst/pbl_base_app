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

    GroupJoinController.$inject = ['$scope', 'User'];

    function GroupJoinController($scope, User) {

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
                    $scope.$emit('onGroups');
                }
            });
        }
    }

    GroupEditController.$inject = ['$scope'];

    function GroupEditController($scope) {

        var vm = this,
            group = $scope.group;

        vm.group = group || {};
        vm.addTag = addTag;

        function addTag(tag) {
            vm.group.label = vm.group.label || [];
            if (!vm.group.label.has(tag)) {
                vm.group.label.push(tag);
            }
        }

    }

    GroupsShowController.$inject = ['$scope', 'group'];

    function GroupsShowController($scope, group) {

        var vm = this;
        vm.group = group;
        vm.isCreator = isCreator;

        function isCreator(user_id){
            return user_id == (vm.group.clazz ? vm.group.clazz.user_id : vm.group.owner_id);
        }
    }

    GroupsMembersController.$inject = ['$scope', 'group'];

    function GroupsMembersController($scope, group) {

        var vm = this;
        vm.group = group;

    }

})();
