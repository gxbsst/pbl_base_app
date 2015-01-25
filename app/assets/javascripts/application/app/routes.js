(function () {
    'use strict';

    angular
        .module('app.routes', ['ui.router'])
        .config(configure)
        .run(routeConfig);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('base', {
                abstract: true,
                url: '/',
                template: '<div ui-view></div>',
                controller: 'BaseController as base',
                resolve: {
                    currentUser: getCurrentUser,
                    friends: getFriends
                }
            })
            .state('base.index', {
                url: '',
                views: {
                    '': {
                        templateUrl: 'index/index.html',
                        controller: 'IndexController as vm'
                    },
                    'header@': {
                        templateUrl: 'index/header.html'
                    },
                    'footer@': {
                        templateUrl: 'layout/footer.html'
                    }
                }
            })
            .state('base.projects', {
                abstract: true,
                url: '^/projects',
                template: '<div ui-view></div>',
                views: {
                    '': {
                        template: '<div ui-view></div>'
                    },
                    'header@': {
                        templateUrl: 'index/header.html'
                    },
                    'footer@': {
                        templateUrl: 'layout/footer.html'
                    }
                }
            })
            //.state('base.projects.list', {
            //    url: '',
            //    templateUrl: 'projects/index.html'
            //})
            .state('base.projects.show', {
                url: '/:projectId',
                templateUrl: 'projects/show.html',
                controller: 'HomeProjectShowController as vm'
            })
            .state('import', {
                abstract: true,
                url: '^/import',
                templateUrl: 'import/index.html'
            })
            .state('import.standards', {
                url: '/standards',
                templateUrl: 'import/standards.html',
                controller: 'ImportController as vm'
            })
            .state('base.demos', {
                url: '^/demos',
                views: {
                    '': {
                        templateUrl: 'demos/index.html',
                        controller: 'DemosController as vm'
                    },
                    'toolbar@': {
                        templateUrl: 'home/toolbar/index.html',
                        controller: 'HomeToolbarController as vm'
                    }
                }
            });

        getCurrentUser.$inject = ['$rootScope', '$q', 'User'];

        function getCurrentUser($rootScope, $q, User){
            var defer = $q.defer();
            if($rootScope.currentUser){
                defer.resolve($rootScope.currentUser);
            }else{
                User.get({
                    include: 'schools'
                },function (result) {
                    $rootScope.currentUser = result.data;
                    defer.resolve($rootScope.currentUser);
                }, function () {
                    defer.resolve(null);
                });
            }
            return defer.promise;
        }

        getFriends.$inject = ['$rootScope', '$q', 'Friends'];

        function getFriends($rootScope, $q, Friends){
            var defer = $q.defer();
            if($rootScope.friends){
                defer.resolve($rootScope.friends);
            }else{
                Friends.get(function (result) {
                    $rootScope.friends = result.data;
                    defer.resolve($rootScope.friends);
                }, function () {
                    defer.resolve();
                });
            }
            return defer.promise;
        }
    }

    routeConfig.$inject = ['$rootScope', '$state', '$stateParams'];

    function routeConfig($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

    }

})();