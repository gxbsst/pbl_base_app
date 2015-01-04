(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ToolbarUsersController', ToolbarUsersController);

    ToolbarUsersController.$inject = ['Users', 'Groups'];

    function ToolbarUsersController(Users, Groups) {
        var vm = this;
        Users.all(function (result) {
            vm.users = result.data;
            angular.forEach(result.data, function (user) {
                Groups.add({
                    groupId: 'a2c3d572-b041-4886-855f-793cd841f97b',
                    user_id: user.id,
                    action: 'member_ships'
                });
            });
        });
    }

})();