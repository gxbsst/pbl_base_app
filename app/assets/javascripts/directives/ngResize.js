(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngResize', ngResize);

    ngResize.$inject = ['$parse', '$timeout'];

    function ngResize($parse, $timeout){
        return {
            restrict: 'AC',
            scope: true,
            compile: ngResizeCompile
        };

        function ngResizeCompile(element, attr) {
            var onResize = $parse(attr.ngResize);
            return function(scope, element, attr) {
                scope.$watchCollection(function () {
                    return [element.innerWidth(), element.innerHeight()];
                }, function (value) {
                    onResize(scope, {$event:event, width: value[0], height: value[1]});
                });
            };
        }

    }

})();