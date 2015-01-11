(function () {
    'use strict';

    moment.fn.timezoneOffset = function (zone) {
        var diff = this.utcOffset('-08:00');
        return this.clone().add(diff, 'minutes');
    };

    moment.defineLocale('zh-cn', {
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY-MM-DD',
            LLL: 'YYYY-MM-DD LT',
            LLLL: 'YYYY年MMMD日ddddLT',
            l: 'YYYY-MM-DD',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日LT',
            llll: 'YYYY年MMMD日ddddLT'
        }
    });

    moment.locale('zh-cn');

})();