(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController);

    HomeProjectCreateDesignController.$inject = ['$scope', '$state', 'Projects', 'ProjectStandards', 'ProjectSkills', 'project'];

    function HomeProjectCreateDesignController($scope, $state, Projects, ProjectStandards, ProjectSkills, project) {

        var vm = this;

        project.standards = project.standards || [];
        project.skills = project.skills || [];
        project.standard_decompositions = project.standard_decompositions || [];
        project.stage_products = project.stage_products || [];
        project.final_product = project.final_product ||
        {
            'worksform': null,
            'description': '',
            'example': ''
        };
        vm.project = project;
        vm.removeStandard = removeStandard;
        vm.removeSkill = removeSkill;
        vm.saveProject = saveProject;
        vm.removeObjArray = removeObjArray;
        vm.addObjArray = addObjArray;
        vm.chooseWorksform = chooseWorksform;
        vm.showStandardAnalysis = showStandardAnalysis;
        $scope.$on('onProjectStandards', onProjectStandards);
        $scope.$on('onProjectSkills', onProjectSkills);
        $scope.$on('setWorksforms', setWorksforms);

        function showStandardAnalysis() {
            vm.switchvmStandardAnalysis = !vm.switchvmStandardAnalysis;
        }

        function chooseWorksform(obj, index) {
            vm.chooseitem = {
                'obj': obj, 'index': index
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


        function onProjectSkills() {
            ProjectSkills.all({
                projectId: vm.project.id
            }, function (result) {
                vm.project.skills = result.data;
            });
        }

        function removeSkill(skill) {
            ProjectSkills
                .remove({
                    projectId: project.id,
                    skillId: skill.id
                }, onProjectSkills);
            //vm.project.standards.remove(function (a) {
            //    return a.id === standard.id;
            //});
        }

        function setWorksforms(event, worksforms) {
            switch (vm.chooseitem.obj) {
                case 'final_product':
                    vm.project.final_product.worksform = worksforms;
                    break;
                case 'stage':
                    console.log(vm.project.stage_products);
                    vm.project.stage_products[vm.chooseitem.index].worksform = worksforms;
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