(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('$template', $template);

    $template.$inject = ['$http', '$q', '$templateCache'];

    function $template($http, $q, $templateCache) {

        return function (config) {

            var defer = $q.defer();

            if (config.template) {
                defer.resolve(config.template);
            } else if (config.templateUrl) {
                var cache = $templateCache.get(config.templateUrl);
                if (cache) {
                    defer.resolve(cache);
                } else {
                    $http({
                        method: 'GET',
                        url: config.templateUrl,
                        cache: true
                    }).then(function (result) {
                        defer.resolve(result.data);
                    }, function (error) {
                        defer.reject(error);
                    });
                }
            } else {
                defer.reject('No template or templateUrl has been specified.');
            }

            return defer.promise;
        };

    }
})();
