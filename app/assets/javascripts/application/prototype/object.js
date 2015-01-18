(function () {
    'use strict';

    angular
        .extend(Object, {
            keys: function (object) {
                var results = [];
                for (var key in object) {
                    if (!/^\$/.test(key)) {
                        results.push(key);
                    }
                }
                return results;
            },
            values: function (object) {
                var results = [];
                for (var key in object){
                    if (!/^\$/.test(key)) {
                        results.push(object[key]);
                    }
                }
                return results;
            }
        });

})();