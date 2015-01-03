(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ToolbarUsersController', ToolbarUsersController);

    ToolbarUsersController.$inject = ['Users'];

    function ToolbarUsersController(Users) {
        var vm = this;
        Users.all(function (result) {
            vm.users = result.data;
        });
    }

})();