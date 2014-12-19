(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etPanel', etPanel);

    etPanel.$inject = ['utils'];

    function etPanel(utils){
        return {
            require: ['etPanel', '?etConfig'],
            restrict: 'A',
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: 'directives/et-panel.html',
            link: etPanelLink,
            controller: angular.noop,
            controllerAs: 'panelConfig'
        };

        function etPanelLink(scope, element, attr, ctrl){

            var vm = ctrl[0];

            ctrl[1] && utils.merge(scope, ctrl[1], vm);

            vm.status = true;
            vm.toggle = toggle;

            scope.$watch(attr.etPanel, function (title) {
                vm.title = title;
            });

            function toggle(o){
                vm.status = typeof o != 'undefined' ? o : !vm.status;
            }

        }
    }

})();