(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('toolbarHistoriesController', toolbarHistoriesController)
    ;

    toolbarHistoriesController.$inject = ['toolbarHistories', '$http'];

    function toolbarHistoriesController(toolbarHistories) {
        var vm = this;
        toolbarHistories.all(function(data){
            vm.toolbarHistories =data.data;
        });
    }

})();