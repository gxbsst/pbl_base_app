(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects);

    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {projectId: '@projectId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();