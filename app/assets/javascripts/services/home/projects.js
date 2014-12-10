(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('ProjectStandards', ProjectStandards)
        .service('Worksforms', Worksforms);

    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {projectId: '@projectId'}, RESOURCE_ACTIONS);
    }

    ProjectStandards.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectStandards($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId/standards/:standardId', {projectId: '@projectId', standardId: '@standardId'}, RESOURCE_ACTIONS);
    }

    Worksforms.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Worksforms($resource, RESOURCE_ACTIONS) {
        return $resource('/worksforms/:worksformId', {projectId: '@worksformId', action: '@action'}, RESOURCE_ACTIONS);
    }
})();