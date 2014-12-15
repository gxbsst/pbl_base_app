(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateReleaseController', HomeProjectCreateReleaseController);

    HomeProjectCreateReleaseController.$inject = ['$scope','$state', 'Projects', 'project','Cycles'];

    function HomeProjectCreateReleaseController($scope,$state, Projects, project,Cycles){
        var vm = this;
        vm.project = project;
        console.log(vm.project);
    }

})();