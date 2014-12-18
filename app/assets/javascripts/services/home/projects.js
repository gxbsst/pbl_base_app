(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('ProjectStandards', ProjectStandards)
        .service('ProjectSkills', ProjectSkills)
        .service('ProjectProducts', ProjectProducts)
        .service('ProjectGauges', ProjectGauges);


    Projects.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Projects($resource, RESOURCE_ACTIONS) {
        return $resource('/projects/:projectId', {
            projectId: '@projectId',
            include: 'knowledge,tasks'
        }, RESOURCE_ACTIONS);
    }

    ProjectStandards.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectStandards($resource, RESOURCE_ACTIONS) {
        return $resource('/project/standard_items/:action/:standardItemId', {
            action: '@action',
            standardItemId: '@standardItemId'
        }, RESOURCE_ACTIONS);
    }

    ProjectSkills.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectSkills($resource, RESOURCE_ACTIONS) {
        return $resource('/project/techniques/:action/:techniqueId', {
            action: '@action',
            techniqueId: '@techniqueId'
        }, RESOURCE_ACTIONS);
    }

    ProjectProducts.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectProducts($resource, RESOURCE_ACTIONS) {
        return $resource('/project/products/:action/:productId', {
            action: '@action',
            productId: '@productId'
        }, RESOURCE_ACTIONS);
    }

    ProjectGauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectGauges($resource, RESOURCE_ACTIONS) {
        return $resource('/project/gauges/:gaugeId', {
            action: '@action',
            gaugeId: '@gaugeId'
        }, RESOURCE_ACTIONS);
    }

})();