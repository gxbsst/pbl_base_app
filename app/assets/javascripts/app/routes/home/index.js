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
                url: '',
                views: {
                    '': {
                        templateUrl: 'home/layout.html'
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