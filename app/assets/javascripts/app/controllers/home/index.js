(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeIndexController', HomeIndexController);

    HomeIndexController.$inject = ['$scope'];

    function HomeIndexController($scope) {

        $scope.onBegin = onBegin;
        $scope.onProgress = onProgress;
        $scope.onSuccess = onSuccess;
        $scope.onCompleted = onCompleted;
        $scope.onError = onError;

        function onBegin(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

        function onProgress(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

        function onSuccess(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

        function onCompleted(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

        function onError(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

    }

})();