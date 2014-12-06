(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etPanel', etPanel);

    function etPanel(){
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'directives/et-panel.html',
            link: etPanelLink
        };
    }

    function etPanelLink(scope, element, attr){

        scope.$config = scope.$config || {};
        scope.status = true;
        scope.toggle = toggle;

        scope.$watch(attr.etPanel, etPanelWatch);

        function etPanelWatch(title){
            scope.$config.title = title;
        }

        function toggle(o){
            scope.status = typeof o != 'undefined' ? o : !scope.status;
        }

    }

})();