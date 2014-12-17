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
        vm.showStandardAnalysis = showStandardAnalysis;
        $scope.$on('onProjectStandards', onProjectStandards);
        $scope.$on('onProjectSkills', onProjectSkills);
        $scope.$on('setWorksforms', setWorksforms);

        onProjectStandards();

        function showStandardAnalysis() {
            vm.switchvmStandardAnalysis = !vm.switchvmStandardAnalysis;
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
                project_id: vm.project.id
            }, function (result) {
                vm.project.standard_items = result.data;
            });
        }

        function removeStandard(standard) {
            ProjectStandards
                .remove({
                    standardItemId: standard.id
                }, onProjectStandards);
        }


        function onProjectSkills() {
            ProjectSkills.all({
                project_id: vm.project.id
            }, function (result) {
                vm.project.skills = result.data;
            });
        }

        function removeSkill(skill) {
            ProjectSkills
                .remove({
                    project_id: project.id,
                    technique_id: skill.id
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