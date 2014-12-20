(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Regions', Regions)
    ;

    Regions.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Regions($resource, RESOURCE_ACTIONS) {
        return $resource('/regions/:regionsId', {regionsId: '@regionsId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();