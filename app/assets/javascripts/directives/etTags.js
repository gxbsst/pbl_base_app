(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    function etTags(){
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

    function etTagsLink(scope, element, attr){

        scope.$input = '';
        scope.$tags = [];
        scope.keypress = onKeypress;

        function onKeypress($event){
            if ($event.which == 13) {
                scope.addTag();
                $event.stopPropagation();
                $event.preventDefault();
                return false;
            }
        }

    }

})();