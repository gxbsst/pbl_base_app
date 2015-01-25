(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.user', {
                url: '^/i',
                templateUrl: 'user/index.html'
            })
            .state('base.home.users', {
                abstract: true,
                url: '^/users',
                template: '<div ui-view></div>'
            })
            .state('base.home.users.show', {
                url: '/:userId',
                templateUrl: 'users/show.html',
                controller: 'UsersShowController as vm',
                resolve: {
                    user: getUser
                }
            });

        getUser.$inject = ['$q', 'User'];

        function getUser($q, User){
            var defer = $q.defer();
            User.get({
                include: 'schools'
            },function (result) {
                defer.resolve(result.data);
            }, function () {
                defer.resolve(null);
            });
            return defer.promise;
        }

    }

})();