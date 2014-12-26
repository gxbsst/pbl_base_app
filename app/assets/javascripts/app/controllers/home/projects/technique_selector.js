(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('TechniqueSelectorController', TechniqueSelectorController);

    TechniqueSelectorController.$inject = ['$scope', 'ProjectTechniques', 'ProjectGauges'];

    function TechniqueSelectorController($scope, ProjectTechniques, ProjectGauges) {

        var vm = this,
            project = $scope.project,
            gauge = $scope.gauge,
            busy;

        vm.select = select;
        vm.isSelected = isSelected;
        vm.techniques = ProjectTechniques.all({
            project_id: project.id
        });

        function select(item) {
            if(busy)return;
            busy = true;
            var params = {
                rule: {
                    project_id: project.id,
                    technique_id: item.technique.id
                }
            };
            if (gauge) {
                ProjectGauges.update({
                    gaugeId: gauge.id
                }, params, emit);
            } else {
                ProjectGauges.add(params, emit);
            }
        }

        function isSelected(item){
            if(!gauge || !gauge.technique){
                return false;
            }
            return (gauge.technique_id || gauge.technique.id) === item.technique.id;
        }

        function emit() {
            $scope.$emit('onProjectGauges');
            $scope.destroyModal();
        }
    }

})();