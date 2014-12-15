(function () {
    'use strict';

    angular
        .module('app.tabs', [])
        .directive('etTabs', etTabs)
        .directive('etTab', etTab);

    function etTabs() {

        return {
            require: 'etTabs',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/et-tabs.html',
            link: etTabsLink,
            controller: etTabsController,
            controllerAs: 'vm'
        };

        function etTabsLink(scope, element, attr, ctrl){

            scope.$watch(attr.etTabs, function (config) {
                angular.extend(ctrl, config || {});
            });

        }

        function etTabsController(){

            var vm = this;

            vm.panels = [];
            vm.select = select;
            vm.classes = classes;

            this.addPane = addPane;

            function select(pane) {
                angular.forEach(vm.panels, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            function classes(pane) {
                var classes = [];
                if (pane.selected) {
                    classes.push('active');
                }
                if (vm.justify) {
                    classes.push(['col', 1, vm.panels.length].join('-'));
                }
                return classes.join(' ');
            }

            function addPane(pane) {
                if (vm.panels.length == 0) {
                    vm.select(pane);
                }
                vm.panels.push(pane);
            }

        }

    }

    etTab.$inject = ['utils'];

    function etTab(utils) {
        return {
            require: ['^etTabs', 'etTab', '?etConfig'],
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/et-tab.html',
            link: etTabLink,
            controller: angular.noop,
            controllerAs: 'vm'
        };

        function etTabLink(scope, element, attr, ctrl) {

            var tabs = ctrl[0],
                tab = ctrl[1];

            utils.merge(scope, ctrl[2], tab);

            scope.$watch(attr.etTab, function (title) {
                tab.title = title;
            });

            tabs.addPane(tab);
        }

    }

})();