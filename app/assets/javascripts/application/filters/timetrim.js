(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('timeTrim', timeTrim);

    //timeTrim.$inject = [''];

    function timeTrim() {
        return function(input) {
            var arr = input.split("-");
            var starttime = new Date(arr[0], arr[1], arr[2]);

            var lktime = new Date();

            var days = lktime.getTime() -starttime.getTime();
            var time = parseInt(days / (1000 * 60 * 60 * 24));
            return time;
        };
    }
})();
