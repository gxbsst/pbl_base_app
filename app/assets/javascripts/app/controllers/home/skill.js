(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SkillController', SkillController);

    SkillController.$inject = ['$scope', '$stateParams', 'Skill', 'ProjectSkills'];

    function SkillController($scope, $stateParams, Skill, ProjectSkills) {

        var vm = this;
        vm.selected = [];
        vm.categories = Skill.all({action: 'categories'});
        vm.isSelected = isSelected;
        vm.getCategory = getCategory;
        vm.getSubCategory = getSubCategory;
        vm.onChange = onChange;

        ProjectSkills
            .all({
                projectId: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

        function getCategory(subject) {
            vm.category = Skill.all({action: 'categories', id: subject.id, include: 'sub_categories'});
        }

        function getSubCategory(phase) {
            vm.sub_category = Skill.all({action: 'sub_categories', id: phase.id, include: 'techniques'});
        }

        function onChange(item) {
            if(item.selected){
                ProjectSkills
                    .add({
                        projectId: $stateParams.projectId
                    }, {
                        id: item.id
                    }, emit);
            }else{
                ProjectSkills
                    .remove({
                        projectId: $stateParams.projectId,
                        standardId: item.id
                    }, emit);
            }

            function emit(){
                $scope.$emit('onProjectSkills');
            }
        }

        function isSelected(entry) {
            return vm.selected.has(function (item) {
                return item.id === entry.id;
            });
        }

    }

})();