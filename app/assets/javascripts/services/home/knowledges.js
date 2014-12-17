(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Knowledges', Knowledges);

    Knowledges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Knowledges($resource, RESOURCE_ACTIONS) {
        return $resource('/knowledge/:knowledgeId', {worksformId: '@knowledgeId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();