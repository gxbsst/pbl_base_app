(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Notifications', Notifications);

    Notifications.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Notifications($resource, RESOURCE_ACTIONS) {
        return $resource('/notifications/:notificationId/:action', {
            notificationId: '@notificationId',
            action: '@action'
        }, RESOURCE_ACTIONS);
    }

})();