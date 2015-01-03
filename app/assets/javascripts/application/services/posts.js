(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Posts', Posts);

    Posts.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Posts($resource, RESOURCE_ACTIONS) {
        return $resource('/posts/:postId', {postId: '@postId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();