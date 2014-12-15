(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectCreateInfoController', HomeProjectCreateInfoController);

    HomeProjectCreateInfoController.$inject = ['$state', 'Projects', 'project','Cycles'];

    function HomeProjectCreateInfoController($state, Projects, project,Cycles) {
        var vm = this;
        vm.project = project;

        vm.cycles=[];
        //周期未使用异步调用
        vm.cycles=Cycles;


        vm.onChange = function () {
            return updateTags;
        };

        function updateTags(tag, model) {
            Projects.update({
                projectId: vm.project.id
            }, {
                project: {tags: model}
            });
        }
    }


})();