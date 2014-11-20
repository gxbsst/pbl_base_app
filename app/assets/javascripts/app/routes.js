(function() {
    'use strict';

    angular
        .module('app.pbl')
        .run(routeConfig);

    routeConfig.$inject = ['routeHelper'];

    function routeConfig(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/home',
                config: {
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    templateUrl: 'home/index.html'
                }
            },
            {
                url: '/styles',
                config: {
                    controller: 'StylesController',
                    controllerAs: 'vm',
                    templateUrl: 'styles/index.html'
                }
            }
        ];
    }

})();