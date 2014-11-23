(function () {
    'use strict';

    angular
        .module('app.config')
        .config(configure);

    configure.$inject = ['$httpProvider'];

    function configure($httpProvider) {

        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content');

    }
})();