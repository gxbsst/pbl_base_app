(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('PostsIndexController', PostsIndexController)
        .controller('PostsShowController', PostsShowController);

    PostsIndexController.$inject = ['Posts'];

    function PostsIndexController(Posts) {
        var vm = this;
        vm.posts = Posts.all();
    }

    PostsShowController.$inject = ['$stateParams', 'Posts'];

    function PostsShowController($stateParams, Posts) {
        var vm = this;
        vm.post = Posts.get({postId: $stateParams.postId});
    }

})();