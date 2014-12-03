(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('root.home.pbl', {
                abstract: true,
                url: '/pbl',
                templateUrl: 'home/pbl/index.html'
            })
            .state('root.home.pbl.list', {
                url: '',
                templateUrl: 'home/pbl/list.html',
                controller: 'HomePBLIndexController'
            })
            .state('root.home.pbl.guide', {
                url: '/:step',
                views: {
                    '': {
                        templateUrl: 'home/pbl/guide.html',
                        controller: 'PBLGuideController as vm'
                    },
                    steps: {
                        templateUrl: 'home/pbl/steps.html'
                    },
                    map: {
                        templateUrl: 'home/pbl/map.html',
                        controller: 'PBLMapController'
                    }
                }
            });

    }

})();