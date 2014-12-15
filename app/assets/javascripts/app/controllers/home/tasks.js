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
            'id':'',
            'title':'',
            'description':'',
            'site': '',
            'teacher_tools': '',
            'student_tools': '',
            'tasktype':'1',
            'test':{
                'discipline':{
                    'id': '',
                    'title': ''
                }
            },
            'evaluation':{
                'duration':{
                    'time_span': '',
                    'cycle': {
                        'id': '',
                        'title': ''
                    }
                },
                'results':{
                    'id':'',
                    'title': '',
                    'worksform':{
                        'id':'',
                        'title': ''
                    },
                    'example': ['']
                },
                'gauge':{}
            },
            'event':{
                'duration':{
                    'time_span': '',
                    'cycle': {
                        'id': '',
                        'title': ''
                    }
                }
            },
            'resources':[]
        };

        vm.disciplines=[];
        Disciplines.all(function(data){
            vm.disciplines=data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });
        vm.cycles=[];
        //周期未使用异步调用
        vm.cycles=Cycles.all();

        $scope.modalEmit = modalEmit;

        function modalEmit() {
            $scope.$emit('setAddTask', $scope.task);
            $scope.destroyModal();
        }
    }

})();