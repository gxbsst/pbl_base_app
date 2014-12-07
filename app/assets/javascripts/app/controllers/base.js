(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$document'];

    function BaseController($scope, $document) {

        $document.on('click', function () {
            $scope.$apply(function () {
                $scope.setCurrentTool();
            });
        });

    }

})();