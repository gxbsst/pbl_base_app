(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$rootScope', '$document', 'RESOURCE_TYPES', 'PATHS', 'QINIU', 'DURATION_UNITS', 'GRADES', 'Resources', 'Follows', 'Friends', 'Groups', 'MemberShips'];

    function BaseController($scope, $rootScope, $document, RESOURCE_TYPES, PATHS, QINIU, DURATION_UNITS, GRADES, Resources, Follows, Friends, Groups, MemberShips) {

        $document.on('click', function () {
            $scope.$apply(function () {
                $rootScope.$broadcast('onDocumentClick');
            });
        });

        angular.extend($rootScope, {
            GRADES: GRADES,
            DURATION_UNITS: DURATION_UNITS,
            RESOURCE_TYPES: RESOURCE_TYPES,
            PATHS: PATHS,
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
                isFollowed: isFollowed,
                join: join,
                leave: leave,
                getResource: getResource,
                getResources: getResources,
                removeResource: removeResource
            }
        });

        getFollows();
        getMemberShips();

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

        function join(group_id){
            Groups.add({
                groupId: group_id,
                action: 'member_ships'
            }, getMemberShips);
        }

        function leave(group_id, member_ship_id){
            Groups.remove({
                groupId: group_id,
                action: 'member_ships',
                actionId: member_ship_id
            }, getMemberShips);
        }

        function getResource(resources, type, id){
            return (resources || $scope.resources || []).findOne(function (item) {
                return (id && id == item.owner_id) && item.owner_type == type;
            });
        }

        function getResources(resources, type, id){
            return (resources || $scope.resources || []).find(function (item) {
                return item.owner_id == id && item.owner_type == type;
            });
        }

        function removeResource(resourceId, callback){
            Resources.remove({
                resourceId: resourceId
            }, callback || angular.noop);
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

        function getMemberShips(){
            MemberShips.get({
                namespace: 'user'
            }, function (result) {
                $rootScope.member_ships = result.data;
            });
        }

    }

})();