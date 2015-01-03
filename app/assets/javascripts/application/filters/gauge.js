(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('gauge', gauge);

    gauge.$inject = ['$filter'];

    function gauge($filter) {
        return function (level, type) {
            return $filter('i18n')('GAUGE_HEAD')[type || 0][level];
        }
    }

})();