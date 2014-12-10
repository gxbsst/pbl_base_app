(function () {
    'use strict';

    angular
        .module('app.services')
        .service('QiniuTokens', QiniuTokens);

    QiniuTokens.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function QiniuTokens($resource, RESOURCE_ACTIONS){
        return $resource('/qiniu_tokens', null, RESOURCE_ACTIONS);
    }

})();