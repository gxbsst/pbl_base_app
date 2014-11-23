(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngConfig', ngConfig);

    function ngConfig(){
        return {
            restrict: 'A',
            link: ngConfigLink
        };
    }

    function ngConfigLink(scope, element, attr){

        attr.ngConfig.$parseConfig(scope);

    }

})();