(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Skills', Skills);

    Skills.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Skills($resource, RESOURCE_ACTIONS) {
        return $resource('/skill/:action/:id', {action: '@action', id: '@id', limit: 100}, RESOURCE_ACTIONS);
    }

})();