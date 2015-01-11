(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('sliceTo', sliceTo);

    function sliceTo() {
        return function (array, start, end) {
            start = start || 0;
            if (!array || !array.length) {
                return [];
            }
            array = angular.copy(array);
            return array.slice(start, end);
        }

    }

})();