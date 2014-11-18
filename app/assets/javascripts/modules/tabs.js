(function () {
    'use strict';

    angular
        .module('modules.tabs', [])
        .directive('ngTabs', ngTabs)
        .directive('ngTab', ngTab);

    function ngTabs() {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/angular-tabs/ng-tabs.html',
            link: function (scope, element, attr) {
                scope.options = angular.extend({
                    justify: false
                }, scope.$eval(attr.ngTabs || '{}'));
            },
            controller: function ($scope) {
                var panes = $scope.panes = [];
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

    function ngTab() {
        return {
            require: '^ngTabs',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/angular-tabs/ng-tab.html',
            link: function (scope, element, attrs, tabsController) {
                var def = {
                        title: 'title',
                        src: null
                    },
                    options = scope.$eval(attrs.ngTab);
                if (typeof options == 'string') {
                    options = {title: options};
                }
                scope.options = angular.extend(def, options);
                tabsController.addPane(scope);
            }
        };
    }

})();