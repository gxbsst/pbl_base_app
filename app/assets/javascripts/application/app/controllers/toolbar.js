(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeToolbarController', HomeToolbarController);

    HomeToolbarController.$inject = ['$scope', 'TOOLBARS'];

    function HomeToolbarController($scope, TOOLBARS) {

        var vm = this;

        vm.toolbar = TOOLBARS;
        vm.current = null;
        vm.setCurrentTool = setCurrentTool;

        $scope.$on('onDocumentClick', function () {
            setCurrentTool();
        });

        function setCurrentTool(current) {
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