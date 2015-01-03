(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('CurriculumsController', CurriculumsController);

    CurriculumsController.$inject = ['$scope', '$stateParams', 'Curriculums', 'ProjectStandards'];

    function CurriculumsController($scope, $stateParams, Curriculums, ProjectStandards) {

        var vm = this,
            project = $scope.project;
        //vm.selected = $scope.project.standard_items || [];
        vm.subjects = Curriculums.all({action: 'subjects'});
        vm.isSelected = isSelected;
        vm.getPhases = getPhases;
        vm.getStandards = getStandards;
        vm.onChange = onChange;

        $scope.$on('getProjectStandards', getProjectStandards);

        function getPhases(subject) {
            vm.subject = subject;
            vm.phases = Curriculums.all({action: 'phases', subject_id: subject.id});
        }

        function getStandards(phase) {
            vm.phase = phase;
            vm.standards = Curriculums.all({action: 'standards', phase_id: phase.id, include: 'items'});
        }

        function onChange(item) {
            vm.isBusy = item;
            var params = {
                standard_item: {
                    project_id: $stateParams.projectId,
                    standard_item_id: item.id
                }
            };
            if (item.selected) {
                ProjectStandards.add(params, emit);
            } else {
                var findItem = function (a) {
                        return (a.standard_item_id || a.standard_item.id) == item.id;
                    },
                    standardItem = project.standard_items.findOne(findItem);
                if (standardItem) {
                    //project.standard_items.remove(findItem);
                    ProjectStandards.remove({
                        standardItemId: standardItem.id
                    }, emit);
                }
            }

            function emit() {
                $scope.$emit('onProjectStandards');
            }
        }

        function getProjectStandards(event, isBusy) {
            vm.isBusy = isBusy;
        }

        function isSelected(entry) {
            return project.standard_items.has(function (item) {
                return (item.standard_item_id || item.standard_item.id) === entry.id;
            });
        }

    }

})();