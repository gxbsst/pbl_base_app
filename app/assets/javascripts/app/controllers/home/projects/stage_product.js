(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('StageProductController', StageProductController);

    StageProductController.$inject = ['$scope'];

    function StageProductController($scope) {

        console.log($scope.$config.project)

    }

})();