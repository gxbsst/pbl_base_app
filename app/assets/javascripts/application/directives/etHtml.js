(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etHtml', etHtml);

    etHtml.$inject = ['$sce'];

    function etHtml($sce){
        return {
            restrict: 'A',
            link: etHtmlLink
        };

        function etHtmlLink(scope, element, attr){
            scope.$watch(attr.etHtml, function (html) {
                element.html($sce.trustAsHtml(html));
            });
        }

    }

})();