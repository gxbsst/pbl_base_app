/**
 * Created by xi.chen on 2014/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('articleMoocsIndexController', articleMoocsIndexController)
    ;


    articleMoocsIndexController.$inject = ['articleMoocs', '$http'];

    function articleMoocsIndexController(articleMoocs) {
        var vm = this;
        articleMoocs.all(function(data){
            vm.articleMoocs =data.data;
        });
    }

//    PostsShowController.$inject = ['$stateParams', 'Posts'];
//
//    function PostsShowController($stateParams, Posts) {
//        var vm = this;
//        vm.post = Posts.get({postId: $stateParams.postId});
//    }

})();