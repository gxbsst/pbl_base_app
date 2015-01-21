(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('error', error);

    error.$inject = ['$filter'];

    function error($filter) {
        return function (type) {
            return $filter('i18n')('ERRORS')[type];
        }
    }

})();