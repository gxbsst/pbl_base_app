(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateScaffoldController', HomeProjectCreateScaffoldController);

    HomeProjectCreateScaffoldController.$inject = ['$scope','$state', 'Projects', 'project','Disciplines','Cycles','Knowledges'];

    function HomeProjectCreateScaffoldController($scope,$state, Projects, project,Disciplines,Cycles,Knowledges) {
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
        vm.cycles=Cycles;

        vm.selectchange=selectchange;
        vm.chooseType=chooseType;
        vm.removeResource=removeResource;

        vm.showProjectInfo = showProjectInfo;

        $scope.$on('setAddTask', setAddTask);

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

        function showProjectInfo() {
            vm.switchProjectInfo = !vm.switchProjectInfo;
        }

        function addKnowledge(){
            //vm.project.knowledges.push(vm.tempKnowledge);
            Knowledges.add({"knowledge":{"project_id":vm.project.id,"description":vm.tempKnowledge}},function(){
                vm.tempKnowledge="";
                vm.project.knowledges = Knowledges.all({project_id: vm.project.id});
            });
        }
        function removeKnowledge(knowledge){
            //vm.project.knowledges.remove(function(item){
            //    return item == knowledge;
            //});
            Knowledges.remove({knowledgeId:knowledge.id},function(){
                vm.project.knowledges = Knowledges.all({project_id: vm.project.id});
            });
        }
        function removeResource(task,resource){
            task.resources.remove(function(item){
                return item == resource;
            });
        }

        function setAddTask(event, task) {
            vm.project.tasks.splice(vm.project.tasks.length, 0, task);
        }
    }

})();