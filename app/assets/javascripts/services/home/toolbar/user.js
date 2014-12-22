(function () {
    'use strict';

    angular
        .module('app.services')
        .service('toolbarUser', toolbarUser)
    ;

    toolbarUser.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function toolbarUser($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();