(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowAssignmentController', ProjectShowAssignmentController);

    ProjectShowAssignmentController.$inject = ['project'];

    function ProjectShowAssignmentController(project) {

        var vm = this;
        vm.project = project;

    }

})();