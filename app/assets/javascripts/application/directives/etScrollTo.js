(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etScrollTo', etScrollTo);

    etScrollTo.$inject = ['$parse'];

    function etScrollTo($parse) {
        return {
            restrict: 'A',
            link: etScrollToLink
        };

        function etScrollToLink(scope, element, attr) {

            var fn = $parse(attr.etScrollTo);

            scope.$watch(function () {
                return fn(scope);
            }, function (value) {
                if(value){
                    var offset = element.offset();
                    angular.element('body').animate({scrollTop: offset.top + parseInt(attr.etScrollOffset || 0, 10)}, 0);
                }
            });

        }
    }

})();