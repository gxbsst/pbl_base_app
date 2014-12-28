(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$rootScope', '$document', 'RESOURCE_TYPES', 'QINIU', 'DURATION_UNITS', 'GRADES', 'Follows', 'Friends'];

    function BaseController($scope, $rootScope, $document, RESOURCE_TYPES, QINIU, DURATION_UNITS, GRADES, Follows, Friends) {

        $document.on('click', function () {
            $scope.$apply(function () {
                $rootScope.$broadcast('onDocumentClick');
            });
        });

        angular.extend($rootScope, {
            GRADES: GRADES,
            DURATION_UNITS: DURATION_UNITS,
            RESOURCE_TYPES: RESOURCE_TYPES,
            QINIU: QINIU,
            UPLOAD_HANDLES: {
                onBegin: onBegin,
                onProgress: onProgress,
                onCompleted: onCompleted
            },
            HANDLES: {
                follow: follow,
                unFollow: unFollow,
                isFriend: isFriend,
                isFollowed: isFollowed
            }
        });

        getFollows();

        function onBegin(object) {
            return function (data) {
                object.$uploading = true;
            }
        }

        function onProgress(object) {
            return function (evt) {
                object.$progress = Math.round(evt.loaded / evt.total * 100);
            }
        }

        function onCompleted(object) {
            return function (data) {
                delete object.$uploading;
            }
        }

        function follow(user_id){
            Follows.add({
                user_id: user_id
            }, function () {
                getFriends();
                getFollows();
            });
        }

        function unFollow(user_id){
            var follow = $rootScope.follows.findOne(function (item) {
                return item.user_id == user_id;
            });
            if(follow){
                Follows.remove({
                    followId: follow.id
                }, function () {
                    getFriends();
                    getFollows();
                });
            }
        }

        function isFriend(user_id){
            return $rootScope.friends.has(function (user) {
                return user.id == user_id;
            });
        }

        function isFollowed(user_id){
            return $rootScope.follows.has(function (follow) {
                return follow.user_id == user_id;
            });
        }

        function getFriends(){
            Friends.get(function (result) {
                $rootScope.friends = result.data;
            });
        }

        function getFollows(){
            Follows.get(function (result) {
                $rootScope.follows = result.data;
            });
        }

    }

})();