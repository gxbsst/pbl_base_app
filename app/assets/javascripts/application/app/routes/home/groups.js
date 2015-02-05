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
                abstract: true,
                url: '/:groupId',
                templateUrl: 'groups/show.html',
                controller: 'GroupsShowController as vm',
                resolve: {
                    group: getGroup
                }
            })
            .state('base.home.groups.show.posts', {
                url: '',
                templateUrl: 'posts/index.html',
                controller: 'PostsController as vm',
                resolve: {
                    owner: owner
                }
            })
            .state('base.home.groups.show.members', {
                url: '/members',
                templateUrl: 'groups/members.html',
                controller: 'GroupsMembersController as vm'
            });

        getGroup.$inject = ['$state', '$stateParams', '$q', 'Groups'];

        function getGroup($state, $stateParams, $q, Groups){
            var defer = $q.defer();
            Groups.get({
                groupId: $stateParams.groupId
            },function (result) {
                if(result.data){
                    defer.resolve(result.data);
                }else{
                    $state.go('base.home.user');
                }
            }, function () {
                defer.resolve(null);
            });
            return defer.promise;
        }

        owner.$inject = ['group'];

        function owner(group){
            return {
                type: 'Group',
                data: group
            }
        }

    }

})();