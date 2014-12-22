/**
 * Created by xi.chen on 2014/12/8.
 */

(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('toolbarUserController', toolbarUserController)
    ;

    toolbarUserController.$inject = ['toolbarUser', '$http'];

    function toolbarUserController(toolbarUser) {
        var vm = this;
        toolbarUser.all(function(data){
            vm.toolbarUser =data.data;
        });
    }

})();