(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('i18n', i18n);

    i18n.$inject = ['i18nConfig'];

    function i18n(i18nConfig) {
        return function (key, params) {
            var locale = i18nConfig.locales[i18nConfig.locale],
                string = find(key, locale);

            if (!string) {
                return key;
            }

            if (params == undefined) {
                return string;
            }
            if (typeof params == 'object') {
                return string.replace(/\{(.+?)\}/gi, function () {
                    return params[arguments[1]] || '';
                });
            }
            var args = arguments;
            return string.replace(/\%([1-9]+)/gi, function () {
                return args[parseInt(arguments[1], 10)] || '';
            });
        };

        function find(key, locale) {
            key = key.replace(/\\\./gi, '\\\\\\\\');
            key = key.split('.');
            for (var i = 0, l = key.length; i < l; i++) {
                locale = locale[key[i].replace(/\\\\\\\\/gi, '\.')];
                if(!locale){
                    return null;
                }
            }
            return locale;
        }

    }

})();