(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomePBLIndexController', HomePBLIndexController)
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController);

    HomePBLIndexController.$inject = ['$scope'];

    function HomePBLIndexController($scope) {
        var vm = this;
    }

    PBLMapController.$inject = ['$scope'];

    function PBLMapController($scope) {
        var vm = this;
    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

})();
