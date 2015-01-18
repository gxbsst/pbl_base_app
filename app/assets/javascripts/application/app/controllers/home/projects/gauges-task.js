(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GaugesProjectController', GaugesProjectController);

    GaugesProjectController.$inject = ['$scope', 'ProjectGauges', 'ProjectTechniques','Tasks'];

    function GaugesProjectController($scope, ProjectGauges, ProjectTechniques,Tasks) {

        var  vm=this;
        vm.project=$scope.project;
        vm.task=$scope.task;
        vm.task.rule_ids=vm.task.rule_ids||[];

        $scope.onChange = onChange;
        $scope.isSelected = isSelected;

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {

            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

        getProjectGauges();
        function getProjectGauges() {
            ProjectGauges.all({
                project_id: $scope.project.id
            }, function (result) {
                vm.project.rules = result.data;
            });
        }

        function onChange(gauge) {
            //vm.task.rule_ids=vm.task.rule_ids.find(function (rule) {
            //    return gauge.selected;
            //}).map(function (rule) {
            //    return rule.id;
            //});
            if (gauge.selected) {
                vm.task.rule_ids.push(gauge.id);
                Tasks.update({taskId:vm.task.id,
                    task: {rule_ids:vm.task.rule_ids}
                }, emit);
            } else {
                var rule = vm.task.rule_ids.findOne(function (rule) {
                    return rule === gauge.id
                });
                if(rule){
                    vm.task.rule_ids.remove(function (item) {
                        return item == gauge.id;
                    });
                    Tasks.update({taskId:vm.task.id,
                        task: {rule_ids:vm.task.rule_ids}
                    }, emit);
                }
            }
        }


        function emit() {
            $scope.$emit('onProjectTaskGauges', vm.task);
        }
        function isSelected(gauge) {
            return vm.task.rule_ids.has(function (g) {
                return g === gauge.id;
            });
        }


    }

})();