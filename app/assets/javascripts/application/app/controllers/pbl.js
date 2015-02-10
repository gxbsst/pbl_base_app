(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PBLController', PBLController)
        .controller('PBLShowController', PBLShowController);

    PBLController.$inject = ['$scope','Projects','ProjectProducts','Resources','RESOURCE_TYPES','ProjectSubject','ProjectPhase','ProjectTechnique'];

    function PBLController($scope,Projects,ProjectProducts,Resources,RESOURCE_TYPES, ProjectSubject, ProjectPhase, ProjectTechnique) {
        var vm = this;
        vm.projects=[];
        vm.getProjects=getProjects;
        vm.changeSelect=changeSelect;
        vm.meta={
            total_count: 9,
            total_pages: 0,
            current_page: 0,
            per_page: 10
        };
        vm.select={
            subject:'',
            phase:'',
            technique:'',
            name:'',
            order:'desc',
            state:'release,complete'
            };
        console.log(vm.meta);
        getSelect();
        getProjects();

        function changeSelect(obj,value){
            console.log(obj+","+value);
            vm.select[obj]=value;
            vm.projects=[];
            vm.meta={
                total_count: 9,
                total_pages: 0,
                current_page: 0,
                per_page: 10
            };
            getProjects();
        }

        function getSelect(){
            //ProjectSubject.all(function(result){
            //    vm.subject=result.data;
            //    console.log(vm.subject);
            //});
            //ProjectPhase.all(function(result){
            //    vm.phase=result.data;
            //    console.log(vm.phase);
            //});
            //ProjectTechnique.all(function(result){
            //    vm.technique=result.data;
            //    console.log(vm.technique);
            //});
            vm.subjects=ProjectSubject.all().data;
            vm.phases= ProjectPhase.all().data;
            vm.techniques=ProjectTechnique.all().data;
        }
        function getProjects(){
            Projects.all({
                limit:vm.meta.total_count,
                page:vm.meta.current_page+1,
                subject:vm.select.subject,
                grade:vm.select.phase,
                technique:vm.select.technique,
                name:vm.select.name,
                order:vm.select.order,
                state:vm.select.state
            },function (result) {
                angular.forEach(result.data, function (project) {
                    getProjectProducts(project);
                    if(!vm.projects.findOne(function(item){
                            item.id == project.id;
                        })){
                        vm.projects.push(project);
                    }
                });
                vm.meta=result.meta;
                console.log(vm.meta);

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

    PBLShowController.$inject = ['$rootScope','$scope', '$filter', 'RESOURCE_TYPES', 'Resources', 'ProjectProducts', 'ProjectGauges', 'ProjectTechniques', 'ProjectStandards', 'ProjectMembers', 'ProjectTeachers', 'project','Tasks','Users'];
    function PBLShowController($rootScope,$scope, $filter, RESOURCE_TYPES, Resources, ProjectProducts, ProjectGauges, ProjectTechniques, ProjectStandards, ProjectMembers, ProjectTeachers, project, Tasks,Users) {

        var vm = this;
        vm.project = project;
        vm.project.resources = [];
        vm.getResources = getResources;
        vm.resouceDelete=resouceDelete;
        vm.tab=1;
        vm.infoTab=infoTab;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.findByType = findByType;

        getProjectProducts();
        getProjectGauges();
        getProjectTechniques();
        getProjectStandards();
        getProjectTeacher();
        getProjectTasks();
        getProjectUser();

        $scope.$watch(function () {
            return vm.project.rule_head;
        }, function (heads) {
            vm.project.ruleHeads = (heads || '11111').substr(0, 5).split('').map(function (v, i) {
                return {
                    disabled: v == 0
                }
            });
        });

        function getProjectUser() {
            Users.all({
                userId: vm.project.user_id
            }, function (result) {
                vm.user = result.data;
            });
        }

        function getProjectTasks() {
            Tasks.all({
                project_id: vm.project.id
            }, function (result) {
                vm.tasks = result.data;
            });
        }
        function getProjectTeacher() {
            ProjectTeachers.all({
                projectId: project.id
            }, function (result) {
                vm.teachers = result.data.map(function (role) {
                    role.user_id = role.user.id;
                    role.label = role.user.username;
                    return role;
                });
            });
        }

        function findByType(ownerType, multiple) {
            return vm.project.resources[multiple ? 'find' : 'findOne'](function (resource) {
                return resource.owner_type == ownerType;
            });
        }

        function getProjectProducts() {
            ProjectProducts.all({
                project_id: project.id
            }, function (result) {
                vm.$products = angular.copy(result.data);
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                vm.project.final_product = products.findOne(findFinal);
                if (vm.project.final_product) {
                    products.remove(findFinal);
                }
                vm.project.products = result.data;
                getProjectResources();
            });
        }
        function getProjectResources() {
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.product,
                    RESOURCE_TYPES.project.document,
                    RESOURCE_TYPES.project.resource].join(','),
                owner_ids: [project.id].concat(vm.$products.map(function (product) {
                    return product.id;
                })).join(',')
            }, function (result) {
                vm.project.resources = result.data;
                console.log(vm.project.resources);
            });
        }


        function getResources(type, id, singular) {
            return vm.project.resources[singular ? 'findOne' : 'find'](function (resource) {
                return resource.owner_type == type && resource.owner_id == id;
            });
        }

        function getProjectGauges() {
            ProjectGauges.all({
                project_id: project.id
            }, function (result) {
                project.rules = result.data;
            });
        }

        function getProjectTechniques() {
            ProjectTechniques.all({
                project_id: project.id
            }, function (result) {
                vm.project.techniques = result.data;
            });
        }

        function getProjectStandards() {
            ProjectStandards.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
            });
        }
        function resouceDelete(doc){
            Resources.remove({
                resourceId: doc.id
            }, getProjectResources);
        }

        function onUploadBegin(type) {
            return function () {
                project['$uploading_' + type] = true;
            }
        }

        function onUploadSuccess(type) {
            return function () {
                if (type == 'cover' && project.cover && project.cover.id) {
                    Resources.remove({
                        resourceId: project.cover.id
                    });
                }
                delete project['$uploading_' + type];
                getProjectResources();
            }
        }
        function infoTab(tab){
            vm.tab=tab;
        }
    }

})();
