(function () {
    'use strict';

    angular
        .extend(Object, {
            removeAll: function (object, keys) {
                angular.forEach(keys.split(' '), function (key) {
                    key = key.trim();
                    if(key){
                        delete object[key];
                    }
                });
                return object;
            }
        });

})();