/**
 * Created by xi.chen on 2014/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app.services')
        .service('articleNews', articleNews);

    articleNews.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function articleNews($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();