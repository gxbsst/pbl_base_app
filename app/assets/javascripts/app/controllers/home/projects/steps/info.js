(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController);

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project','Cycles','Grades'];

    function HomeProjectCreateInfoController($state, Projects, project,Cycles,Grades) {
        var vm = this;
        vm.project = project;

        vm.cycles=[];
        vm.cycles=Cycles;

        vm.grades=[];
        vm.grades=Grades;
        console.log(vm.project);

        vm.onChange = function () {
            return updateTags;
        };

        function updateTags(tag, model) {
            Projects.update({
                projectId: vm.project.id
            }, {
                project: {tag_list: model}
            });
        }
    }


})();