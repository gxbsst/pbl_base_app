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
                controller: 'BaseController',
                resolve: {
                    currentUser: currentUserResolve
                }
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

        currentUserResolve.$inject = ['$rootScope', 'User'];

        function currentUserResolve($rootScope, User){
            $rootScope.currentUser = $rootScope.currentUser || User.get();
            return $rootScope.currentUser;
        }
    }

    routeConfig.$inject = ['$rootScope', '$state', '$stateParams'];

    function routeConfig($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

    }

})();