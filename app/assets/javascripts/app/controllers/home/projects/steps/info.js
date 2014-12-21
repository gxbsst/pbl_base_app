(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController);

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project', 'Cycles', 'Grades'];

    function HomeProjectCreateInfoController($state, Projects, project, Cycles, Grades) {

        var vm = this;
        project.cover = project.cover || {};
        vm.project = project;
        vm.onCoverUploadBegin = onCoverUploadBegin;
        vm.onCoverUploadSuccess = onCoverUploadSuccess;

        function onCoverUploadBegin(){
            return function () {
                project.cover.$uploading = true;
            }
        }

        function onCoverUploadSuccess(){
            return function (data) {
                project.cover.key = data.key;
                delete project.cover.$uploading;
            }
        }

        vm.cycles = [];
        vm.cycles = Cycles;

        //var isexist;
        //isexist=vm.cycles.findOne(function(item){
        //    return item.title == vm.project.duration_unit;
        //});
        //if(isexist===null){
        //    console.log("duration_unit is null");
        //    vm.project.duration_unit=vm.cycles[0].id;
        //}

        vm.grades = Grades;

        //isexist=vm.grades.findOne(function(item){
        //    return item.title == vm.project.grade;
        //});
        //if(isexist===null){
        //    console.log("grade is null");
        //    vm.project.grade=vm.grades[0].id;
        //}
        vm.location1 = [];

        /*Location1.all(function (data) {
            vm.location1 = [];
            console.log(data);
            vm.location1 = data.data;
            //vm.project.location_id=selectisexist(vm.project.location_id,vm.location);
            //
            //Projects.update({
            //    projectId: vm.project.id
            //}, {
            //    project: {location_id:vm.project.location_id}
            //});
        });*/

        vm.onChange = function () {
            return updateTags;
        };


        //vm.project.duration_unit=selectisexist(vm.project.duration_unit,vm.cycles);
        //vm.project.grade=selectisexist(vm.project.grade,vm.grades);
        //
        //Projects.update({
        //    projectId: vm.project.id
        //}, {
        //    project: {grade:vm.project.grade,duration_unit:vm.project.duration_unit}
        //});


        function selectisexist(obj, array) {
            var isexist;
            isexist = array.findOne(function (item) {
                return item.id == obj;
            });
            if (isexist === null) {
                return array[0].id;
                console.log("find!!");
            } else {
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