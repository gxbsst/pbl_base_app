(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTalk', etTalk);

    etTalk.$inject = ['$rootScope', '$filter', 'modalFactory', 'Users'];

    function etTalk($rootScope, $filter, modalFactory, Users) {

        return {
            require: 'etTalk',
            restrict: 'A',
            scope: true,
            link: etTalkLink,
            controller: angular.noop,
            controllerAs: 'modalConfig'
        };

        function etTalkLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                $id: scope.$id,
                $scope: scope,
                controller: 'TalkController as vm',
                src: 'friends/talk.html'
            });

            element.on('click', function () {
                scope.$watch(attr.etTalk, function (user) {
                    if (user) {
                        if(typeof user == 'string'){
                            Users.get({
                                userId: user
                            }, function (result) {
                                scope.user = result.data;
                                ctrl.title = '正在与' + $filter('name')(scope.user) + '对话中...';
                            });
                        }else{
                            scope.user = user;
                            ctrl.title = '正在与' + $filter('name')(scope.user) + '对话中...';
                        }
                    }
                }, true);
                modalFactory(ctrl).then(function (modal) {
                    $rootScope.modals[ctrl.$id] = modal;
                });
            });

        }
    }

})();