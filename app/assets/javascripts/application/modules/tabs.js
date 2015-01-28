(function () {
    'use strict';

    angular
        .module('app.tabs', [])
        .directive('etTabs', etTabs)
        .directive('etTab', etTab);

    etTabs.$inject = ['utils'];

    function etTabs(utils) {

        return {
            require: 'etTabs',
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'modules/tabs/et-tabs.html',
            link: etTabsLink,
            controller: etTabsController,
            controllerAs: 'tabsConfig'
        };

        function etTabsLink(scope, element, attr, ctrl){

            ctrl.reloadOnSelected = true;

            utils.params(scope, attr.etTabs, ctrl);

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
                pane.tabs = vm;
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
            controllerAs: 'tabConfig'
        };

        function etTabLink(scope, element, attr, ctrl) {

            var tabs = ctrl[0],
                tab = ctrl[1];

            ctrl[2] && utils.merge(scope, ctrl[2], tab);

            scope.$watch(attr.etTab, function (title) {
                tab.title = title;
            });

            scope.$watch(function () {
                return tab.selected;
            }, function (selected) {
                if(selected){
                    tabs.select(tab);
                }
            });

            tabs.addPane(tab);
        }

    }

})();