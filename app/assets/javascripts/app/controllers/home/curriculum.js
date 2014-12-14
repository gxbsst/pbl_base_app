(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('CurriculumController', CurriculumController);

    CurriculumController.$inject = ['$scope', '$stateParams', 'Curriculum', 'ProjectStandards'];

    function CurriculumController($scope, $stateParams, Curriculum, ProjectStandards) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Curriculum.all({action: 'subjects'});
        vm.isSelected = isSelected;
        vm.getSubject = getSubject;
        vm.getPhase = getPhase;
        vm.onChange = onChange;

        ProjectStandards
            .all({
                projectId: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

        function getSubject(subject) {
            vm.subject = Curriculum.all({action: 'subjects', id: subject.id, include: 'phases'});
        }

        function getPhase(phase) {
            vm.phase = Curriculum.all({action: 'phases', id: phase.id, include: 'standards'});
        }

        function onChange(item) {
            if(item.selected){
                ProjectStandards
                    .add({
                        projectId: $stateParams.projectId
                    }, {
                        id: item.id
                    }, emit);
            }else{
                ProjectStandards
                    .remove({
                        projectId: $stateParams.projectId,
                        standardId: item.id
                    }, emit);
            }

            function emit(){
                $scope.$emit('onProjectStandards');
            }
        }

        function isSelected(entry) {
            return vm.selected.has(function (item) {
                return item.id === entry.id;
            });
        }

    }

})();