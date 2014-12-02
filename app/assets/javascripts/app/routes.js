(function () {
    'use strict';

    angular
        .module('app.routes', ['ui.router'])
        .config(configure)
        .run(routeConfig);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            //.when('/c?id', '/contacts/:id')
            //.when('/user/:id', '/contacts/:id')
            .otherwise('/');

        $stateProvider
            .state('root', {
                url: '/',
                views:{
                    header: {
                        templateUrl: 'layout/header.html',
                        controller: 'HeaderController'
                    },
                    '': {
                        template: '<div ui-view></div>'
                    },
                    footer: {
                        templateUrl: 'layout/footer.html'
                    }
                },
                resolve: {
                    currentUser: currentUserResolve
                }
            })
            .state('root.home', {
                url: '^/home',
                templateUrl: 'home/index.html',
                controller: 'HomeController as vm'
            })
            .state('root.pbl', {
                url: '^/pbl',
                templateUrl: 'pbl/index.html',
                controller: 'PBLController as vm'
            })
            .state('demos', {
                url: '/demos',
                templateUrl: 'demos/index.html',
                controller: 'DemosController as vm'
            })
            .state('root.news', {
                url: '^/news',
                templateUrl: 'news/index.html'
            })
            .state('about', {
                url: '/about',
                templateProvider: aboutProvider
            });

        currentUserResolve.$inject = ['$rootScope', 'User'];

        function currentUserResolve($rootScope, User){
            $rootScope.currentUser = $rootScope.currentUser || User.add();
            return $rootScope.currentUser;
        }

        aboutProvider.$inject = ['$timeout'];

        function aboutProvider($timeout) {
            return $timeout(function () {
                return 'about template';
            }, 100);
        }
    }

    routeConfig.$inject = ['$rootScope', '$state', '$stateParams'];

    function routeConfig($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

    }


})();