(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('GaugesSelectorController', GaugesSelectorController)
        .controller('GaugeRecommendsController', GaugeRecommendsController)
        .controller('GaugesSystemController', GaugesSystemController);

    GaugesSelectorController.$inject = ['$scope', 'ProjectGauges'];

    function GaugesSelectorController($scope, ProjectGauges) {

        var project = $scope.project;

        $scope.selected = project.rules;
        $scope.onChange = onChange;
        $scope.isSelected = isSelected;

        function onChange(gauge) {
            if (gauge.selected) {
                ProjectGauges.add({
                    rule: {
                        project_id: project.id,
                        gauge_id: gauge.id,
                        technique_id: gauge.technique.id,
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
            return $scope.selected.has(function (g) {
                return g.gauge_id === gauge.id;
            });
        }

        function emit() {
            $scope.$emit('onProjectGauges');
        }

    }

    GaugesSystemController.$inject = ['$scope', 'Gauges', 'ProjectTechniques', 'ProjectGauges'];

    function GaugesSystemController($scope, Gauges, ProjectTechniques, ProjectGauges) {

        var vm = this,
            project = $scope.project;

        ProjectTechniques.all({
            project_id: project.id
        }, function (result) {
            Gauges.all({
                technique_ids: result.data.map(function (item) {
                    return item.technique.id;
                }).join(',')
            }, function (result) {
                vm.gauges = result.data;
            })
        });

    }

    GaugeRecommendsController.$inject = ['$scope', 'GaugeRecommends', 'ProjectTechniques'];

    function GaugeRecommendsController($scope, GaugeRecommends, ProjectTechniques){

        var vm = this,
            project = $scope.project;

        getGaugeRecommends();

        function getGaugeRecommends() {
            ProjectTechniques.all({
                project_id: project.id
            }, function (result) {
                project.techniques = result.data;
                GaugeRecommends.all({
                    technique_ids: project.techniques.map(function (item) {
                        return item.technique.id;
                    }).join(',')
                }, function (result) {
                    vm.techniques = result.data;
                });
            });
        }

    }

})();