(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('Worksforms', Worksforms);

    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {projectId: '@projectId', action: '@action'}, RESOURCE_ACTIONS);
    }

    Worksforms.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Worksforms($resource, RESOURCE_ACTIONS) {
        return $resource('/worksforms/:worksformId', {projectId: '@worksformId', action: '@action'}, RESOURCE_ACTIONS);
    }
})();