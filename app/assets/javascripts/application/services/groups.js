(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Groups', Groups)
        .service('MemberShips', MemberShips);

    Groups.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Groups($resource, RESOURCE_ACTIONS) {
        return $resource('/:namespace/groups/:groupId/:action/:actionId', {
            namespace: '@namespace',
            groupId: '@groupId',
            action: '@action',
            actionId: '@actionId',
            include: 'member_ships',
            limit: 100
        }, RESOURCE_ACTIONS);
    }

    MemberShips.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function MemberShips($resource, RESOURCE_ACTIONS) {
        return $resource('/:namespace/member_ships/:member_shipId/:action/:actionId', {
            namespace: '@namespace',
            member_shipId: '@member_shipId',
            action: '@action',
            actionId: '@actionId',
            include: 'groups'
        }, RESOURCE_ACTIONS);
    }

})();