(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateReleaseController', HomeProjectCreateReleaseController);

    HomeProjectCreateReleaseController.$inject = ['$scope','$state', 'Projects', 'project','Cycles'];

    function HomeProjectCreateReleaseController($scope,$state, Projects, project,Cycles){
        var vm = this;
        vm.project = project;
        if(vm.project.duration_unit>0 && vm.project.duration){
            vm.duration=vm.project.duration+Cycles[(parseInt(vm.project.duration_unit)-1)].title;
        }
        console.log(vm.project);
    }

})();