(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('StandardsController', StandardsController);

    StandardsController.$inject = ['$scope', 'Standards'];

    function StandardsController($scope, Standards) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Standards.all();
        vm.setSubject = setSubject;
        vm.setGrade = setGrade;
        vm.parentChange = parentChange;
        vm.childChange = childChange;
        vm.importStandards = importStandards;
        vm.setStandards = setStandards;

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

        function childChange(entry, parent) {
            entry.selected ? vm.selected.push(entry) : vm.selected.remove(function (a) {
                return a.id === entry.id;
            });
        }

        function isSelected(entry) {
            return vm.selected.has(function (child) {
                return child.id === entry.id;
            });
        }

        function importStandards(entry, parent) {
            console.log(arguments);
        }

        function setStandards() {
            $scope.$emit('setStandards', vm.selected);
            $scope.destroyModal();
        }

    }

})();