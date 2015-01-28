(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('base.home.groups', {
                abstract: true,
                url: '^/groups',
                template: '<div ui-view></div>'
            })
            .state('base.home.groups.show', {
                url: '/:groupId',
                templateUrl: 'groups/show.html',
                controller: 'GroupsShowController as vm',
                resolve: {
                    group: getGroup
                }
            });

        getGroup.$inject = ['$stateParams', '$q', 'Groups'];

        function getGroup($stateParams, $q, Groups){
            var defer = $q.defer();
            Groups.get({
                groupId: $stateParams.groupId
            },function (result) {
                defer.resolve(result.data);
            }, function () {
                defer.resolve(null);
            });
            return defer.promise;
        }

    }

})();