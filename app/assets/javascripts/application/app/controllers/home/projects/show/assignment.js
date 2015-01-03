(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowAssignmentController', ProjectShowAssignmentController);

    ProjectShowAssignmentController.$inject = ['project'];

    function ProjectShowAssignmentController(project) {

        var vm = this;
        vm.project = project;
        vm.showTask=showTask;
        vm.showtask=[];
        console.log(vm.project);

        vm.showTask(0);

        function showTask(id){
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id]=!vm.showtask[id];
        }

    }

})();