(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.user', {
                url: '^/me',
                templateUrl: 'user/index.html'
            })
            .state('base.home.users', {
                url: '^/users',
                templateUrl: 'users/index.html',
                controller: 'UsersIndexController as vm'
            })
            .state('base.home.users.show', {
                url: '^/users/:userId',
                templateUrl: 'users/show.html',
                controller: 'UsersShowController as vm'
            });

    }

})();