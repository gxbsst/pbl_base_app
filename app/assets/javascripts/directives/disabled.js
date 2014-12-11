(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('disabled', disabled);

    function disabled(){
        return {
            restrict: 'C',
            link: disabledLink
        };
    }

    function disabledLink(scope, element, attr){

        var mask = angular.element('<div class="mask"></div>');
        mask.on('click', function (event) {
            event.stopPropagation();
        });

        element.append(mask);

    }

})();