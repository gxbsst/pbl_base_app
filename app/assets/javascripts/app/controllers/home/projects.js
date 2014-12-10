(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectIndexController', HomeProjectIndexController)
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController)
    ;


    HomeProjectIndexController.$inject = ['Projects'];

    function HomeProjectIndexController(Projects) {
        var vm = this;
        Projects.all({}, function (result) {
            vm.projects = result.data;
            console.log(vm.projects);
        });

    }


    PBLMapController.$inject = ['$scope'];

    function PBLMapController($scope) {
        var vm = this;
    }

    PBLGuideController.$inject = ['$scope', '$stateParams'];

    function PBLGuideController($scope, $stateParams) {
        var vm = this;

        vm.currentStep = $stateParams.step;

    }

    HomeProjectCreateDesignController.$inject = ['$scope', '$state', 'Projects', 'ProjectStandards', 'project'];

    function HomeProjectCreateDesignController($scope, $state, Projects, ProjectStandards, project) {

        var vm = this;

        project.standards = project.standards || [];
        project.skills = project.skills || [];
        project.standard_decompositions = project.standard_decompositions || [];
        project.stage_products = project.stage_products || [];
        project.final_product = project.final_product ||
        {
            'worksform':{},
                'description': '@PARAGRAPH',
                'example': '@GUID'
        };

        vm.project = project;
        vm.removeStandard = removeStandard;
        $scope.$on('onProjectStandards', onProjectStandards);
        vm.removeSkill = removeSkill;
        $scope.$on('setSkills', setSkills);
        $scope.$on('setWorksforms', setWorksforms);

        vm.saveProject = saveProject;
        vm.goRubrics =goRubrics;

        vm.removeObjArray =removeObjArray;
        vm.addObjArray = addObjArray;
        vm.chooseWorksform = chooseWorksform;
        vm.showStandardAnalysis = showStandardAnalysis;

        function showStandardAnalysis() {
            vm.switchvmStandardAnalysis = !vm.switchvmStandardAnalysis;
        }

        function chooseWorksform(obj,index) {
            vm.chooseitem={
                'obj':obj,'index':index
            };
        }

        function addObjArray(obj) {
            obj.splice(obj.length, 0, {});
        }

        //function removeObjArray(obj, index) {
        //    obj.splice(index, 1);
        //}

        function removeObjArray(objs, obj) {
            objs.remove(function (a) {
                console.log("new remove");
                return a.id === obj.id;
            });
        }
        function goRubrics() {
            saveProject(Projects, project);
            $state.go('base.home.projects.create.rubrics', {projectId: project.id});
        }

        function onProjectStandards() {
            ProjectStandards.all({
                projectId: vm.project.id
            }, function (result) {
                vm.project.standards = result.data;
            });
        }

        function removeStandard(standard) {
            ProjectStandards
                .remove({
                    projectId: project.id,
                    standardId: standard.id
                }, onProjectStandards);
            //vm.project.standards.remove(function (a) {
            //    return a.id === standard.id;
            //});
        }

        function setSkills(event, skills) {
            vm.project.skills = skills;
        }
        function removeSkill(skill) {
            vm.project.skills.remove(function (a) {
                return a.id === skill.id;
            });
        }


        function setWorksforms(event, worksforms) {
            switch(vm.chooseitem.obj)
            {
                case 'final_product':
                    vm.project.final_product.worksform= worksforms;
                    break;
                case 'stage':
                    console.log(vm.project.stage_products);
                    vm.project.stage_products[vm.chooseitem.index].worksform= worksforms;
                    break;
            }
        }

        function saveProject() {
            Projects.update({projectId: project.id}, {data: project}, function (result) {
                //console.log(result.result);
            });
        }
    }


})();
