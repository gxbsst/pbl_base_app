(function() {
    'use strict';

    angular
        .module('app.core')
        .config(configure);

    configure.$inject = [ '$routeProvider'];

    function configure( $routeProvider) {

        configureRouting();

        function configureRouting() {
            /*
            var routeCfg = routeHelperConfigProvider;
            routeCfg.config.$routeProvider = $routeProvider;
            routeCfg.config.docTitle = '';
            routeCfg.config.resolveAlways = {
                ready: function() {
                }
            };
            */
        }
    }
})();