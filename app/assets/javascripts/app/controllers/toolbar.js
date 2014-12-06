(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeToolbarController', HomeToolbarController);

    HomeToolbarController.$inject = ['$rootScope', 'TOOLBARS'];

    function HomeToolbarController($rootScope, TOOLBARS) {

        var vm = this;

        vm.toolbar = TOOLBARS;
        vm.current = null;
        $rootScope.setCurrentTool = setCurrentTool;

        function setCurrentTool(current, $event) {
            $event && $event.stopPropagation();
            if (current) {
                if (vm.current && vm.current.src != current.src) {
                    delete vm.current.active;
                }
                current.active = !current.active;
                vm.current = current;
            }else{
                vm.current && delete vm.current.active;
            }
        }

    }

})();