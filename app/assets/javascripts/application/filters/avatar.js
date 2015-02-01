(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('avatar', avatar);

    avatar.$inject = ['$filter', 'DEFAULTS'];

    function avatar($filter, DEFAULTS) {
        return function(user, params){
            if(!user){
                return '';
            }
            return $filter('thumb')(user.avatar || DEFAULTS.avatars.user, params || '60x60');
        }

    }

})();