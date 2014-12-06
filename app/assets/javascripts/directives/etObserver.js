(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etObserver', etObserver);

    etObserver.$inject = ['$parse', '$timeout'];

    function etObserver($parse, $timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: etObserverLink
        };

        function etObserverLink(scope, element, attr) {

            scope.$config = angular.extend({
                childList: true,
                characterData: true,
                subtree: true
            }, scope.$config || {});

            var fn = $parse(attr.etObserver),
                callback = function () {
                    fn(scope);
                },
                observer = new MutationObserver(callback);
            observer.observe(element[0], scope.$config);
            scope.$on('$destroy', function () {
                observer.disconnect();
            });

            $timeout(callback);
        }

    }

})();