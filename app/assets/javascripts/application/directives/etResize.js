(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etResize', etResize);

    etResize.$inject = ['$parse', '$window'];

    function etResize($parse, $window) {
        return {
            restrict: 'A',
            scope: true,
            link: etResizeLink
        };

        function etResizeLink(scope, element, attr) {

            var fn = $parse(attr.etResize),
                size = function () {
                    return {width: element.width(), height: element.height()};
                },
                callback = function (size) {
                    if (width != size.width || height != size.height) {
                        width = size.width;
                        height = size.height;
                        fn(scope, {$width: size.width, $height: size.height});
                    }
                },
                width, height;

            scope.$watch(size, callback, true);

            angular.element($window).on('resize', function () {
                scope.$apply(function () {
                    callback(size());
                });
            });

        }
    }

})();