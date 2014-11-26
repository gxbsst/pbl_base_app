(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngInput', ngInput);

    ngInput.$inject = ['$timeout'];

    function ngInput($timeout) {

        return {
            restrict: 'A',
            scope: {
                ngInput: '='
            },
            replace: true,
            template: '<span class="ng-input"><label for="{{ $config.name }}" ng-if="$config.label" ng-bind-html="$config.label"></label><input type="{{ $config.type }}" name="{{ $config.name }}" id="{{ $config.name }}" ng-model="ngInput" placeholder="{{ $config.placeholder }}" /></span>',
            link: ngInputLink
        };

        function ngInputLink(scope, element, attr) {

            attr.ngConfig.$parseConfig(scope);

            $timeout(function () {
                scope.$config = angular.extend({
                    name: scope.$config.name || attr.ngInput.replace(/\./g, '_'),
                    type: 'text'
                }, scope.$config);
            });

        }

    }

})();