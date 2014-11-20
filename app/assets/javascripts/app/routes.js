(function () {
    'use strict';

    angular
        .module('app.pbl')
        .config(configure)
        .run(routeConfig);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider){

        $urlRouterProvider
            //.when('/c?id', '/contacts/:id')
            //.when('/user/:id', '/contacts/:id')
            .otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                views:{
                    '':{
                        templateUrl: 'layout/index.html'
                    },
                    'footer@': {
                        templateUrl: 'layout/footer.html'
                    }
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home/index.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('header', {
                templateUrl: 'layout/header.html'
            })
            .state('about', {
                url: '/about',
                templateProvider: aboutProvider
            });

        aboutProvider.$inject = ['$timeout'];

        function aboutProvider($timeout){
            return $timeout(function () {
                return 'about template';
            }, 100);
        }
    }

    routeConfig.$inject = ['$rootScope', '$state', '$stateParams'];

    function routeConfig($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        console.log($state)

    }


})();