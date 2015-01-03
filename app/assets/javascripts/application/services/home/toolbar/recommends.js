(function () {
    'use strict';

    angular
        .module('app.services')
        .service('toolbarRecommends', toolbarRecommends)
    ;

    toolbarRecommends.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function toolbarRecommends($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();