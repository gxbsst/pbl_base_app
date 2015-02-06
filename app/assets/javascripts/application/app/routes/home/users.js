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
                templateUrl: 'user/index.html',
                controller: 'UserController as vm'
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

        getUser.$inject = ['$q', '$stateParams', 'Users'];

        function getUser($q, $stateParams, Users){
            var defer = $q.defer();
            Users.get({
                userId: $stateParams.userId,
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