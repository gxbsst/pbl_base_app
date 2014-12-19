(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('utils', utils);

    function utils() {
        return {
            findById: findById,
            params: params,
            merge: merge
        }
    }

    function findById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) return array[i];
        }
        return null;
    }

    function params(scope, string, object, defaultKey) {
        angular.forEach(string.split(';'), function (config) {
            if(config){
                config = config.split('=');
                var value = config[1] || config[0];
                scope.$watch(value, function (v) {
                    var key = config[1] ? config[0] : defaultKey;
                    if (/^\$/.test(key)) {
                        scope[key.substr(1)] = v;
                    } else {
                        object[key] = v;
                    }
                });
            }
        });
    }

    function merge(scope, params, object) {
        scope.$watch(function () {
            return params;
        }, function (config) {
            angular.extend(object, config || {});
        }, true);
    }

})();
