(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('ProjectStandards', ProjectStandards)
        .service('ProjectGauges', ProjectGauges)
        .service('ProjectSkills', ProjectSkills);


    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {projectId: '@projectId'}, RESOURCE_ACTIONS);
    }

    ProjectStandards.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectStandards($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId/standards/:standardId', {projectId: '@projectId', standardId: '@standardId'}, RESOURCE_ACTIONS);
    }

    ProjectGauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectGauges($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId/gauges/:gaugeId', {projectId: '@projectId', gaugeId: '@gaugeId'}, RESOURCE_ACTIONS);
    }

    ProjectSkills.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectSkills($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId/skills/:skillId', {skillId: '@skillId', action: '@action', categorieId: '@categorieId'}, RESOURCE_ACTIONS);
    }

})();