(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('toolbarRecommendsController', toolbarRecommendsController)
    ;

    toolbarRecommendsController.$inject = ['toolbarRecommends', '$http'];

    function toolbarRecommendsController(toolbarRecommends) {
        var vm = this;
        toolbarRecommends.all(function(data){
            vm.toolbarRecommends =data.data;
        });
    }

})();