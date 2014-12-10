(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('StandardsController', StandardsController);

    StandardsController.$inject = ['$scope', '$stateParams', 'Standards', 'ProjectStandards'];

    function StandardsController($scope, $stateParams, Standards, ProjectStandards) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Standards.all();
        vm.isSelected = isSelected;
        vm.setSubject = setSubject;
        vm.setGrade = setGrade;
        vm.parentChange = parentChange;
        vm.childChange = childChange;
        vm.setStandards = setStandards;

        ProjectStandards
            .all({
                projectId: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

        function setSubject(subject) {
            vm.subject = subject;
            vm.grades = Standards.all({subjectId: subject.id});
        }

        function setGrade(grade) {
            vm.grade = grade;
            vm.standards = Standards.all({action: 'grades', gradeId: grade.id});
        }

        function parentChange(entry) {
            entry.children.map(function (child) {
                child.selected = entry.selected;
                vm.childChange(child, entry);
                return child;
            });
        }

        function childChange(entry) {
            if(entry.selected){
                ProjectStandards
                    .add({
                        projectId: $stateParams.projectId
                    }, {
                        id: entry.id
                    }, emit);
            }else{
                ProjectStandards
                    .remove({
                        projectId: $stateParams.projectId,
                        standardId: entry.id
                    }, emit);
            }

            function emit(){
                $scope.$emit('onProjectStandards');
            }

            //entry.selected ? vm.selected.push(entry) : vm.selected.remove(function (a) {
            //    return a.id === entry.id;
            //});
        }

        function isSelected(entry) {
            return vm.selected.has(function (child) {
                return child.id === entry.id;
            });
        }

        function setStandards() {
            ProjectStandards
                .update({projectId: $stateParams.projectId}, vm.project.standards)
                .then(function () {
                    $scope.$emit('Standards');
                    $scope.destroyModal();
                });
        }

    }

})();