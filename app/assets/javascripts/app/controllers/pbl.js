(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLController', PBLController);

    PBLController.$inject = ['$scope'];

    function PBLController($scope) {
        var vm = this;
    }

})();
