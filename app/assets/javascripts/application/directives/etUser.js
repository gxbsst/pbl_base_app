(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etUser', etUser);

    etUser.$inject = ['$rootScope', '$filter', 'modalFactory'];

    function etUser($rootScope, $filter, modalFactory) {

        return {
            require: 'etUser',
            restrict: 'A',
            scope: true,
            link: etUserLink,
            controller: angular.noop,
            controllerAs: 'modalConfig'
        };

        function etUserLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                $id: scope.$id,
                $scope: scope
            });

            scope.$watch(attr.etUser, function (user) {
                if (user) {
                    scope.user = user;
                    angular.extend(ctrl, {
                        title: $filter('name')(user) + '的名片',
                        controller: 'UserCardController as vm',
                        src: 'users/card.html'
                    });
                }
            }, true);

            element.on('click', function () {
                modalFactory(ctrl).then(function (modal) {
                    $rootScope.modals[ctrl.$id] = modal;
                });
            });

        }
    }

})();