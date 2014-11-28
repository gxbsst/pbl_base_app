(function () {
    'use strict';

    angular
        .extend(Date.prototype, {

            now: function (toTimestamp) {

                if(toTimestamp){
                    return new Date().getTime();
                }
                return new Date();
            }

        });

})();