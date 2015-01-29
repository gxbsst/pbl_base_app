(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['owner'];

    function PostsController(owner) {
        var vm = this;
        vm.owner = owner;
    }

})();