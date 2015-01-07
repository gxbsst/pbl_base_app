(function () {
    'use strict';

    angular
        .extend(Date.prototype, {
            format: function (str) {
                str = str || 'yyyy-MM-dd';
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "H+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds(),
                    "w": this.getDay()
                };
                if (/(y+)/.test(str))str = str.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o) {
                    if (o.hasOwnProperty(k)) {
                        if (new RegExp("(" + k + ")").test(str)) {
                            str = str.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                        }
                    }
                }
                return str;
            }
        });

})();