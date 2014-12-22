/**
 * Created by xi.chen on 2014/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app.services')
        .service('articleNews', articleNews)
        .service('articleMoocs', articleMoocs)
        .service('articlePbls', articlePbls)
    ;

    articleNews.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function articleNews($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }


    articleMoocs.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function articleMoocs($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

    articlePbls.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function articlePbls($resource, RESOURCE_ACTIONS) {
        return $resource('/articles/news', {}, RESOURCE_ACTIONS);
    }

})();