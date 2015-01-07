(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Works', Works);


    Works.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Works($resource, RESOURCE_ACTIONS) {
        return $resource('/assignment/works/:workId/:action', {workId: '@workId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();