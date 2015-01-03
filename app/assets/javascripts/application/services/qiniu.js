(function () {
    'use strict';

    angular
        .module('app.services')
        .service('QiniuTokens', QiniuTokens)
        .service('Resources', Resources);

    QiniuTokens.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function QiniuTokens($resource, RESOURCE_ACTIONS){
        return $resource('/qiniu_tokens', null, RESOURCE_ACTIONS);
    }

    Resources.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Resources($resource, RESOURCE_ACTIONS){
        return $resource('/resources/:action/:resourceId', {
            action: '@action',
            resourceId: '@resourceId'
        }, RESOURCE_ACTIONS);
    }

})();