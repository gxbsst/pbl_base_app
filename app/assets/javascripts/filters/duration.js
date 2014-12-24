(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('unit', unit);

    unit.$inject = ['DURATION_UNITS'];

    function unit(DURATION_UNITS) {
        return function (id) {
            var unit = DURATION_UNITS.findOne(function (item) {
                return item.id == id;
            });
            if (unit) {
                return unit.title;
            }
            return '';
        };
    }
})();