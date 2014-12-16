(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateGaugesController', HomeProjectCreateGaugesController)
        .controller('HomeProjectCreateGaugesTypeController', HomeProjectCreateGaugesTypeController)
        .controller('GaugesSystemController', GaugesSystemController);

    HomeProjectCreateGaugesController.$inject = ['$state', 'ProjectGauges', 'project'];

    function HomeProjectCreateGaugesController($state, ProjectGauges, project) {

        var vm = this;
        vm.project = project;
        vm.project.gaugeType = 2;
        vm.project.gaugeHead = '00110'.split('').map(function (v, i) {
            return {
                disabled: v == 0
            }
        });
        vm.setDisabled = setDisabled;
        vm.addRow = addRow;
        vm.addColumn = addColumn;
        vm.removeRow = removeRow;

        refresh();

        function setDisabled(disabled, $index){
            vm.project.gaugeHead[$index].disabled = disabled;
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

        function removeRow(gauge){
            ProjectGauges.remove({
                projectId: project.id,
                gaugeId: gauge.id
            }, refresh);
        }

        function refresh(){
            vm.gauges = ProjectGauges.all({projectId: project.id});
        }
    }

    HomeProjectCreateGaugesTypeController.$inject = ['$scope', '$filter'];

    function HomeProjectCreateGaugesTypeController($scope, $filter){

        var vm = this;
        vm.gaugeTypes = $filter('i18n')('GAUGE_HEAD');

        vm.setGaugeType = setGaugeType;

        function setGaugeType(type){
            $scope.project.gaugeType = type;
        }
    }

    GaugesSystemController.$inject = ['$scope', 'Gauges'];

    function GaugesSystemController($scope, Gauges){

        var vm = this;
        vm.gauges = Gauges.all();

    }

})();