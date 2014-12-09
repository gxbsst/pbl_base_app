(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('StandardsController', StandardsController);

    StandardsController.$inject = ['Standards'];

    function StandardsController(Standards) {

        var vm = this;
        vm.subjects = Standards.all();
        vm.setSubject = setSubject;
        vm.setGrade = setGrade;
        vm.parentChange = parentChange;
        vm.childChange = childChange;

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
                return child;
            });
        }

        function childChange(entry, parent) {

        }

    }

})();