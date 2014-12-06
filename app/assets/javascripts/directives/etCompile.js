(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etCompile', etCompile);

    etCompile.$inject = ['$sce'];

    function etCompile($sce){
        return {
            restrict: 'A',
            link: etCompileLink
        };

        function etCompileLink(scope, element, attr){
            scope.$watch(attr.etHtml, function (html) {
                element.html($sce.trustAsHtml(html));
            });
        }

    }

})();