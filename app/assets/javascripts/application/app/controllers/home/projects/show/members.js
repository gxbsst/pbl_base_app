(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowMembersController', ProjectShowMembersController);

    ProjectShowMembersController.$inject = ['project'];

    function ProjectShowMembersController(project) {

        var vm = this;
        vm.project = project;

    }

})();