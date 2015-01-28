(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home', {
                abstract: true,
                url: '^/home',
                views: {
                    '': {
                        templateUrl: 'home/layout.html'
                    },
                    'header@': {
                        templateUrl: 'layout/header.html'
                    },
                    'footer@': {
                        templateUrl: 'layout/footer.html'
                    },
                    'toolbar@': {
                        templateUrl: 'home/toolbar/index.html',
                        controller: 'HomeToolbarController as vm'
                    }
                },
                resolve: {
                    authenticate: authenticate,
                    friends: getFriends,
                    groups: getGroups
                }
            })
            .state('base.home.index', {
                url: '',
                templateUrl: 'home/index.html',
                controller: 'HomeIndexController as vm'
            });

        authenticate.$inject = ['$q', 'currentUser'];

        function authenticate($q, currentUser) {
            var defer = $q.defer();
            if (currentUser) {
                defer.resolve(currentUser);
            } else {
                window.location.href = '/users/sign_in';
            }
            return defer.promise;
        }

        getFriends.$inject = ['$rootScope', '$q', 'User'];

        function getFriends($rootScope, $q, User) {
            var defer = $q.defer();
            if ($rootScope.friends) {
                defer.resolve($rootScope.friends);
            } else {
                User.get({
                    action: 'friends'
                }, function (result) {
                    result.data.sort(function (a, b) {
                        return (a.friend.realname || a.friend.username).localeCompare((b.friend.realname || b.friend.username));
                    });
                    $rootScope.friends = result.data;
                    defer.resolve($rootScope.friends);
                }, function () {
                    defer.resolve();
                });
            }
            return defer.promise;
        }

        getGroups.$inject = ['$rootScope', '$q', 'User'];

        function getGroups($rootScope, $q, User) {
            var defer = $q.defer();
            if ($rootScope.groups) {
                defer.resolve($rootScope.groups);
            } else {
                User.get({
                    action: 'groups'
                }, function (result) {
                    result.data.sort(function (a, b) {
                        return !a.clazz && b.clazz ? 1 : -1;
                    });
                    $rootScope.groups = result.data;
                    defer.resolve($rootScope.groups);
                }, function () {
                    defer.resolve();
                });
            }
            return defer.promise;
        }

    }

})();