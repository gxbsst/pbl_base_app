(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngGrid', ngGrid);

    function ngGrid(){
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'directives/ng-grid.html',
            link: function (scope, element, attr) {
                scope.options = angular.extend({
                    columns: [],
                    rows: []
                }, scope.$eval(attr.ngGrid || '{}'));
            },
            controller: function ($scope) {
                var panes = $scope.panels = [];
                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };
                $scope.classes = function (pane) {
                    var classes = [];
                    if (pane.selected) {
                        classes.push('active');
                    }
                    if ($scope.options.justify) {
                        classes.push(['col', 1, panes.length].join('-'));
                    }
                    return classes.join(' ');
                };
                this.addPane = function (pane) {
                    if (panes.length == 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                }
            }
        }
    }

})();