(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etHref', etHref);

    function etHref(){
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.on('click', function () {
                    window.open(scope.$eval(attr.etHref));
                });
            }
        }
    }

})();