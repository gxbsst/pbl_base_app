(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController);

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project'];

    function HomeProjectCreateInfoController($state, Projects, project) {
        var vm = this;
        vm.project = project;
    }


})();