(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.projects.show', {
                abstract: true,
                url: '/:projectId',
                templateUrl: 'home/projects/show.html',
                resolve: {
                    project: getProject
                },
                controller: 'ProjectShowController'
            })
            .state('base.home.projects.show.info', {
                url: '',
                templateUrl: 'home/projects/show/info.html',
                controller: 'ProjectShowInfoController as vm'
            })
            .state('base.home.projects.show.members', {
                url: '/members',
                templateUrl: 'home/projects/show/members.html',
                controller: 'ProjectShowMembersController as vm'
            })
            .state('base.home.projects.show.knowledge', {
                url: '/gauges',
                templateUrl: 'home/projects/show/knowledge.html',
                controller: 'ProjectShowKnowledgeController as vm'
            })
            .state('base.home.projects.show.scaffold', {
                url: '/scaffold',
                templateUrl: 'home/projects/show/scaffold.html',
                controller: 'ProjectShowScaffoldController as vm'
            })
            .state('base.home.projects.show.assignment', {
                url: '/release',
                templateUrl: 'home/projects/show/assignment.html',
                controller: 'ProjectShowAssignmentController as vm'
            });

        getProject.$inject = ['$q', '$state', '$stateParams', 'getProject'];

        function getProject($q, $state, $stateParams, getProject) {
            var defer = $q.defer();
            if ($stateParams.projectId) {
                getProject({projectId: $stateParams.projectId})
                    .then(function (project) {
                        defer.resolve(project);
                    });
            } else {
                $state.go('base.pbl');
            }
            return defer.promise;
        }

    }

})();