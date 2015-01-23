(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Schools', Schools)
        .service('Students', Students)
        .service('Clazzs', Clazzs);

    Schools.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Schools($resource, RESOURCE_ACTIONS) {
        return $resource('/schools/:schoolId/:action', {schoolId: '@schoolId', action: '@action'}, RESOURCE_ACTIONS);
    }

    Students.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Students($resource, RESOURCE_ACTIONS) {
        return $resource('/students/:studentId/:action', {
            studentId: '@studentId',
            action: '@action',
            include: 'clazzs'
        }, RESOURCE_ACTIONS);
    }

    Clazzs.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Clazzs($resource, RESOURCE_ACTIONS) {
        return $resource('/clazzs/:clazzId/:action', {clazzId: '@clazzId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();