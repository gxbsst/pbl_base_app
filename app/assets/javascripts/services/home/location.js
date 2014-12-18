(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Area', Area)
        .service('Location', Location)
    ;

    Area.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Area($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }


    Location.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Location($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();