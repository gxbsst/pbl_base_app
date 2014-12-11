(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    function etTags() {
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
    }

    function etTagsLink(scope, element, attr) {

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

        function setFocus() {
            element.find('.et-tag-input').focus();
        }

        function add(tag) {
            if(!exist(tag)){
                scope.$tags.push(tag);
                scope.ngModel = scope.$tags.join(',');
            }
            scope.$input = '';
        }

        function remove(tag){
            scope.$tags.remove(function (t) {
                return t == tag;
            });
        }

        function exist(tag) {
            return scope.$tags.has(function (t) {
                return t == tag;
            });
        }

    }

})();