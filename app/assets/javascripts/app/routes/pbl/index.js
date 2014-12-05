(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.pbl', {
                url: '^/pbl',
                templateUrl: 'pbl/index.html'
            })
            .state('base.pbl.show', {
                url: '/:projectId',
                templateUrl: 'pbl/show.html'
            });

    }

})();