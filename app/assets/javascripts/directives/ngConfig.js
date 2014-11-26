(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngConfig', ngConfig);

    function ngConfig(){
        return {
            restrict: 'A',
            scope: true,
            priority: 9999,
            link: ngConfigLink
        };
    }

    function ngConfigLink(scope, element, attr){

        attr.ngConfig.$parseConfig(scope);

    }

})();