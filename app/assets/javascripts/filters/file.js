(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('file', file);

    file.$inject = ['PATHS'];

    function file(PATHS) {
        return function (key, name) {
            if (!key) {
                return '';
            }
            return [[PATHS.static, key].join('/'), ['attname', encodeURIComponent(name) || key].join('=')].join('?');
        }
    }

})();