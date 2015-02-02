(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$filter', 'owner', 'Groups', 'Posts', 'User'];

    function PostsController($filter, owner, Groups, Posts, User) {

        var vm = this;

        vm.owner = owner;
        vm.send = send;
        vm.comment = comment;
        vm.getComments = getComments;

        getMessages();

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

        function comment(post){

            if(post.comment){
                Posts.add({
                    postId: post.id,
                    action: 'comments'
                }, {
                    comment: {
                        comment: post.comment
                    }
                }, function () {
                    delete post.comment;
                    delete post.scrollToComment;
                    post.scrollToComments = true;
                    getComments(post);
                });
            }

        }

        function getComments(post, page){
            delete post.comments;
            post.show = true;
            Posts.all({
                postId: post.id,
                action: 'comments',
                page: page || 1
            }, function (result) {
                delete post.focusin;
                delete post.scrollToComments;
                post.comments = result.data;
                post.meta = result.meta;
                angular.forEach(result.data.reverse(), function (comment) {
                    if (!post.comments.has(function (entry) {
                            return entry.id == comment.id;
                        })) {
                        post.comments.unshift(comment);
                    }
                });
            });
        }

    }

})();