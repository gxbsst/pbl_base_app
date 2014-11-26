(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngInputHelper', ngInputHelper);

    ngInputHelper.$inject = ['$compile'];

    function ngInputHelper($compile) {

        return {
            restrict: 'A',
            replace: true,
            scope: { label: '@' },
            template: '<span class="ng-input-helper"><label for="{{ $config.id }}" ng-if="label" ng-bind-html="label"></label><input /></span>',
            compile: ngInputHelperCompile
        };

        function ngInputHelperCompile(){

            return {
                pre: function (scope, element, attrs) {

                    attrs.$$element = element.find('input');

                    var name = attrs.name || attrs.ngModel.replace(/\./g, '_'),
                        id = attrs.id || name;

                    scope.$config = {
                        id: id,
                        name: name
                    };

                    angular.forEach(scope.$config, function (value, key) {
                        attrs.$set(key, value);
                    });
                }
            };

        }

    }

})();