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
                }
            })
            .state('base.home.index', {
                url: '',
                templateUrl: 'home/index.html',
                controller: 'HomeIndexController as vm'
            });

    }

})();