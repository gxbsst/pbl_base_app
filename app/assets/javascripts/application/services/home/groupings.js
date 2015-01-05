(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Groupings', Groupings);

    Groupings.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Groupings($resource, RESOURCE_ACTIONS) {
        return $resource('/groupings/:projectId', {
            projectId: '@projectId'
        }, RESOURCE_ACTIONS);
    }

})();