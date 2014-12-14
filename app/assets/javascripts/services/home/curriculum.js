(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Curriculum', Curriculum);

    Curriculum.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Curriculum($resource, RESOURCE_ACTIONS) {
        return $resource('/curriculum/:action/:id', {action: '@action', id: '@id'}, RESOURCE_ACTIONS);
    }

})();