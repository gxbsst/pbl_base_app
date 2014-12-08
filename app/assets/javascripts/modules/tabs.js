(function () {
    'use strict';

    angular
        .module('app.tabs', [])
        .directive('etTabs', etTabs)
        .directive('etTab', etTab);

    function etTabs() {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/et-tabs.html',
            link: etTabsLink,
            controller: etTabsController
        };

    }

    function etTab() {
        return {
            require: '^etTabs',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/et-tab.html',
            link: etTabLink
        };

    }

    function etTabsLink(scope, element, attr){

        attr.etTabs.parseConfig(scope);

    }

    etTabsController.$inject = ['$scope'];

    function etTabsController($scope){

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

    function etTabLink(scope, element, attr, tabs) {

        scope.$config = scope.$config || {};

        scope.$watch(attr.etTab, etTabWatch);

        function etTabWatch(title){
            scope.$config.title = title;
        }

        tabs.addPane(scope);
    }

})();