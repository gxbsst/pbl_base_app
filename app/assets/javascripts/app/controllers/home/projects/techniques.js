(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SkillsController', SkillsController);

    SkillsController.$inject = ['$scope', '$stateParams', 'Skills', 'ProjectTechniques'];

    function SkillsController($scope, $stateParams, Skills, ProjectTechniques) {

        var vm = this,
            project = $scope.project;
        vm.selected = [];
        vm.categories = Skills.all({action: 'categories'});
        vm.isSelected = isSelected;
        vm.getSubCategories = getSubCategories;
        vm.getTechniques = getTechniques;
        vm.onChange = onChange;

        $scope.$on('getProjectTechniques', getProjectTechniques);

        ProjectTechniques
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
            vm.isBusy = item;
            var params = {
                technique: {
                    project_id: $stateParams.projectId,
                    technique_id: item.id
                }
            };

            if (item.selected) {
                ProjectTechniques.add(params, emit);
            } else {
                var findItem = function (a) {
                        return (a.technique_id || a.technique.id) == item.id;
                    },
                    technique = project.techniques.findOne(findItem);
                if (technique) {
                    //project.techniques.remove(findItem);
                    ProjectTechniques.remove({
                        techniqueId: technique.id
                    }, emit);
                }
            }

            //ProjectTechniques[item.selected ? 'add' : 'remove'](params, emit);

            function emit(){
                $scope.$emit('onProjectTechniques');
            }
        }

        function getProjectTechniques(event, isBusy) {
            vm.isBusy = isBusy;
        }

        function isSelected(entry) {
            return vm.selected.has(function (item) {
                return item.technique.id === entry.id;
            });
        }

    }

})();