(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Curriculums', Curriculums);

    Curriculums.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Curriculums($resource, RESOURCE_ACTIONS) {
        return $resource('/curriculum/:action/:id', {action: '@action', id: '@id', limit: 100}, RESOURCE_ACTIONS);
    }

})();