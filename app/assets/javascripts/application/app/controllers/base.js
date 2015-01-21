(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('BaseController', BaseController);

    BaseController.$inject = [
        '$scope', '$rootScope', '$document', '$q',
        'RESOURCE_TYPES', 'PATHS', 'QINIU', 'DURATION_UNITS', 'ROLES', 'DISCIPLINES', 'INTERESTS', 'GRADES',
        'Resources', 'Follows', 'Friends', 'Groups', 'MemberShips', 'Invitations',
        'TYPE_DEFIN', 'WORK_TYPES'
    ];

    function BaseController($scope, $rootScope, $document, $q,
                            RESOURCE_TYPES, PATHS, QINIU, DURATION_UNITS, ROLES, DISCIPLINES, INTERESTS, GRADES,
                            Resources, Follows, Friends, Groups, MemberShips, Invitations,
                            TYPE_DEFIN, WORK_TYPES) {

        $document.on('click', function () {
            $scope.$apply(function () {
                $rootScope.$broadcast('onDocumentClick');
            });
        });

        angular.extend($rootScope, {
            ROLES: ROLES,
            DISCIPLINES: DISCIPLINES,
            INTERESTS: INTERESTS,
            GRADES: GRADES,
            DURATION_UNITS: DURATION_UNITS,
            RESOURCE_TYPES: RESOURCE_TYPES,
            TYPE_DEFIN: TYPE_DEFIN,
            WORK_TYPES: WORK_TYPES,
            PATHS: PATHS,
            QINIU: QINIU,
            UPLOAD_HANDLES: {
                onBegin: onBegin,
                onProgress: onProgress,
                onSuccess: onSuccess,
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
                getInvitation: getInvitation,
                removeResource: removeResource
            },
            registerModals: {
                controller: 'RegisterController as vm',
                defaults: {
                    closeable: false,
                    weight: 100,
                    titleHeight: '60px',
                    bgColor: '#fcfcfc',
                    textColor: '#fff',
                    center: true
                },
                modals: [
                    {
                        title: '请选择您的角色',
                        closeable: true,
                        textColor: '#333',
                        //src: 'register/step-1.html'
                        src: 'register/student/step-9.html'
                    }, {
                        title: '请填写您的帐号信息',
                        closeable: true,
                        src: 'register/:type/step-2.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/step-3.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/:type/step-4.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/:type/step-5.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/:type/step-6.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/:type/step-7.html'
                    }, {
                        title: '欢迎开启项目学习之旅',
                        src: 'register/:type/step-8.html'
                    }
                ]
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

        function onSuccess(object) {
            return function (data) {
                delete object.$uploading;
            }
        }

        function onCompleted(object) {
            return function (data) {
                delete object.$uploading;
            }
        }

        function follow(user_id) {
            Follows.add({
                user_id: user_id
            }, function () {
                getFriends();
                getFollows();
            });
        }

        function unFollow(user_id) {
            var follow = $rootScope.follows.findOne(function (item) {
                return item.user_id == user_id;
            });
            if (follow) {
                Follows.remove({
                    followId: follow.id
                }, function () {
                    getFriends();
                    getFollows();
                });
            }
        }

        function isFriend(user_id) {
            return $rootScope.friends.has(function (user) {
                return user.id == user_id;
            });
        }

        function isFollowed(user_id) {
            return $rootScope.follows.has(function (follow) {
                return follow.user_id == user_id;
            });
        }

        function join(group_id) {
            Groups.add({
                groupId: group_id,
                action: 'member_ships'
            }, getMemberShips);
        }

        function leave(group_id, member_ship_id) {
            Groups.remove({
                groupId: group_id,
                action: 'member_ships',
                actionId: member_ship_id
            }, getMemberShips);
        }

        function getResource(resources, type, id) {
            return (resources || $scope.resources || []).findOne(function (item) {
                return (id && id == item.owner_id) && item.owner_type == type;
            });
        }

        function getResources(resources, type, id) {
            return (resources || $scope.resources || []).find(function (item) {
                return item.owner_id == id && item.owner_type == type;
            });
        }

        function getInvitation(ownerType, ownerId){
            var defer = $q.defer();
            Invitations.all({
                owner_type: ownerType,
                owner_id: ownerId
            }, function (result) {
                if(result.data && result.data[0]){
                    defer.resolve(result.data[0].code);
                }else{
                    defer.resolve(null);
                }
            });
            return defer.promise;
        }

        function removeResource(resourceId, callback) {
            Resources.remove({
                resourceId: resourceId
            }, callback || angular.noop);
        }

        function getFriends() {
            Friends.get(function (result) {
                $rootScope.friends = result.data;
            });
        }

        function getFollows() {
            Follows.get(function (result) {
                $rootScope.follows = result.data;
            });
        }

        function getMemberShips() {
            MemberShips.get({
                namespace: 'user'
            }, function (result) {
                $rootScope.member_ships = result.data;
            });
        }

    }

})();