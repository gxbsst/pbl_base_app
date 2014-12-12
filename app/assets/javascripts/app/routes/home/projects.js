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
                controller:'HomeProjectIndexController as vm'
            })
            .state('base.home.projects.create', {
                abstract: true,
                url: '/create/:projectId',
                templateUrl: 'home/projects/create.html',
                resolve: {
                    project: getProject
                },
                controller: 'HomeProjectCreateController'
            })
            .state('base.home.projects.create.design', {
                url: '',
                templateUrl: 'home/projects/create/steps/design.html',
                controller:'HomeProjectCreateDesignController as vm'
            })
            .state('base.home.projects.create.gauges', {
                url: '/gauges',
                templateUrl: 'home/projects/create/steps/gauges.html',
                controller:'HomeProjectCreateGaugesController as vm'
            })
            .state('base.home.projects.create.new', {
                url: '/new',
                templateUrl: 'home/projects/create/steps/new.html',
                controller:'HomeProjectCreateNewController as vm'
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

        getProject.$inject = ['$q', '$state', '$stateParams', 'Projects'];

        function getProject($q, $state, $stateParams, Projects){
            var defer = $q.defer();
            if($stateParams.projectId){
                Projects.get({projectId:$stateParams.projectId}, function (result) {
                    defer.resolve(result.data);
                });
            }else{
                Projects.add(function (result) {
                    $state.go('base.home.projects.create.design', {projectId:result.data.id});
                });
            }
            return defer.promise;
        }

    }

})();