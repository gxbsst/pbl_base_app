(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etObserver', etObserver);

    etObserver.$inject = ['$parse', '$timeout', 'utils'];

    function etObserver($parse, $timeout, utils) {
        return {
            require: 'etObserver',
            restrict: 'A',
            scope: true,
            link: etObserverLink,
            controller: angular.noop,
            controllerAs: 'observerConfig'
        };

        function etObserverLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                childList: true,
                characterData: true,
                subtree: true
            });

            utils.params(scope, attr.etObserver, ctrl);

            var fn = $parse(attr.etObserver),
                callback = function () {
                    fn(scope);
                },
                observer = new MutationObserver(callback);
            observer.observe(element[0], ctrl);
            scope.$on('$destroy', function () {
                observer.disconnect();
            });

            $timeout(callback);
        }

    }

})();