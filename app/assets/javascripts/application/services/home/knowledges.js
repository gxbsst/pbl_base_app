(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Knowledge', Knowledge);

    Knowledge.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Knowledge($resource, RESOURCE_ACTIONS) {
        return $resource('/knowledges/:knowledgeId/:action', {
            knowledgeId: '@knowledgeId',
            action: '@action'
        }, RESOURCE_ACTIONS);
    }

})();