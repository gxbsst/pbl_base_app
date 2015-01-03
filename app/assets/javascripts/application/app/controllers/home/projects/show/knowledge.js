(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowKnowledgeController', ProjectShowKnowledgeController);

    ProjectShowKnowledgeController.$inject = ['project'];

    function ProjectShowKnowledgeController(project) {

        var vm = this;
        vm.project = project;

    }

})();