(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('ProjectIndexController', ProjectIndexController)
        .controller('ProjectCreateController', ProjectCreateController);


    PBLMapController.$inject = ['$scope'];

    function PBLMapController($scope) {
        var vm = this;
    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

    ProjectIndexController.$inject = ['Projects'];

    function ProjectIndexController(Projects) {
        var vm = this;
        vm.projects = Projects.all();
    }

    ProjectCreateController.$inject = ['$state', '$scope', 'project'];

    function ProjectCreateController($state, $scope, project) {

        $scope.next = next;

        function next(step) {
            $state.go('base.home.projects.edit.' + step, {projectId: project.id});
        }
    }

})();
