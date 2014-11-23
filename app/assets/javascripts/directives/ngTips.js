(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngTips', ngTips)
        .directive('ngTipsSrc', ngTipsSrc);

    function ngTips(){
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'directives/ng-pane.html',
            link: ngTipsLink
        };
    }

    function ngTipsSrc(){
        return {
            restrict: 'A',
            link: ngTipsSrcLink
        };
    }

    function ngTipsLink(scope, element, attr){

        scope.$watch(attr.ngTips, ngTipsWatch);

        function ngTipsWatch(content){
            scope.ngTips = content;
        }

    }

    function ngTipsSrcLink(scope, element, attr){

        scope.$watch(attr.ngTipsSrc, ngTipsSrcWatch);

        function ngTipsSrcWatch(src) {
            scope.ngTipsSrc = src;
        }
    }

})();