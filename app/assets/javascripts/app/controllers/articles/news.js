/**
 * Created by xi.chen on 2014/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('articleNewsIndexController', articleNewsIndexController);

    articleNewsIndexController.$inject = ['articleNews', '$http'];

    function articleNewsIndexController(articleNews) {
        var vm = this;
        vm.articleNews = articleNews.all();
    }

//    PostsShowController.$inject = ['$stateParams', 'Posts'];
//
//    function PostsShowController($stateParams, Posts) {
//        var vm = this;
//        vm.post = Posts.get({postId: $stateParams.postId});
//    }

})();