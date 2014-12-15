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

    function params(scope, string, object) {
        angular.forEach(string.split(';'), function (config) {
            config = config.split('=');
            scope.$watch(config[1], function (value) {
                object[config[0]] = value;
            });
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
