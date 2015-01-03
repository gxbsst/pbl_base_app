(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.news', {
                url: '^/news',
                templateUrl: 'news/index.html'
            })
            .state('base.news.show', {
                url: '/:articleId',
                templateUrl: 'news/show.html'
            });

    }

})();