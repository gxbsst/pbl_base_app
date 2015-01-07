(function () {
    'use strict';

    angular
        .extend(Number.prototype, {
            toDate: function () {
                var date = new Date();
                date.setTime(this);
                return date;
            }
        });

})();