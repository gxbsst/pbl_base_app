(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('addTaskController', addTaskController);

    addTaskController.$inject = ['$scope', 'Disciplines'];

    function addTaskController($scope, Disciplines) {
        var vm = this;
        $scope.task = {
            task_type: 1
        };

        $scope.modalEmit = modalEmit;

        function modalEmit() {
            $scope.$emit('setAddTask', $scope.task);
            $scope.destroyModal();
        }
    }

})();