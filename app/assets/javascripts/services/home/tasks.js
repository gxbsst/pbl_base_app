(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Disciplines', Disciplines)
        ;

    Disciplines.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Disciplines($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }



})();