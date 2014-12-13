(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    etTags.$inject = ['$timeout'];

    function etTags($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                ngModel: '=?',
                placeholder: '@'
            },
            templateUrl: 'directives/et-tags.html',
            link: etTagsLink
        };

        function etTagsLink(scope, element, attr) {

            var vm = this,
                onAdd = scope.$parent.$eval(attr.onAdd) || angular.noop,
                onRemove = scope.$parent.$eval(attr.onRemove) || angular.noop,
                onChange = scope.$parent.$eval(attr.onChange) || angular.noop;

            scope.$input = '';
            scope.$tags = [];
            scope.add = add;
            scope.remove = remove;
            scope.onChange = onChange;
            scope.onKeypress = onKeypress;

            scope.$watch(function () {
                return scope.ngModel;
            }, function (tags) {
                if (tags) {
                    scope.$tags = tags.split(',');
                }
            });

            element.on('click', function () {
                element.find('.et-tag-input').focus();
            });

            function onKeypress($event) {
                if ($event.which == 13) {
                    $event.preventDefault();
                    scope.add(scope.$input);
                }
            }

            function add(tag) {
                tag = tag.trim();
                if (tag && !exist(tag)) {
                    scope.$tags.push(tag);
                    scope.ngModel = scope.$tags.join(',');
                    onAdd.call(vm, tag, scope.ngModel);
                    onChange.call(vm, tag, scope.ngModel);
                }
                scope.$input = '';
            }

            function remove(tag, $event) {
                $event.stopPropagation();
                scope.ngModel = scope.$tags.remove(function (t) {
                    return t == tag;
                }).join(',');
                onRemove.call(vm, tag, scope.ngModel);
                onChange.call(vm, tag, scope.ngModel);
            }

            function exist(tag) {
                return scope.$tags.has(function (t) {
                    return t == tag;
                });
            }

        }
    }

})();