(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditGaugesController', ProjectEditGaugesController)
        .controller('ProjectCreateGaugesTypeController', ProjectCreateGaugesTypeController)
        .controller('GaugesSystemController', GaugesSystemController);

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
            Projects.update({
                projectId: project.id
            }, {
                project: {
                    rule_head: (vm.project.ruleHeads.map(function (head) {
                        return head.disabled ? 0 : 1;
                    }).join('') + '11111').substr(0, 5)
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

    GaugesSystemController.$inject = ['$scope', 'Gauges', 'ProjectTechniques', 'ProjectGauges'];

    function GaugesSystemController($scope, Gauges, ProjectTechniques, ProjectGauges) {

        var vm = this,
            project = $scope.project;

        vm.selected = project.rules;

        vm.onChange = onChange;
        vm.isSelected = isSelected;

        ProjectTechniques.all({
            project_id: project.id
        }, function (result) {
            vm.gauges = Gauges.all({
                technique_ids: result.data.map(function (item) {
                    return item.technique.id;
                }).join(',')
            });
        });

        function onChange(gauge) {
            if (gauge.selected) {
                ProjectGauges.add({
                    rule: {
                        project_id: project.id,
                        gauge_id: gauge.id,
                        technique_id: gauge.technique_id,
                        standard: gauge.standard,
                        weight: gauge.weight,
                        level_1: gauge.level_1,
                        level_2: gauge.level_2,
                        level_3: gauge.level_3,
                        level_4: gauge.level_4,
                        level_5: gauge.level_5
                    }
                }, emit);
            } else {
                var rule = project.rules.findOne(function (rule) {
                    return rule.gauge_id === gauge.id
                });
                if(rule){
                    ProjectGauges.remove({
                        gaugeId: rule.id
                    }, emit);
                }
            }
        }

        function emit() {
            $scope.$emit('onProjectGauges');
        }

        function isSelected(gauge) {
            return vm.selected.has(function (g) {
                return g.gauge_id === gauge.id;
            });
        }

    }

})();