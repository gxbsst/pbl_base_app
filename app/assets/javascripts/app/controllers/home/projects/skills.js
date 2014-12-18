(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SkillsController', SkillsController);

    SkillsController.$inject = ['$scope', '$stateParams', 'Skills', 'ProjectSkills'];

    function SkillsController($scope, $stateParams, Skills, ProjectSkills) {

        var vm = this;
        vm.selected = [];
        vm.categories = Skills.all({action: 'categories'});
        vm.isSelected = isSelected;
        vm.getSubCategories = getSubCategories;
        vm.getTechniques = getTechniques;
        vm.onChange = onChange;

        ProjectSkills
            .all({
                project_id: $stateParams.projectId
            }, function (result) {
                vm.selected = result.data;
            });

        function getSubCategories(category) {
            vm.category = category;
            vm.sub_categories = Skills.all({action: 'sub_categories', category_id: category.id});
        }

        function getTechniques(sub_category) {
            vm.sub_category = sub_category;
            vm.techniques = Skills.all({action: 'techniques', sub_category_id: sub_category.id});
        }

        function onChange(item) {
            var params = {
                technique: {
                    project_id: $stateParams.projectId,
                    technique_id: item.id
                }
            };
            ProjectSkills[item.selected ? 'add' : 'remove'](params, emit);

            function emit(){
                $scope.$emit('onProjectSkills');
            }
        }

        function isSelected(entry) {
            return vm.selected.has(function (item) {
                return item.technique_id === entry.id;
            });
        }

    }

})();