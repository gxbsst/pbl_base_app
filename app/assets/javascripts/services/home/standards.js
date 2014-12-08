(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Standards', Standards);

    Standards.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Standards($resource, RESOURCE_ACTIONS) {
        return $resource('/standards/:subjectId/:action/:gradeId', {subjectId: '@subjectId', action: '@action', gradeId: '@gradeId'}, RESOURCE_ACTIONS);
    }

})();