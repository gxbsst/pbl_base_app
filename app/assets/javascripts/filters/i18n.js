(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('i18n', i18n);

    i18n.$inject = ['i18nConfig'];

    function i18n(i18nConfig) {
        return function (key, params) {
            var locale = i18nConfig.locales[i18nConfig.locale],
                string = locale[key];
            if (!params) {
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
    }

})();