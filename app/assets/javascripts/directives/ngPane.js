(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngPane', ngPane);

    function ngPane(){
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'directives/ng-pane.html',
            link: ngPaneLink
        };
    }

    function ngPaneLink(scope, element, attr){

        scope.config = scope.config || {};
        scope.status = true;
        scope.toggle = toggle;

        scope.$watch(attr.ngPane, ngPaneWatch);

        function ngPaneWatch(title){
            scope.config.title = title;
        }

        function toggle(o){
            scope.status = typeof o != 'undefined' ? o : !scope.status;
        }

    }

})();