(function () {
    'use strict';

    angular
        .module('app.services')
        .service('toolbarHistories', toolbarHistories)
    ;

    toolbarHistories.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function toolbarHistories($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();