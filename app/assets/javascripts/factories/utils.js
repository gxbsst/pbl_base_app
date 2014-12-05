(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('utils', utils);

    function utils() {
        return {
            findById: findById
        }
    }

    function findById(array, id){
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) return array[i];
        }
        return null;
    }

})();
