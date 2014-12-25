(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Projects', Projects)
        .service('ProjectStandards', ProjectStandards)
        .service('ProjectTechniques', ProjectTechniques)
        .service('ProjectProducts', ProjectProducts)
        .service('ProjectGauges', ProjectGauges)
        .service('ProjectMembers', ProjectMembers)
        .service('ProjectTeachers', ProjectTeachers);


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
            standardItemId: '@standardItemId',
            include: 'standard_items'
        }, RESOURCE_ACTIONS);
    }

    ProjectTechniques.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectTechniques($resource, RESOURCE_ACTIONS) {
        return $resource('/project/techniques/:action/:techniqueId', {
            action: '@action',
            techniqueId: '@techniqueId',
            include: 'techniques'
        }, RESOURCE_ACTIONS);
    }

    ProjectProducts.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectProducts($resource, RESOURCE_ACTIONS) {
        return $resource('/project/products/:action/:productId', {
            action: '@action',
            productId: '@productId',
            include: 'product_forms'
        }, RESOURCE_ACTIONS);
    }

    ProjectGauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectGauges($resource, RESOURCE_ACTIONS) {
        return $resource('/project/rules/:gaugeId', {
            action: '@action',
            gaugeId: '@gaugeId',
            include: 'techniques'
        }, RESOURCE_ACTIONS);
    }

    ProjectMembers.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectMembers($resource, RESOURCE_ACTIONS) {
        return $resource('/project/members/:memberId', {
            action: '@action',
            memberId: '@memberId'
        }, RESOURCE_ACTIONS);
    }

    ProjectTeachers.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectTeachers($resource, RESOURCE_ACTIONS) {
        return $resource('/project/teachers/:teacherId', {
            action: '@action',
            teacherId: '@teacherId'
        }, RESOURCE_ACTIONS);
    }

})();