(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('addTaskController', addTaskController)
    ;

    addTaskController.$inject = ['$scope','Disciplines','Cycles'];

    function addTaskController($scope,Disciplines,Cycles) {
        var vm = this;
        $scope.task={
            'tasktype':'1'
        };

        vm.disciplines=[];
        Disciplines.all(function(data){
            vm.disciplines=data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });
        vm.cycles=[];
        //周期未使用异步调用
        vm.cycles=Cycles;

        vm.project=$scope.$config.project;
        $scope.modalEmit = modalEmit;

        function modalEmit() {
            $scope.$emit('setAddTask', $scope.task);
            $scope.destroyModal();
        }
    }

})();