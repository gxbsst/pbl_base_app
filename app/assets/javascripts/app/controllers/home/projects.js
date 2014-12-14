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
        .controller('HomeProjectCreateGaugesTypeController', HomeProjectCreateGaugesTypeController)
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
        vm.project.gaugeType = 2;
        vm.project.gaugeHead = '00110'.split('').map(function (v, i) {
            return {
                disabled: v == 0
            }
        });
        vm.setDisabled = setDisabled;
        vm.addRow = addRow;
        vm.addColumn = addColumn;
        vm.removeRow = removeRow;

        refresh();

        function setDisabled(disabled, $index){
            vm.project.gaugeHead[$index].disabled = disabled;
        }

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

        function removeRow(gauge){
            ProjectGauges.remove({
                projectId: project.id,
                gaugeId: gauge.id
            }, refresh);
        }

        function refresh(){
            vm.gauges = ProjectGauges.all({projectId: project.id});
        }
    }

    HomeProjectCreateGaugesTypeController.$inject = ['$scope', '$filter'];

    function HomeProjectCreateGaugesTypeController($scope, $filter){

        var vm = this;

        vm.gaugeTypes = $filter('i18n')('GAUGE_HEAD');

        vm.setGaugeType = setGaugeType;

        function setGaugeType(type){
            $scope.$config.project.gaugeType = type;
        }
    }

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project'];

    function HomeProjectCreateInfoController($state, Projects, project) {
        var vm = this;
        vm.project = project;
    }

    HomeProjectCreateScaffoldController.$inject = ['$state', 'Projects', 'project','Disciplines','Cycles'];

    function HomeProjectCreateScaffoldController($state, Projects, project,Disciplines,Cycles) {
        var vm = this;

        project.knowledges = project.knowledges || [];
        project.tasks=project.tasks || [];
        vm.project = project;
        vm.tempKnowledge='';
        vm.addKnowledge=addKnowledge;
        vm.removeKnowledge=removeKnowledge;
        vm.disciplines=[];
        Disciplines.all(function(data){
            vm.disciplines=data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });
        vm.cycles=[];
        //周期未使用异步调用
        vm.cycles=Cycles.all();

        vm.selectchange=selectchange;
        vm.chooseType=chooseType;
        vm.removeResource=removeResource;
        vm.addTask=addTask;


        vm.onBegin = onBegin;
        vm.onProgress = onProgress;
        vm.onSuccess = onSuccess;
        vm.onCompleted = onCompleted;
        vm.onError = onError;

        function onBegin(task){
            return function (files) {
                console.log(task);
                console.log(files);

                for(var i = 0 ;i<files.length;i++){
                    var file=files[i];
                    task.resources.splice(task.resources.length, 0, {
                        'id': null,
                        'title': file.name,
                        'ext':null,
                        'state':false
                    });
                }
            }
        }

        function onProgress(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }

        function onSuccess(task){
            return function (file) {
                var resource=task.resources.findOne(function(item){
                    return item.title == file.name;
                });
                console.log("onSuccess");
                console.log(file);
                resource.id=file.key;
                resource.ext=file.ext;
                resource.state=true;
            }
        }

        function onCompleted(a){
            return function (b) {
                console.log(a);
                console.log("onCompleted");
                console.log(b);
            }
        }

        function onError(a){
            return function (b) {
                console.log(a);
                console.log(b);
            }
        }


        function selectchange(){
            console.log(vm.project.tasks);
        }

        function chooseType(task,typeval){
            task.tasktype=typeval;
        }

        function addKnowledge(){
            vm.project.knowledges.push(vm.tempKnowledge);
        }
        function removeKnowledge(knowledge){
            var result = vm.project.knowledges.remove(function(item){
                return item == knowledge;
            });
        }
        function removeResource(task,resource){
            task.resources.remove(function(item){
                return item == resource;
            });
        }

        function addTask(){
            vm.project.tasks.splice(vm.project.tasks.length, 0, {resources:[]});
            console.log(vm.project.tasks);
        }
    }

})();
