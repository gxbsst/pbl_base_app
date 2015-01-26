(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.projects', {
                abstract: true,
                url: '/projects',
                template: '<div ui-view></div>'
            })
            .state('base.home.projects.index', {
                url: '',
                templateUrl: 'home/projects/index.html',
                resolve: {
                    criteria: function(){
                        return 'user_id';
                    }
                },
                controller:'ProjectIndexController as vm'
            });
    }

})();