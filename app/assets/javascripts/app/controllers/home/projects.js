(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeProjectIndexController', HomeProjectIndexController)
        .controller('PBLMapController', PBLMapController)
        .controller('PBLGuideController', PBLGuideController)
        .controller('HomeProjectCreateDesignController', HomeProjectCreateDesignController)

    HomeProjectIndexController.$inject = ['Projects'];

    function HomeProjectIndexController(Projects) {
        var vm = this;
        Projects.all({}, function(result){
            vm.projects =result.data;
        });

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

    HomeProjectCreateDesignController.$inject = ['$state','Projects','project'];

    function HomeProjectCreateDesignController($state,Projects,project) {
        var vm = this;
        vm.project = project;
        vm.saveProject = function() {
            saveProject(Projects,project);
        };
        vm.goRubrics= function(){
            saveProject(Projects,project);
            $state.go('base.home.projects.create.rubrics', {projectId:project.id});
        }
        vm.deleteCurriculumStandard=function(id){
            project.curriculum_standards.find(id);
        }
    }
    function saveProject(Projects,project){
        Projects.update({projectId: project.id},{project: project}, function (result) {
            //console.log(result.result);
        });
    }
})();
