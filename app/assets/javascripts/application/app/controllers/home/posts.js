(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['owner', 'Groups', 'User'];

    function PostsController(owner, Groups, User) {

        var vm = this;

        vm.owner = owner;
        vm.send = send;

        getMessages();

        function send() {

            switch(owner.type){
                case 'Group':
                    Groups.add({
                        groupId: owner.data.id,
                        action: 'posts'
                    }, {
                        post: vm.post
                    }, getMessages);
                    break;
                case 'User':
                    User.add({
                        action: 'posts'
                    }, {
                        post: vm.post
                    }, getMessages);
                    break;
            }

        }

        function getMessages() {

            switch(owner.type){
                case 'Group':
                    Groups.all({
                        groupId: owner.data.id,
                        action: 'posts'
                    }, callback);
                    break;
                case 'User':
                    User.all({
                        action: 'messages'
                    }, callback);
                    break;
            }

            function callback(result){
                delete vm.post;
                vm.messages = vm.messages || [];
                angular.forEach(result.data.reverse(), function (message) {
                    if (!vm.messages.has(function (entry) {
                            return entry.id == message.id;
                        })) {
                        vm.messages.unshift(message);
                    }
                });
            }

        }

    }

})();