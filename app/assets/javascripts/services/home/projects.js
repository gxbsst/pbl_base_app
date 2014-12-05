(function () {
    'use strict';

    angular
        .module('app.services')
        .service('HomeProjects', HomeProjects);

    HomeProjects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function HomeProjects($resource, RESOURCE_ACTIONS) {
        return $resource('/posts/:postId', {postId: '@postId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();