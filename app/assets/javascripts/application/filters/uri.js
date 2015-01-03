(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('uri', uri);

    uri.$inject = ['PATHS'];

    function uri(PATHS) {
        return function (resource, path) {
            if(!resource){
                return '';
            }
            return [
                [path || PATHS.static, resource.key].join('/'),
                ['attname', encodeURIComponent(resource.name)].join('=')
            ].join('?');
        };
    }
})();