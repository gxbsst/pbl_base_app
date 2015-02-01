(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etFocusOn', etFocusOn);

    etFocusOn.$inject = ['$parse'];

    function etFocusOn($parse) {
        return {
            restrict: 'A',
            link: etFocusOnLink
        };

        function etFocusOnLink(scope, element, attr) {

            var fn = $parse(attr.etFocusOn);

            scope.$watch(function () {
                return fn(scope);
            }, function (value) {
                if(value){
                    element.focus();
                }
            });

        }
    }

})();