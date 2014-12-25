(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowResourcesController', ProjectShowResourcesController);

    ProjectShowResourcesController.$inject = ['project'];

    function ProjectShowResourcesController(project) {

        var vm = this;
        vm.project = project;

    }

})();