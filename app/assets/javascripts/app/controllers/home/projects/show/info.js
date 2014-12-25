(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowInfoController', ProjectShowInfoController);

    ProjectShowInfoController.$inject = ['project'];

    function ProjectShowInfoController(project) {

        var vm = this;
        vm.project = project;
        vm.tab=1;
        vm.infoTab=infoTab;

        function infoTab(tab){
            vm.tab=tab;
        }
    }

})();