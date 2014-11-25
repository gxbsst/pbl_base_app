/*
(function () {
    'use strict';

    angular
        .module('app.scrollbar', [])
        .directive('ngScrollbar', ngScrollbar);

    function ngScrollbar(){
        */
/*
        options = [
            'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
            'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
            'scrollYMarginOffset', 'includePadding'
        ];
        *//*


        return {
            restrict: 'EA',
            transclude: true,
            template: '<div><div ng-transclude></div></div>',
            replace: true,
            link: ngScrollbarLink
        };

        function ngScrollbarLink(scope, element, attr){

            attr.ngScrollbar.$parseConfig(scope);

            element.perfectScrollbar(scope.config);

            if (attr.refreshOnChange) {
                scope.$watchCollection(attr.refreshOnChange, function() {
                    scope.$evalAsync(function() {
                        element.perfectScrollbar('update');
                    });
                });
            }

            element.bind('$destroy', function() {
                element.perfectScrollbar('destroy');
            });
        }

    }

})();*/
