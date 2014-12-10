(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SkillsController', SkillsController);

    SkillsController.$inject = ['$scope', 'Skills'];

    function SkillsController($scope, Skills) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Skills.all();
        vm.setSubject = setSubject;
        vm.setCategorie = setCategorie;
        vm.parentChange = parentChange;
        vm.childChange = childChange;
        vm.importSkills = importSkills;
        vm.setSkills = setSkills;

        function setSubject(subject) {
            vm.subject = subject;
            vm.categories = Skills.all({skillId: subject.id});
        }

        function setCategorie(categorie) {
            vm.categorie = categorie;
            vm.skills = Skills.all({action: 'categories', categorieId: categorie.id});
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

        function importSkills(entry, parent) {
            console.log(arguments);
        }

        function setSkills() {
            $scope.$emit('setSkills', vm.selected);
            $scope.destroyModal();
        }

    }

})();