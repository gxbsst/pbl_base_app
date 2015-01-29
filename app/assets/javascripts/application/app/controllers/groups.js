(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GroupsShowController', GroupsShowController)
        .controller('GroupsMembersController', GroupsMembersController);

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
