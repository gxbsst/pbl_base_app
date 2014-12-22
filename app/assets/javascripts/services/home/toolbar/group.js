(function () {
    'use strict';

    angular
        .module('app.services')
        .service('toolbarGroup', toolbarGroup)
    ;

    toolbarGroup.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function toolbarGroup($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();