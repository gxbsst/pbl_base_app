(function () {
    'use strict';

    angular
        .module('app.cookie', [])
        .factory('cookie', cookie);

    function stringify(value) {
        try {
            return JSON.stringify(value);
        } catch (e) {
            return value;
        }
    }

    function parse(value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    function cookie() {
        return function (key, value, options) {

            if (value !== undefined) {
                options = angular.extend({
                    path: '/',
                    expires: null,
                    domain: null,
                    secure: false
                }, options || {});

                var values = [encodeURIComponent(key) + '=' + stringify(value)];

                if(options.path){
                    values.push('path=' + options.path);
                }

                if (options.expires && typeof options.expires == 'number') {
                    var days = options.expires,
                        expires = new Date();
                    expires.setDate(expires.getDate() + days);
                    values.push('expires=' + expires.toUTCString());
                }

                if(options.domain){
                    values.push('domain=' + options.domain);
                }

                if(options.secure){
                    values.push('secure');
                }
                document.cookie = values.join('; ');
                return value;
            }

            var cookies = {};

            angular.forEach((document.cookie || '').split('; '), function (cookie) {
                cookie = cookie.split('=');
                cookies[cookie[0]] = parse(cookie[1]);
            });

            if(key){
                return cookies[key];
            }

            return cookies;
        }
    }

})();