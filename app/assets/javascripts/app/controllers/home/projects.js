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

        //vm.addProject = function() {
        //    Projects.add({}, function(projectID){
        //        $state.go('base.home.projects.create.design({pblId:projectID.pbl_id})');
        //    });
        //};

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

    HomeProjectCreateDesignController.$inject = ['Projects','project'];

    function HomeProjectCreateDesignController(Projects,project) {
        var vm = this;
        vm.project =project;

    }

})();
