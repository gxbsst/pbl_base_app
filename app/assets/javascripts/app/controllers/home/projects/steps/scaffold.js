(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateScaffoldController', HomeProjectCreateScaffoldController);

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

        function setAddTask(event, task) {
            vm.project.tasks.splice(vm.project.tasks.length, 0, task);
        }
    }

})();