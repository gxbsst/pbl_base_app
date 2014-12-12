(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectIndexController', HomeProjectIndexController)
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('HomeProjectCreateController', HomeProjectCreateController)
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController)
        .controller('HomeProjectCreateGaugesController', HomeProjectCreateGaugesController)
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController)
        .controller('HomeProjectCreateScaffoldController', HomeProjectCreateScaffoldController)
    ;


    HomeProjectIndexController.$inject = ['Projects'];

    function HomeProjectIndexController(Projects) {
        var vm = this;
        vm.projects = Projects.all();
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

    HomeProjectCreateController.$inject = ['$state', '$scope', 'project'];

    function HomeProjectCreateController($state, $scope, project) {

        $scope.next = next;

        function next(step) {
            $state.go('base.home.projects.create.' + step, {projectId: project.id});
        }
    }

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
            Projectskills
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

    HomeProjectCreateGaugesController.$inject = ['$state', 'ProjectGauges', 'project'];

    function HomeProjectCreateGaugesController($state, ProjectGauges, project) {

        var vm = this;
        vm.project = project;
        vm.columns = [{name: '对应技能'}, {name: '量规标准'}, {name: '权重'}, {name: '不及格'}, {name: '及格'}, {name: '一般'}, {name: '良好'}, {name: '优秀'}];
        vm.gauges = ProjectGauges.all({projectId: project.id});
        vm.addRow = addRow;
        vm.addColumn = addColumn;

        function addRow(content, level) {
            ProjectGauges.add({
                projectId: project.id,
                gauge: {
                    content: content,
                    level: level
                }
            }, function () {

            });
        }

        function addColumn() {

        }
    }

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project'];

    function HomeProjectCreateInfoController($state, Projects, project) {
        var vm = this;
        vm.project = project;
    }

    HomeProjectCreateScaffoldController.$inject = ['$state', 'Projects', 'project'];

    function HomeProjectCreateScaffoldController($state, Projects, project) {
        var vm = this;

        project.knowledges = project.knowledges || [];
        vm.project = project;
        vm.tempKnowledge='';
        vm.addKnowledge=addKnowledge;
        vm.removeKnowledge=removeKnowledge;

        console.log(vm.project.tasks);

        function addKnowledge(){
            vm.project.knowledges.push(vm.tempKnowledge);
        }
        function removeKnowledge(knowledge){
            var result = vm.project.knowledges.remove(function(item){
                return item == knowledge;
            });
            console.log(result);
        }
    }

})();
