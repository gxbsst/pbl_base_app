(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowResourcesController', ProjectShowResourcesController);

    ProjectShowResourcesController.$inject = ['Resources', 'project'];

    function ProjectShowResourcesController(Resources, project) {

        var vm = this;
        vm.project = project;

    }

})();