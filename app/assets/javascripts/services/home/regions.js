(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Regions', Regions);

    Regions.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Regions($resource, RESOURCE_ACTIONS) {
        return $resource('/regions/:action/:regionId', {
            action: '@action',
            regionId: '@regionId',
            include: 'parents'
        }, RESOURCE_ACTIONS);
    }

})();