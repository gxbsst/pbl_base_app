(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('isEmpty', isEmpty);

    function isEmpty() {
        return function (object) {
            if(!object){
                return true;
            }
            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    return false;
                }
            }
            return true;
        }
    }

})();