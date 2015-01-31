(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['owner', 'User'];

    function PostsController(owner, User) {

        var vm = this;
        vm.owner = owner;

        vm.send = send;

        function send(){



        }

        function getMessages(){
            if(owner.type == 'Group'){

            }
        }

    }

})();