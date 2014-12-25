(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.projects.edit', {
                abstract: true,
                url: '/edit/:projectId',
                templateUrl: 'home/projects/edit/viewer.html',
                resolve: {
                    project: getProject
                },
                controller: 'ProjectCreateController'
            })
            .state('base.home.projects.edit.design', {
                url: '',
                templateUrl: 'home/projects/edit/steps/design.html',
                controller:'ProjectCreateDesignController as vm'
            })
            .state('base.home.projects.edit.gauges', {
                url: '/gauges',
                templateUrl: 'home/projects/edit/steps/gauges.html',
                controller:'ProjectCreateGaugesController as vm'
            })
            .state('base.home.projects.edit.info', {
                url: '/info',
                templateUrl: 'home/projects/edit/steps/info.html',
                controller:'ProjectCreateInfoController as vm'
            })
            .state('base.home.projects.edit.scaffold', {
                url: '/scaffold',
                templateUrl: 'home/projects/edit/steps/scaffold.html',
                controller:'ProjectCreateScaffoldController as vm'
            })
            .state('base.home.projects.edit.release', {
                url: '/release',
                templateUrl: 'home/projects/edit/steps/release.html',
                controller:'ProjectCreateReleaseController as vm'
            });

        getProject.$inject = ['$q', '$state', '$stateParams', 'Projects', 'getProject'];

        function getProject($q, $state, $stateParams, Projects, getProject){
            var defer = $q.defer();
            if($stateParams.projectId){
                getProject({projectId: $stateParams.projectId})
                    .then(function (project) {
                        defer.resolve(project);
                    });
            }else{
                Projects.add(function (result) {
                    $state.go('base.home.projects.edit.design', {projectId:result.data.id});
                });
            }
            return defer.promise;
        }

    }

})();