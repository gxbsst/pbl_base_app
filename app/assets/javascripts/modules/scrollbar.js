(function () {
    'use strict';

    angular
        .module('app.scrollbar', [])
        .directive('ngScrollbar', ngScrollbar);

    ngScrollbar.$inject = ['$timeout'];

    function ngScrollbar($timeout) {

        return {
            restrict: 'A',
            scope: true,
            link: ngScrollbarLink
        };

        function ngScrollbarLink(scope, element, attr) {

            $timeout(function () {
                element
                    .scrollbar(angular.extend({
                        disableBodyScroll: true
                    }, scope.$config))
                    .on('$destroy', function () {
                        element.scrollbar('destroy');
                    });
            });

        }

    }

})();