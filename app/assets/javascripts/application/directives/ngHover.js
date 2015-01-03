(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngHover', ngHover);

    function ngHover() {
        return {
            restrict: 'A',
            link: ngHoverLink
        };
    }

    function ngHoverLink(scope, element, attr) {

        element
            .on('mouseenter', function () {
                element.addClass(attr.ngHover);
            })
            .on('mouseleave', function () {
                element.removeClass(attr.ngHover);
            });

    }

})();