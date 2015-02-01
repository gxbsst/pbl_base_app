(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Posts', Posts)
        .service('Comments', Comments);

    Posts.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Posts($resource, RESOURCE_ACTIONS) {
        return $resource('/posts/:postId/:action', {
            postId: '@postId',
            action: '@action'
        }, RESOURCE_ACTIONS);
    }

    Comments.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Comments($resource, RESOURCE_ACTIONS) {
        return $resource('/comments/:commentId/:action', {
            commentId: '@commentId',
            action: '@action'
        }, RESOURCE_ACTIONS);
    }

})();