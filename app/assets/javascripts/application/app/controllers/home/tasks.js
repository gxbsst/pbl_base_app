(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('addTaskController', addTaskController);

    addTaskController.$inject = ['$scope', 'Disciplines','TYPE_DEFIN'];

    function addTaskController($scope, Disciplines,TYPE_DEFIN) {
        var vm = this;
        $scope.task = {
            task_type: TYPE_DEFIN.Discipline
        };
        $scope.addTask=true;
        $scope.modalEmit = modalEmit;

        function modalEmit() {
            $scope.$emit('setAddTask', $scope.task);
            $scope.destroyModal();
        }
    }

})();