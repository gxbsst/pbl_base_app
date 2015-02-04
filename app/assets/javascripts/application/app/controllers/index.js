(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope','Projects','ProjectProducts','Resources','RESOURCE_TYPES','TeacherSaying','Links','Learning'];

    function IndexController($scope,Projects,ProjectProducts,Resources,RESOURCE_TYPES, TeacherSaying, Links, Learning) {
        var vm = this;
        vm.projects=[];
        vm.meta={
            total_count: 3,
            total_pages: 0,
            current_page: 0,
            state:'release,complete',
            recommend:true,
            per_page: 10
        };

        getProjects();
        getInfo();

        function getInfo(){
            vm.teacherSayings=TeacherSaying.all().data;
            vm.links= Links.all().data;
            vm.learnings=Learning.all().data;
        }
        function getProjects(){
            Projects.all({
                limit:vm.meta.total_count,
                state:vm.meta.state,
                recommend:vm.meta.recommend,
                page:vm.meta.current_page
            },function (result) {
                angular.forEach(result.data, function (project) {
                    getProjectProducts(project);
                    vm.projects.push(project);
                });
                vm.meta=result.meta;

            });
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
                project.cover=getResources(RESOURCE_TYPES.project.cover,project,true);
            });
        }
    }

})();