(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('icon', icon);

    icon.$inject = ['FILE_TYPES'];

    function icon(FILE_TYPES) {
        return function (name) {
            if (!name) {
                return 'pf-file-o';
            }
            for(var k in FILE_TYPES){
                if (FILE_TYPES.hasOwnProperty(k) && FILE_TYPES[k].test(name)) {
                    return 'pf-file-' + k;
                }
            }
            return 'pf-file-o';
        }
    }

})();