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
                placeholder: '@',
                type: '@',
                classes: '@class'
            },
            templateUrl: 'directives/et-tags.html',
            link: etTagsLink
        };
    }

    function etTagsLink(scope, element, attr){

        scope.$input = '';
        scope.$tags = [];


    }

})();