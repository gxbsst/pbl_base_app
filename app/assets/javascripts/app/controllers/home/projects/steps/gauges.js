(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateGaugesController', HomeProjectCreateGaugesController)
        .controller('HomeProjectCreateGaugesTypeController', HomeProjectCreateGaugesTypeController)
        .controller('GaugesSystemController', GaugesSystemController);

    HomeProjectCreateGaugesController.$inject = ['$scope', 'ProjectGauges', 'Projects', 'project'];

    function HomeProjectCreateGaugesController($scope, ProjectGauges, Projects, project) {

        var vm = this;
        vm.project = project;
        vm.setDisabled = setDisabled;
        vm.addRow = addRow;
        vm.addColumn = addColumn;
        vm.removeRow = removeRow;

        refresh();

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

        function addRow(content, level) {
            /*ProjectGauges.add({
             projectId: project.id,
             gauge: {
             content: content,
             level: level
             }
             }, function () {

             });*/
        }

        function addColumn() {

        }

        function removeRow(gauge) {
            ProjectGauges.remove({
                projectId: project.id,
                gaugeId: gauge.id
            }, refresh);
        }

        function refresh() {
            vm.gauges = ProjectGauges.all({projectId: project.id});
        }
    }

    HomeProjectCreateGaugesTypeController.$inject = ['$scope', '$filter', 'Projects'];

    function HomeProjectCreateGaugesTypeController($scope, $filter, Projects) {

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
        }
    }

    GaugesSystemController.$inject = ['$scope', 'Gauges', 'ProjectGauges'];

    function GaugesSystemController($scope, Gauges, ProjectGauges) {

        var vm = this;
        vm.gauges = Gauges.all();
        vm.onChange = onChange;
        vm.isSelected = isSelected;

        function onChange(gauge){
            if(gauge.selected){

            }else{

            }
        }

        function isSelected(gauge){
            return ($scope.project.gauges || []).has(function (g) {
                return g.gauge_id === gauge.id;
            });
        }

    }

})();