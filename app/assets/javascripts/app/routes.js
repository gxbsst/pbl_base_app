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
                resolve: {
                    currentUser: currentUserResolve
                }
            })
            .state('demos', {
                url: '/demos',
                templateUrl: 'demos/index.html',
                controller: 'DemosController as vm'
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