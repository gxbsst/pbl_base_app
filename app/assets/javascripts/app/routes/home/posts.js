(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {

        $stateProvider
            .state('root.home.posts', {
                url: '^/posts',
                templateUrl: 'posts/index.html',
                controller: 'PostsIndexController as vm'
            })
            .state('root.home.post', {
                url: '^/posts/:postId',
                templateUrl: 'posts/show.html',
                controller: 'PostsShowController as vm'
            });

        /*
        PostsResolve.$inject = ['$q', '$http'];

        function PostsResolve($q, $http){
            var defer = $q.defer();
            Posts.all(function (result) {
                defer.resolve(result.data);
            });
            return defer.promise;
            //return $http.get('/posts');
        }
        */

    }

})();