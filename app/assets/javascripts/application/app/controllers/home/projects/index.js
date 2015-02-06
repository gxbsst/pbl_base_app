(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('ProjectIndexController', ProjectIndexController)
        .controller('ProjectEditController', ProjectEditController)
        .controller('HomeProjectShowController', HomeProjectShowController);


    PBLMapController.$inject = ['$scope', '$state', '$element', '$interval', 'Tasks'];

    function PBLMapController($scope, $state, $element, $interval, Tasks) {
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
        vm.setTask = setTask;

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
                if (!vm.isReady) {
                    for (var i = 0; i <= diff; i++) {
                        var date = angular.copy(start).add(i, 'days'),
                            current = date.isSame(now, 'days'),
                            node = {
                                $index: i,
                                isFirst: i == 0,
                                isLast: i == diff,
                                isCurrent: current,
                                width: i == diff ? 0 : vm.node,
                                date: date._d,
                                tasks: tasks.find(function (task) {
                                    return task.start_at && moment(task.start_at).isSame(date, 'days');
                                })
                            };
                        if (current) {
                            vm.current = node;
                        }
                        vm.nodes.push(node);
                    }
                    vm.isReady = true;
                    $element.find('.pbl-map-container').delay(400).animate({scrollLeft: vm.timeline * progress - width / 2 + vm.padding});
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

        function getProgress() {
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

        function setTask(task) {
            vm.task = task;
            $state.go('base.home.projects.show.scaffold', {projectId: project.id});
            $scope.$emit('onSetView', task);
        }

    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

    ProjectIndexController.$inject = ['$rootScope', '$scope','$state', '$stateParams', 'Projects', 'ProjectProducts', 'Resources', 'RESOURCE_TYPES','PROJECT_TYPES'];

    function ProjectIndexController($rootScope, $scope,$state, $stateParams, Projects, ProjectProducts, Resources, RESOURCE_TYPES,PROJECT_TYPES) {
        var vm = this;
        vm.projectsread=false;
        vm.projects = [];
        vm.getProjects = getProjects;
        vm.removeProjects = removeProjects;
        vm.changeState=changeState;
        vm.projectShow=projectShow;
        vm.meta = {
            total_count: 9,
            total_pages: 0,
            current_page: 0,
            per_page: 10
        };
        vm.select = {
            subject: '',
            phase: '',
            technique: '',
            name: '',
            order: 'desc',
            user_id: '',
            actor_id: '',
            state:''
        };
        vm.criteria=$stateParams.criteria;
        if (!vm.criteria) {
            vm.criteria='user_id';
        }
        vm.select[vm.criteria] = $rootScope.currentUser.id;


        getProjects();

        function removeProjects(project){
            Projects.remove({projectId:project.id},function(result){
                console.log(result);
                vm.projects.remove(function (item) {
                    return item.id == project.id;
                });
            });

        }

        function projectShow(project){
            console.log(RESOURCE_TYPES);
            switch (project.state){
                case PROJECT_TYPES.draft:
                    $state.go('base.home.projects.edit.design',{projectId:project.id});
                    break;
                case PROJECT_TYPES.release:
                    $state.go('base.home.projects.show.info',{projectId:project.id});
                    break;
                case PROJECT_TYPES.completed:
                    $state.go('base.pbl.show',{projectId:project.id});
                    break;
            }
        }
        function getProjects() {
            console.log(vm.select.user_id);
            Projects.all({
                limit: vm.meta.total_count,
                page: vm.meta.current_page + 1,
                subject: vm.select.subject,
                phase: vm.select.phase,
                technique: vm.select.technique,
                name: vm.select.name,
                order: vm.select.order,
                user_id: vm.select.user_id,
                actor_id: vm.select.actor_id,
                state: vm.select.state
            }, function (result) {
                angular.forEach(result.data, function (project) {
                    getProjectProducts(project);
                    if(!vm.projects.findOne(function(item){
                            item.id == project.id;
                        })){
                        vm.projects.push(project);
                    }
                    vm.projectsread=true;
                });
                vm.meta = result.meta;
                console.log(vm.meta);
                console.log(vm.projects);
            });
        }

        function changeState(state){
            vm.select.state = state;
            vm.projects=[];
            vm.meta={
                total_count: 9,
                total_pages: 0,
                current_page: 0,
                per_page: 10
            };
            vm.projectsread=false;
            getProjects();
        }
        function getResources(type, project, singular) {
            return project.resources[singular ? 'findOne' : 'find'](function (resource) {
                return resource.owner_type == type && resource.owner_id == project.id;
            });
        }

        function getProjectProducts(project) {
            ProjectProducts.all({
                project_id: project.id
            }, function (result) {
                project.$products = angular.copy(result.data);
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                project.final_product = products.findOne(findFinal);
                if (project.final_product) {
                    products.remove(findFinal);
                }
                project.products = result.data;
                getProjectResources(project);
            });
        }

        function getProjectResources(project) {
            project.resources = [];
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document,
                    RESOURCE_TYPES.project.resource].join(','),
                owner_ids: [project.id].concat(project.$products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                project.resources = result.data;
                project.cover = getResources(RESOURCE_TYPES.project.cover, project, true);
            });
        }
    }

    ProjectEditController.$inject = ['$state', '$scope', 'project'];

    function ProjectEditController($state, $scope, project) {

        var vm = this;

        vm.project = $scope.project = project;

        $scope.$on('onSetView', onSetView);
        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.edit.' + view, {projectId: project.id});
        }

        function onSetView(event, task) {
            if (task) {
                vm.$task = task;
            } else {
                delete vm.$task;
            }
        }
    }

    HomeProjectShowController.$inject = ['$state', '$scope', 'project'];

    function HomeProjectShowController($state, $scope, project) {

        var vm = this;

        vm.project = $scope.project = project;
        vm.state = 'running';

        $scope.$on('onSetView', onSetView);
        $scope.goto = goto;

        function goto(view) {
            $state.go('base.home.projects.show.' + view, {projectId: project.id});
        }

        function onSetView(event, task) {
            if (task) {
                vm.$task = task;
            } else {
                delete vm.$task;
            }
        }
    }


})();
