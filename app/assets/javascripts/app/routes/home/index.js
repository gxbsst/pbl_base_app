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
                templateUrl: 'home/layout.html'
            })
            .state('base.home.index', {
                url: '',
                templateUrl: 'home/index.html'
            });

    }

})();