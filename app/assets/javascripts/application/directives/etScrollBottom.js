(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etScrollBottom', etScrollBottom);

    etScrollBottom.$inject = ['$parse'];

    function etScrollBottom($parse) {
        return {
            restrict: 'A',
            link: etScrollBottomLink
        };

        function etScrollBottomLink(scope, element, attr) {

            var fn = $parse(attr.etScrollBottom);

            scope.$watch(function () {
                return fn(scope);
            }, function (value) {
                if(value){
                    element.animate({scrollTop: 999999}, 0);
                }
            });

        }
    }

})();