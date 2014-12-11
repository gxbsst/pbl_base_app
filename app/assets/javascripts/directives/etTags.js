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

            var inputElement = element.find('.et-tag-input');

            scope.$input = '';
            scope.$tags = [];
            scope.add = add;
            scope.remove = remove;
            scope.onKeypress = onKeypress;
            scope.setFocus = setFocus;

            scope.$watch(function () {
                return scope.ngModel;
            }, function (tags) {
                if(tags){
                    scope.$tags = tags.split(',');
                }
            });

            function onKeypress($event) {
                if ($event.which == 13) {
                    $event.preventDefault();
                    scope.add(scope.$input);
                }
            }

            inputElement.on('focusout', function () {
                element.trigger('focusout');
            });

            function setFocus() {
                inputElement.focus();
            }

            function add(tag) {
                tag = tag.trim();
                if(tag && !exist(tag)){
                    scope.$tags.push(tag);
                    scope.ngModel = scope.$tags.join(',');
                }
                scope.$input = '';
            }

            function remove(tag,$event){
                $event.stopPropagation();
                scope.ngModel = scope.$tags.remove(function (t) {
                    return t == tag;
                }).join(',');
                setFocus();
            }

            function exist(tag) {
                return scope.$tags.has(function (t) {
                    return t == tag;
                });
            }

        }
    }

})();