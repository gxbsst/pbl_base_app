(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('name', name);

    function name() {
        return function(user){
            if(user){
                return user.realname || user.nickname || user.username;
            }
            return '';
        }
    }

})();