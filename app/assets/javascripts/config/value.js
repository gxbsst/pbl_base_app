(function () {
    'use strict';

    angular
        .module('app.config')
        .value({
            RESOURCE_ACTIONS: {
                all: {method: 'GET'},
                add: {method: 'POST'},
                update: {method: 'PUT'},
                remove: {method: 'DELETE'}
            },
            PATHS: {
                image: 'http://img.edutec.com/'
            }
        })
})();