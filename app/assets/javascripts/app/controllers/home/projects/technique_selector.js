(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('TechniqueSelectorController', TechniqueSelectorController);

    TechniqueSelectorController.$inject = ['$scope', 'ProjectSkills', 'ProjectGauges'];

    function TechniqueSelectorController($scope, ProjectSkills, ProjectGauges){

        var vm = this,
            project = $scope.project;
        vm.select = select;

        vm.techniques = ProjectSkills.all({
            project_id: project.id
        });

        function select(technique){
            $scope.gauge.technique = technique;
            $scope.destroyModal();
        }
    }

})();