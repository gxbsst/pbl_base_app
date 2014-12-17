(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('ProjectStandards', ProjectStandards)
        .service('ProjectSkills', ProjectSkills)
        .service('ProjectGauges', ProjectGauges);


    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {projectId: '@projectId'}, RESOURCE_ACTIONS);
    }

    ProjectStandards.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectStandards($resource, RESOURCE_ACTIONS) {
        return $resource('/project/standard_items/:action/:standardItemId', {action: '@action', standardItemId: '@standardItemId'}, RESOURCE_ACTIONS);
    }

    ProjectSkills.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectSkills($resource, RESOURCE_ACTIONS) {
        return $resource('/project/techniques/:action/:techniqueId', {action: '@action', techniqueId: '@techniqueId'}, RESOURCE_ACTIONS);
    }

    ProjectGauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectGauges($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId/gauges/:gaugeId', {projectId: '@projectId', gaugeId: '@gaugeId'}, RESOURCE_ACTIONS);
    }

})();