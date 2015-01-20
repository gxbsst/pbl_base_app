(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Schools', Schools)
        .service('Clazzs', Clazzs);

    Schools.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Schools($resource, RESOURCE_ACTIONS) {
        return $resource('/schools/:action/:schoolId', {schoolId: '@schoolId', action: '@action'}, RESOURCE_ACTIONS);
    }

    Clazzs.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Clazzs($resource, RESOURCE_ACTIONS) {
        return $resource('/clazzs/:action/:clazzId', {clazzId: '@clazzId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();