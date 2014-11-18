(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routeHelperConfig', routeHelperConfig)
        .factory('routeHelper', routeHelper);

    routeHelperConfig.$inject = ['$routeProvider'];
    routeHelper.$inject = ['$location', '$rootScope', '$route', 'routeHelperConfig'];

    function routeHelperConfig($routeProvider) {
        this.config = {
            $routeProvider: $routeProvider
        };
        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routeHelper($location, $rootScope, $route, routeHelperConfig) {
        var handlingRouteChangeError = false,
            routeCounts = {
                errors: 0,
                changes: 0
            },
            routes = [],
            $routeProvider = routeHelperConfig.config.$routeProvider,
            service = {
                configureRoutes: configureRoutes,
                getRoutes: getRoutes,
                routeCounts: routeCounts
            };

        init();

        return service;

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.resolve = angular.extend(route.config.resolve || {}, routeHelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) return;
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    $rootScope.title = routeHelperConfig.config.docTitle + ' ' + (current.title || '');
                }
            );
        }
    }
})();
