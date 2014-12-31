(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowScaffoldController', ProjectShowScaffoldController);

    ProjectShowScaffoldController.$inject = ['$scope', '$state', 'Projects', 'project', 'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts'];

    function ProjectShowScaffoldController($scope, $state, Projects, project, Disciplines, Knowledge, Tasks, ProjectProducts) {

        var vm = this;
        vm.project = project;
        vm.showTask=showTask;
        vm.showtask=[];
        console.log(vm.project);
        vm.disciplines = [];
        Disciplines.all(function (data) {
            vm.disciplines = data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });

        vm.chooseType = chooseType;

        vm.showTask(0);
        function showTask(id){
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id]=!vm.showtask[id];
        }

        function chooseType(task, typeval, disabled) {
            task.task_type = typeval;
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'task_type': typeval}});
            }
        }

    }

})();