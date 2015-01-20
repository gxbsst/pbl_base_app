(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Invitations', Invitations);

    Invitations.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Invitations($resource, RESOURCE_ACTIONS) {
        return $resource('/invitations/:action/:invitationId', {
            invitationId: '@invitationId',
            action: '@action'
        }, RESOURCE_ACTIONS);
    }

})();