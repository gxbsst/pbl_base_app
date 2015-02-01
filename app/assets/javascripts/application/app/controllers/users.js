(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('FriendsListController', FriendsListController)
        .controller('UsersShowController', UsersShowController)
        .controller('UserCardController', UserCardController);

    FriendsListController.$inject = ['$scope'];

    function FriendsListController($scope) {

        var vm = this;
        vm.filter = filter;

        function filter(user) {
            return !vm.keyword || (user.friend.realname || user.friend.username).toLowerCase().indexOf(vm.keyword.toLowerCase()) >= 0;
        }

    }

    UsersShowController.$inject = ['$scope', '$stateParams', 'Users', '$rootScope', '$state', 'Projects',
        'ProjectProducts', 'Resources', 'RESOURCE_TYPES', 'PROJECT_TYPES'];

    function UsersShowController($scope, $stateParams, Users, $rootScope, $state, Projects,
                                 ProjectProducts, Resources, RESOURCE_TYPES, PROJECT_TYPES) {
        var vm = this;
        Users.get({userId: $stateParams.userId}, function (result) {
            vm.user = result.data;
            Users.get({userId: $stateParams.userId, action: 'clazzs'}, function (result) {
                vm.user.clazzs = result.data;
            });
        });

        vm.projectsread = false;
        vm.projects = [];
        vm.getProjects = getProjects;
        vm.changeState = changeState;
        vm.projectShow = projectShow;
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
            state: ''
        };
        vm.criteria = 'actor_id';
        vm.select[vm.criteria] = $stateParams.userId;


        getProjects();


        function projectShow(project) {
            console.log(RESOURCE_TYPES);
            switch (project.state) {
                case PROJECT_TYPES.draft:
                    $state.go('base.home.projects.edit.design', {projectId: project.id});
                    break;
                case PROJECT_TYPES.release:
                    $state.go('base.home.projects.show.info', {projectId: project.id});
                    break;
                case PROJECT_TYPES.completed:
                    $state.go('base.pbl.show', {projectId: project.id});
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
                    vm.projects.push(project);
                    vm.projectsread = true;
                });
                vm.meta = result.meta;
                console.log(vm.meta);
                console.log(vm.projects);
            });
        }

        function changeState(state) {
            vm.select.state = state;
            vm.projects = [];
            vm.meta = {
                total_count: 9,
                total_pages: 0,
                current_page: 0,
                per_page: 10
            };
            vm.projectsread = false;
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

    UserCardController.$inject = ['$scope', 'Users'];

    function UserCardController($scope, Users){

        var vm = this,
            user = $scope.user;

        Users.get({
            userId: user.id,
            include: 'schools'
        }, function (result) {
            vm.user = result.data;
        });

    }

})();
