(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Groups', Groups);

    Groups.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Groups($resource, RESOURCE_ACTIONS) {
        return $resource('/groups/:action/:groupId', {action: '@action', groupId: '@groupId'}, RESOURCE_ACTIONS);
    }

})();