(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('ProjectIndexController', ProjectIndexController)
        .controller('ProjectEditController', ProjectEditController)
        .controller('ProjectShowController', ProjectShowController);


    PBLMapController.$inject = ['$scope', '$element', '$interval', 'Tasks'];

    function PBLMapController($scope, $element, $interval, Tasks) {
        var vm = this,
            project = $scope.project,
            start = moment(project.start_at).set('hour', 0),
            end = moment(project.end_at).set('hour', 0),
            now = moment(),
            diff = end.diff(start, 'days'),
            progress;

        vm.resize = resize;
        vm.diff = diff;
        vm.padding = 60;
        vm.nodes = [];
        vm.show = show;
        vm.isShowed = isShowed;

        $scope.$on('onProjectTasks', onProjectTasks);
        onProjectTasks();
        getProgress();
        $interval(getProgress, 60 * 1000);

        $scope.$watch(function () {
            return {width: vm.width, tasks: vm.tasks};
        }, function (values) {
            var width = values.width,
                tasks = values.tasks;
            if (width && tasks) {
                if (diff <= 7) {
                    vm.timeline = width - vm.padding * 2;
                    vm.node = vm.timeline / diff - 6;
                } else {
                    vm.node = 80;
                    vm.timeline = (vm.node + 6) * diff;
                }
                $element.animate({scrollLeft: vm.timeline * progress - width / 2 + vm.padding});
                for (var i = 0; i <= diff; i++) {
                    var date = angular.copy(start).add(i, 'days'),
                        current = date.isSame(now, 'days'),
                        node = {
                            $index: i,
                            isFirst: i == 0,
                            isLast: i == diff,
                            isCurrent: current,
                            width: i == diff ? 0 : vm.node,
                            date: date._d
                        };
                    if (current) {
                        vm.current = node;
                    }
                    vm.nodes.push(node);
                }
            }
        }, true);

        function onProjectTasks() {
            Tasks.all({
                project_id: project.id
            }, function (result) {
                vm.tasks = result.data;
            });
        }

        function resize($width) {
            vm.width = $width;
        }

        function getProgress(){
            now = moment();
            progress = now.diff(start, 'minutes') / end.diff(start, 'minutes');
            progress = progress < 0 ? 0 : progress > 1 ? 1 : progress;
            vm.progress = progress * 100 + '%';
        }

        function show($index, show) {
            if (show) {
                vm.showed = $index;
            } else {
                delete vm.showed;
            }
        }

        function isShowed(node) {
            return typeof vm.showed != 'undefined' ? node.$index == vm.showed : (vm.current ? node.isCurrent : (node.isFirst || node.isLast));
        }

    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

    ProjectIndexController.$inject = ['Projects'];

    function ProjectIndexController(Projects) {

        var vm = this;
        Projects.all(function (result) {
            vm.projects = result.data;
        });

    }

    ProjectEditController.$inject = ['$state', '$scope', 'project'];

    function ProjectEditController($state, $scope, project) {

        var vm = this;

        vm.project = project;

        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.edit.' + view, {projectId: project.id});
        }
    }

    ProjectShowController.$inject = ['$state', '$scope', 'project'];

    function ProjectShowController($state, $scope, project) {

        var vm = this;

        vm.project = $scope.project = project;
        vm.state = 'running';

        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.show.' + view, {projectId: project.id});
        }
    }

})();
