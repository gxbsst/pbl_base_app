(function () {
    'use strict';

    angular
        .module('app.scrollbar', [])
        .directive('etScrollbar', etScrollbar);

    etScrollbar.$inject = ['$timeout'];

    function etScrollbar($timeout) {

        return {
            restrict: 'A',
            scope: true,
            link: etScrollbarLink
        };

        function etScrollbarLink(scope, element, attr) {

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