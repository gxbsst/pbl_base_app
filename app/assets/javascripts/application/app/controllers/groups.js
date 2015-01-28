(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GroupsShowController', GroupsShowController);

    GroupsShowController.$inject = ['$scope', 'group'];

    function GroupsShowController($scope, group) {
        var vm = this;
        vm.group = group;
    }

})();
