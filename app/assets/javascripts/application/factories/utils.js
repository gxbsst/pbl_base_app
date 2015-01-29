(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('utils', utils);

    function utils() {
        return {
            findById: findById,
            params: params,
            merge: merge,
            random: random
        }
    }

    function findById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) return array[i];
        }
        return null;
    }

    function params(scope, attr, object, defaultKey) {
        angular.forEach(attr.split(';'), function (config) {
            if (config) {
                config = config.split('=');
                var value = config[1] || config[0];
                scope.$watch(value, function (v) {
                    var key = config[1] ? config[0] : defaultKey;
                    if (/^\$/.test(key)) {
                        scope[key.substr(1)] = v;
                    } else if (/^@/.test(key)) {
                        scope[key.substr(1)] = angular.copy(v);
                    } else {
                        object[key] = v;
                    }
                });
            }
        });
    }

    function merge(scope, a, b) {
        scope.$watch(function () {
            return a;
        }, function (newValue) {
            angular.extend(b, newValue || {});
        }, true);
    }

    function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

})();
