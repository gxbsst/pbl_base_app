(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectShowStatisticsController', ProjectShowStatisticsController);

    ProjectShowStatisticsController.$inject = ['project'];

    function ProjectShowStatisticsController(project) {

        var vm = this;
        vm.project = project;

        //Chart types: chartLine, chartBar, chartRadar, chartDoughnut, chartPie, chartPolarArea

        vm.options = {
            scaleBeginAtZero: false,
            datasetStrokeWidth: 1
        };

        vm.labels =['数学', '语文', '计算机', '历史', '自然科学', '英语'];

        vm.data = [
            [28, 48, 40, 19, 100, 65]
        ];

    }

})();