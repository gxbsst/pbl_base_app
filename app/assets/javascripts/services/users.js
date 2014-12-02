(function () {
    'use strict';

    angular
        .module('app.services')
        .service('User', User)
        .service('Users', Users);

    User.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function User($resource, RESOURCE_ACTIONS) {
        return $resource('/user', {action: '@action'}, RESOURCE_ACTIONS);
    }

    Users.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Users($resource, RESOURCE_ACTIONS) {
        return $resource('/posts/:postId', {postId: '@postId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();