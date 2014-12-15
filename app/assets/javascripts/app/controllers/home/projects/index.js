(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('HomeProjectIndexController', HomeProjectIndexController)
        .controller('HomeProjectCreateController', HomeProjectCreateController);


    PBLMapController.$inject = ['$scope'];

    function PBLMapController($scope) {
        var vm = this;
    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

    HomeProjectIndexController.$inject = ['Projects'];

    function HomeProjectIndexController(Projects) {
        var vm = this;
        vm.projects = Projects.all();
    }

    HomeProjectCreateController.$inject = ['$state', '$scope', 'project'];

    function HomeProjectCreateController($state, $scope, project) {

        $scope.next = next;

        function next(step) {
            $state.go('base.home.projects.create.' + step, {projectId: project.id});
        }
    }

})();
