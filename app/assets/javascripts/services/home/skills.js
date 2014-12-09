(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Skills', Skills);

    Skills.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Skills($resource, RESOURCE_ACTIONS) {
        return $resource('/skills/:skillId/:action/:categorieId', {skillId: '@skillId', action: '@action', categorieId: '@categorieId'}, RESOURCE_ACTIONS);
    }

})();