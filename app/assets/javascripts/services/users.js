(function () {
    'use strict';

    angular
        .module('app.services')
        .service('User', User)
        .service('Users', Users)
        .service('Friends', Friends)
        .service('Groups', Groups);

    User.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function User($resource, RESOURCE_ACTIONS) {
        return $resource('/user', {action: '@action'}, RESOURCE_ACTIONS);
    }

    Users.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Users($resource, RESOURCE_ACTIONS) {
        return $resource('/posts/:postId', {postId: '@postId', action: '@action'}, RESOURCE_ACTIONS);
    }

    Friends.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Friends($resource, RESOURCE_ACTIONS) {
        return $resource('/friends/:action/:friendId', {friendId: '@friendId', action: '@action'}, RESOURCE_ACTIONS);
    }

    Groups.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Groups($resource, RESOURCE_ACTIONS) {
        return $resource('/groups/:action/:groupId', {groupId: '@groupId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();