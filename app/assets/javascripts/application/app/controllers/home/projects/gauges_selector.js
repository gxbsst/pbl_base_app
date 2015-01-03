(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GaugesSelectorController', GaugesSelectorController)
        .controller('GaugeRecommendsController', GaugeRecommendsController)
        .controller('GaugesSystemController', GaugesSystemController)
        .controller('GaugesMineController', GaugesMineController);

    GaugesSelectorController.$inject = ['$scope', 'ProjectGauges', 'ProjectTechniques'];

    function GaugesSelectorController($scope, ProjectGauges, ProjectTechniques) {

        var project = $scope.project;

        $scope.onChange = onChange;
        $scope.isSelected = isSelected;
        $scope.getTechnique = getTechnique;

        ProjectTechniques.all({
            project_id: project.id
        }, function (result) {
            $scope.techniques = result.data;
        });

        function onChange(gauge) {
            if (gauge.selected) {
                ProjectGauges.add({
                    rule: {
                        project_id: project.id,
                        gauge_id: gauge.id,
                        technique_id: gauge.technique_id || gauge.technique.id,
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

        function isSelected(gauge) {
            return project.rules.has(function (g) {
                return g.gauge_id === gauge.id;
            });
        }

        function getTechnique(technique) {
            return $scope.techniques.findOne(function (item) {
                return item.technique.id === technique.technique_id;
            });
        }

        function emit() {
            $scope.$emit('onProjectGauges');
        }

    }

    GaugesSystemController.$inject = ['$scope', 'Gauges'];

    function GaugesSystemController($scope, Gauges) {

        var vm = this;

        $scope.$watch(function () {
            return $scope.techniques;
        }, function (techniques) {
            if(techniques){
                Gauges.all({
                    technique_ids: techniques.map(function (item) {
                        return item.technique.id;
                    }).join(',')
                }, function (result) {
                    vm.gauges = result.data;
                })
            }
        });

    }

    GaugesMineController.$inject = ['$scope', 'Rules'];

    function GaugesMineController($scope, Rules) {

        var vm = this;

        $scope.$watch(function () {
            return $scope.techniques;
        }, function (techniques) {
            if(techniques){
                Rules.all(function (result) {
                    vm.gauges = result.data;
                })
            }
        });

    }

    GaugeRecommendsController.$inject = ['$scope', 'GaugeRecommends'];

    function GaugeRecommendsController($scope, GaugeRecommends){

        var vm = this;

        $scope.$watch(function () {
            return $scope.techniques;
        }, function (techniques) {
            if(techniques){
                GaugeRecommends.all({
                    technique_ids: techniques.map(function (item) {
                        return item.technique.id;
                    }).join(',')
                }, function (result) {
                    vm.techniques = result.data;
                });
            }
        });

    }

})();