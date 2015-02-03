(function () {
    'use strict';

    function Item() {
    }

    Item.prototype.add = function (url, method) {
        var result = null;
        angular.forEach(Mock._mocked, function (value) {
            if (new RegExp('^' + value.rurl.replace(/:[A-Za-z0-9-%]+/g, '[A-Za-z0-9-%]+').replace(/\//g, '\\/') + '$').test(url) && (value.rtype || 'GET') === method) {
                result = Mock.mock(value.template);
            }
        });
        return result;
    };

    angular
        .module('app.mock', [])
        .config(mock);

    mock.$inject = ['$httpProvider'];

    function mock($httpProvider){

        var item;
        item = new Item();
        return $httpProvider.interceptors.push(function () {
            return {
                request: function (config) {
                    var result;
                    result = item.add(config.url, config.method);
                    if (result) {
                        config.original = {
                            url: config.url,
                            result: result,
                            method: config.method,
                            params: config.params,
                            data: config.data
                        };
                        config.data && console.log('[request  ' + config.method + '] ' + config.url + ' => ', config.data);
                        config.method = "GET";
                        config.url = "?mockUrl=" + config.url;
                    }
                    return config;
                },
                response: function (response) {
                    var original = response.config.original;
                    if (original) {
                        response.data = original.result;
                        console.log('[response ' + original.method + '] ' + original.url + ' => ', original.result);
                    }
                    return response;
                }
            };
        });

    }

})();