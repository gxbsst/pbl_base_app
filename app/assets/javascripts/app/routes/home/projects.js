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
                url: '^/projects',
                template: '<div ui-view></div>'
            })
            .state('base.home.projects.index', {
                url: '',
                templateUrl: 'home/projects/index.html',
                controller:'HomePBLIndexController as vm'
            })
            .state('base.home.projects.create', {
                abstract: true,
                url: '/create',
                templateUrl: 'home/projects/create.html'
            })
            .state('base.home.projects.create.design', {
                url: '',
                templateUrl: 'home/projects/create/steps/design.html'
            })
            .state('base.home.projects.create.rubrics', {
                url: '/rubrics',
                templateUrl: 'home/projects/create/steps/rubrics.html'
            })
            .state('base.home.projects.create.new', {
                url: '/new',
                templateUrl: 'home/projects/create/steps/new.html'
            })
            .state('base.home.projects.create.scaffold', {
                url: '/scaffold',
                templateUrl: 'home/projects/create/steps/scaffold.html'
            })
            .state('base.home.projects.create.release', {
                url: '/release',
                templateUrl: 'home/projects/create/steps/release.html'
            })
            .state('base.home.projects.show', {
                url: '/:projectId',
                templateUrl: 'home/projects/index.html'
            });

    }

})();