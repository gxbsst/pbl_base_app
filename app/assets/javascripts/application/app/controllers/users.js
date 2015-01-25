(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('UsersShowController', UsersShowController);

    UsersShowController.$inject = ['$scope', 'user'];

    function UsersShowController($scope, user) {
        var vm = this;
        vm.user = user;
    }

})();
