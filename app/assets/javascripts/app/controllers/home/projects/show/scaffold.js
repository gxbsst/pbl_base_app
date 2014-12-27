(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowScaffoldController', ProjectShowScaffoldController);

    ProjectShowScaffoldController.$inject = ['project'];

    function ProjectShowScaffoldController(project) {

        var vm = this;
        vm.project = project;
        vm.showTask=showTask;
        vm.showtask=[];

        function showTask(id){
            //for (var i=0;i<vm.project.tasks.length;i++){
            //    vm.showtask[i]=false;
            //}
            vm.showtask[id]=!vm.showtask[id];
        }

    }

})();