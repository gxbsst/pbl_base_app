(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('ProjectIndexController', ProjectIndexController)
        .controller('ProjectEditController', ProjectEditController)
        .controller('ProjectShowController', ProjectShowController);


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

    ProjectEditController.$inject = ['$state', '$scope', 'project'];

    function ProjectEditController($state, $scope, project) {

        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.edit.' + view, {projectId: project.id});
        }
    }

    ProjectShowController.$inject = ['$state', '$scope', 'project'];

    function ProjectShowController($state, $scope, project) {

        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.show.' + view, {projectId: project.id});
        }
    }

})();
