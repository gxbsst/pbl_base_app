(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('CurriculumsController', CurriculumsController);

    CurriculumsController.$inject = ['$scope', '$stateParams', 'Curriculums', 'ProjectStandards'];

    function CurriculumsController($scope, $stateParams, Curriculums, ProjectStandards) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Curriculums.all({action: 'subjects'});
        vm.isSelected = isSelected;
        vm.getPhases = getPhases;
        vm.getStandards = getStandards;
        vm.onChange = onChange;

        ProjectStandards
            .all({
                project_id: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

        function getPhases(subject) {
            vm.subject = subject;
            vm.phases = Curriculums.all({action: 'phases', subject_id: subject.id});
        }

        function getStandards(phase) {
            vm.phase = phase;
            vm.standards = Curriculums.all({action: 'standards', phase_id: phase.id, include: 'items'});
        }

        function onChange(item) {
            if (item.selected) {
                ProjectStandards
                    .add({
                        standard_item: {
                            project_id: $stateParams.projectId,
                            standard_item_id: item.id
                        }
                    }, emit);
            } else {
                ProjectStandards
                    .remove({
                        standard_item: {
                            project_id: $stateParams.projectId,
                            standard_item_id: item.id
                        }
                    }, emit);
            }

            function emit() {
                $scope.$emit('onProjectStandards');
            }
        }

        function isSelected(entry) {
            return vm.selected.has(function (item) {
                return item.standard_item_id === entry.id;
            });
        }

    }

})();