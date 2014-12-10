(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SkillsController', SkillsController);

    SkillsController.$inject = ['$scope', '$stateParams', 'Skills', 'ProjectSkills'];

    function SkillsController($scope, $stateParams, Skills, ProjectSkills) {

        var vm = this;
        vm.selected = [];
        vm.subjects = Skills.all();
        vm.isSelected = isSelected;
        vm.setSubject = setSubject;
        vm.setCategorie = setCategorie;
        vm.parentChange = parentChange;
        vm.childChange = childChange;
        vm.setSkills = setSkills;

        ProjectSkills
            .all({
                projectId: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

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

        function childChange(entry) {
            if(entry.selected){
                ProjectSkills
                    .add({
                        projectId: $stateParams.projectId
                    }, {
                        id: entry.id
                    }, emit);
            }else{
                ProjectSkills
                    .remove({
                        projectId: $stateParams.projectId,
                        skillsId: entry.id
                    }, emit);
            }

            function emit(){
                $scope.$emit('onProjectSkills');
            }


        }

        function isSelected(entry) {
            return vm.selected.has(function (child) {
                return child.id === entry.id;
            });
        }


        function setSkills() {
            ProjectSkills
                .update({projectId: $stateParams.projectId}, vm.project.skills)
                .then(function () {
                    $scope.$emit('Skills');
                    $scope.destroyModal();
                });
        }

    }

})();