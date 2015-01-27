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
                templateUrl: 'home/projects/edit/layout.html',
                resolve: {
                    project: project
                },
                controller: 'ProjectEditController as vm'
            })
            .state('base.home.projects.edit.design', {
                url: '',
                templateUrl: 'home/projects/edit/views/design.html',
                controller:'ProjectEditDesignController as vm'
            })
            .state('base.home.projects.edit.gauges', {
                url: '/gauges',
                templateUrl: 'home/projects/edit/views/gauges.html',
                controller:'ProjectEditGaugesController as vm'
            })
            .state('base.home.projects.edit.info', {
                url: '/info',
                templateUrl: 'home/projects/edit/views/info.html',
                controller:'ProjectEditInfoController as vm'
            })
            .state('base.home.projects.edit.scaffold', {
                url: '/scaffold',
                templateUrl: 'home/projects/edit/views/scaffold.html',
                controller:'ProjectEditScaffoldController as vm'
            })
            .state('base.home.projects.edit.release', {
                url: '/release',
                templateUrl: 'home/projects/edit/views/release.html',
                controller:'ProjectEditReleaseController as vm'
            });

        project.$inject = ['$q', '$state', '$stateParams', 'Projects', 'getProject'];

        function project($q, $state, $stateParams, Projects, getProject){
            var defer = $q.defer();
            if($stateParams.projectId){
                getProject({projectId: $stateParams.projectId})
                    .then(function (project) {
                        defer.resolve(project);
                    });
            }else{
                Projects.add({
                    project: {
                        name: name
                    }
                }, function (result) {
                    $state.go('base.home.projects.edit.design', {projectId:result.data.id});
                });
            }
            return defer.promise;
        }

    }

})();