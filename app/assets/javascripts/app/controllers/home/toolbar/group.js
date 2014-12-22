/**
 * Created by xi.chen on 2014/12/8.
 */

(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('toolbarGroupController', toolbarGroupController)
    ;

    toolbarGroupController.$inject = ['toolbarGroup', '$http'];

    function toolbarGroupController(toolbarGroup) {
        var vm = this;
        toolbarGroup.all(function(data){
            vm.toolbarGroup =data.data;
        });
    }

})();