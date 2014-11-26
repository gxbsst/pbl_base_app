(function () {
    'use strict';

    angular
        .module('app.tabs', [])
        .directive('ngTabs', ngTabs)
        .directive('ngTab', ngTab);

    function ngTabs() {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/ng-tabs.html',
            link: ngTabsLink,
            controller: ngTabsController
        };

    }

    function ngTab() {
        return {
            require: '^ngTabs',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/ng-tab.html',
            link: ngTabLink
        };

    }

    function ngTabsLink(scope, element, attr){

        attr.ngTabs.$parseConfig(scope);

    }

    ngTabsController.$inject = ['$scope'];

    function ngTabsController($scope){

        $scope.panes = [];
        $scope.select = select;
        $scope.classes = classes;

        this.addPane = addPane;

        function select(pane) {
            angular.forEach($scope.panes, function (pane) {
                pane.selected = false;
            });
            pane.selected = true;
        }

        function classes(pane) {
            var classes = [];
            if (pane.selected) {
                classes.push('active');
            }
            if ($scope.$config.justify) {
                classes.push(['col', 1, $scope.panes.length].join('-'));
            }
            return classes.join(' ');
        }

        function addPane(pane) {
            if ($scope.panes.length == 0) {
                $scope.select(pane);
            }
            $scope.panes.push(pane);
        }

    }

    function ngTabLink(scope, element, attr, tabs) {

        scope.$config = scope.$config || {};

        scope.$watch(attr.ngTab, ngTabWatch);

        function ngTabWatch(title){
            scope.$config.title = title;
        }

        tabs.addPane(scope);
    }

})();