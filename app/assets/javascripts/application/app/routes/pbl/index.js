(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            //.state('base.pbl', {
            //    url: '^/pbl',
            //    templateUrl: 'pbl/index.html'
            //})
            .state('base.pbl',  {
                abstract: true,
                url: '^/pbl',
                template: '<div ui-view></div>',
                views: {
                    '': {
                        template: '<div ui-view></div>'
                    },
                    'header@': {
                        templateUrl: 'layout/header.html'
                    },
                    'banner@': {
                        templateUrl: 'layout/banner-pbl.html'
                    },
                    'footer@': {
                        templateUrl: 'layout/footer.html'
                    }
                }
            })
            .state('base.pbl.list', {
                url: '',
                templateUrl: 'pbl/index.html',
                controller: 'PBLController as vm'
            })
            .state('base.pbl.show', {
                url: '/:projectId',
                templateUrl: 'pbl/show.html',
                resolve: {
                    project: project
                },
                controller: 'PBLShowController as vm'
            })
        ;


        project.$inject = ['$q', '$state', '$stateParams', 'Projects', 'getProject'];

        function project($q, $state, $stateParams, Projects, getProject){
            var defer = $q.defer();
            if($stateParams.projectId){
                getProject({projectId: $stateParams.projectId})
                    .then(function (project) {
                        defer.resolve(project);
                    });
            }else{
                $state.go('base.pbl.list');

            }
            return defer.promise;
        }
    }

})();