(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ToolbarGroupsController', ToolbarGroupsController);

    ToolbarGroupsController.$inject = ['Groups'];

    function ToolbarGroupsController(Groups) {
        var vm = this;
        Groups.all(function (result) {
            vm.groups = result.data;
        });
    }

})();