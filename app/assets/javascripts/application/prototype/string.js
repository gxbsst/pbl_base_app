(function () {
    'use strict';

    angular
        .extend(String.prototype, {
            parseConfig: function (scope) {

                scope.$config = {};
                angular.forEach(this.split(';'), function (config) {
                    config = config.split('=');
                    scope.$watch(config[1], function (value) {
                        scope.$config[config[0]] = value;
                    });
                });
                return scope.$config;

            },
            parse: function () {
                var string = this,
                    params = arguments;
                if (typeof params[0] == 'object') {
                    return string.replace(/\{(.+?)\}/gi, function () {
                        return params[0][arguments[1]] || '';
                    });
                }
                return string.replace(/\%([1-9]+)/gi, function () {
                    return params[parseInt(arguments[1], 10) - 1] || '';
                });
            },
            serialize: function () {
                var string = '';
                angular.forEach(this.split('.'), function (key, i) {
                    string += i ? '[' + key + ']' : key;
                });
                return string;
            },
            trim: function () {
                return this.replace(/(^\s*)|(\s*$)/g,'');
            }
        });

})();