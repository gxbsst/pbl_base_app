(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etGroup', etGroup);

    etGroup.$inject = ['$rootScope', '$filter', 'modalFactory'];

    function etGroup($rootScope, $filter, modalFactory) {

        return {
            require: 'etGroup',
            restrict: 'A',
            scope: true,
            link: etGroupLink,
            controller: angular.noop,
            controllerAs: 'modalConfig'
        };

        function etGroupLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                $id: scope.$id,
                $scope: scope
            });

            scope.$watch(attr.etGroup, function (group) {
                if (group) {
                    scope.group = group;
                    angular.extend(ctrl, {
                        title: $filter('group')(group),
                        controller: 'GroupCardController as vm',
                        src: 'groups/card.html'
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