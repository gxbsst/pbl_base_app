(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowInfoController', ProjectShowInfoController);

    ProjectShowInfoController.$inject = ['project'];

    function ProjectShowInfoController(project) {

        var vm = this;
        vm.project = project;

    }

})();