(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController);

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project','Cycles','Grades','Location'];

    function HomeProjectCreateInfoController($state, Projects, project,Cycles,Grades,Location) {
        var vm = this;
        vm.project = project;

        vm.cycles=[];
        vm.cycles=Cycles;

        //var isexist;
        //isexist=vm.cycles.findOne(function(item){
        //    return item.title == vm.project.duration_unit;
        //});
        //if(isexist===null){
        //    console.log("duration_unit is null");
        //    vm.project.duration_unit=vm.cycles[0].id;
        //}

        vm.grades=[];
        vm.grades=Grades;

        //isexist=vm.grades.findOne(function(item){
        //    return item.title == vm.project.grade;
        //});
        //if(isexist===null){
        //    console.log("grade is null");
        //    vm.project.grade=vm.grades[0].id;
        //}



        vm.location=[];
        Location.all(function(data){
            vm.location=data.data;
        });

        console.log(vm.project);

        vm.onChange = function () {
            return updateTags;
        };


        vm.project.duration_unit=selectisexist(vm.project.duration_unit,vm.cycles);


        function selectisexist(obj,array){
            var isexist;
            isexist=array.findOne(function(item){
                return item.title == obj;
            });
            if(isexist===null){
                return array[0].id;
                console.log("find!!");
            }else{
                return obj
            }
        }
        function updateTags(tag, model) {
            Projects.update({
                projectId: vm.project.id
            }, {
                project: {tag_list: model}
            });
        }
    }


})();