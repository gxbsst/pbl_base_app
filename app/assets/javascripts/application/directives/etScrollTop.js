(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etScrollTop', etScrollTop);

    etScrollTop.$inject = ['$parse'];

    function etScrollTop($parse) {
        return {
            restrict: 'A',
            link: etScrollTopLink
        };

        function etScrollTopLink(scope, element, attr) {

            var fn = $parse(attr.etScrollTop);

            scope.$watch(function () {
                return fn(scope);
            }, function (value) {
                if(value){
                    element.animate({scrollTop: 0}, 0);
                }
            });

        }
    }

})();