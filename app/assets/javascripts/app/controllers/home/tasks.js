(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('addTaskController', addTaskController)
    ;

    addTaskController.$inject = ['$scope','Disciplines','Cycles'];

    function addTaskController($scope,Disciplines,Cycles) {
        var vm = this;
        $scope.disabled=true;
        $scope.task={
            'task_type':'1'
        };

        $scope.modalEmit = modalEmit;

        function modalEmit() {
            $scope.$emit('setAddTask', $scope.task);
            $scope.destroyModal();
        }
    }

})();