(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowScaffoldController', ProjectShowScaffoldController);

    ProjectShowScaffoldController.$inject = ['project'];

    function ProjectShowScaffoldController(project) {

        var vm = this;
        vm.project = project;

    }

})();