(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('ago', agoFilter);

    function agoFilter() {
        return function (value) {
            if(!value){
                return '';
            }
            try{
                return moment(value).fromNow();
            }catch(e){
                return '';
            }
        }
    }

})();