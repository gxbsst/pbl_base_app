(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('range', range);

    function range() {
        return function (array, min, max) {
            if (!max) {
                max = min;
                min = 0;
            }
            for (var i = min; i <= max; i++)
                array.push(i);
            return array;
        }
    }

})();