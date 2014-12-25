(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowStatisticsController', ProjectShowStatisticsController);

    ProjectShowStatisticsController.$inject = ['project'];

    function ProjectShowStatisticsController(project) {

        var vm = this;
        vm.project = project;

    }

})();