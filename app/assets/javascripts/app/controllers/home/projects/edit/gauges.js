(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditGaugesController', ProjectEditGaugesController)
        .controller('ProjectCreateGaugesTypeController', ProjectCreateGaugesTypeController);

    ProjectEditGaugesController.$inject = ['$scope', 'ProjectTechniques', 'ProjectGauges', 'Projects', 'project'];

    function ProjectEditGaugesController($scope, ProjectTechniques, ProjectGauges, Projects, project) {

        var vm = this;

        vm.project = project;
        vm.setDisabled = setDisabled;
        vm.notExist = notExist;
        vm.remove = remove;
        $scope.$on('onProjectGauges', onProjectGauges);

        onProjectGauges();

        ProjectTechniques.all({
            project_id: project.id
        }, function (result) {
            vm.techniques = result.data;
        });

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {
            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

        function setDisabled(disabled, $index) {
            vm.project.ruleHeads[$index].disabled = disabled;
            vm.project.rule_head = (vm.project.ruleHeads.map(function (head) {
                return head.disabled ? 0 : 1;
            }).join('') + '11111').substr(0, 5);
            Projects.update({
                projectId: project.id
            }, {
                project: {
                    rule_head: vm.project.rule_head
                }
            });
        }

        function remove(gauge) {
            ProjectGauges.remove({
                gaugeId: gauge.id
            }, onProjectGauges);
        }

        function notExist(technique){
            if(!technique){
                return false;
            }
            return vm.techniques && !vm.techniques.has(function (item) {
                return item.technique.id === technique.id;
            });
        }

        function onProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function(result){
                project.rules = result.data;
            });
        }
    }

    ProjectCreateGaugesTypeController.$inject = ['$scope', '$filter', 'Projects'];

    function ProjectCreateGaugesTypeController($scope, $filter, Projects) {

        var vm = this;
        vm.ruleTemplates = $filter('i18n')('GAUGE_HEAD');
        vm.setRuleTemplate = setRuleTemplate;

        function setRuleTemplate(type) {
            $scope.project.rule_template = type;
            Projects.update({
                projectId: $scope.project.id
            }, {
                project: {
                    rule_template: type
                }
            });
            $scope.destroyModal();
        }
    }

})();