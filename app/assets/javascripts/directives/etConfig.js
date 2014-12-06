(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etConfig', etConfig);

    function etConfig(){
        return {
            restrict: 'A',
            priority: 9999,
            link: etConfigLink
        };
    }

    function etConfigLink(scope, element, attr){

        attr.etConfig.parseConfig(scope);

    }

})();