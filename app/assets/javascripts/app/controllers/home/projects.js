(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomePBLIndexController', HomePBLIndexController)
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController);

    HomePBLIndexController.$inject = ['$scope','$http'];

    function HomePBLIndexController($scope,$http) {
        var vm = this;
        $http.get('/pbls/1')
            .success(function(){
            });
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
