(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etHover', etHover);

    function etHover() {
        return {
            restrict: 'A',
            link: etHoverLink
        };
    }

    function etHoverLink(scope, element, attr) {

        element
            .on('mouseenter', function () {
                element.addClass(attr.etHover || 'hover');
            })
            .on('mouseleave', function () {
                element.removeClass(attr.etHover || 'hover');
            });

    }

})();