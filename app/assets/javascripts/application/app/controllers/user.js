(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('UserController', UserController);

    UserController.$inject = ['currentUser', 'User'];

    function UserController(currentUser, User) {

        var vm = this;

        vm.user = currentUser;

        User.get({
            action: 'clazzs'
        }, function (result) {
            vm.user.clazzs = result.data;
        });
    }

})();
