(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Gauges', Gauges);

    Gauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Gauges($resource, RESOURCE_ACTIONS) {
        return $resource('/gauges/:action/:id', {action: '@action', id: '@id'}, RESOURCE_ACTIONS);
    }

})();