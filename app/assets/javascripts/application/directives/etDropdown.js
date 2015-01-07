(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('dropdown', dropdown);

    function dropdown() {
        return {
            restrict: 'C',
            link: dropdownLink
        };

        function dropdownLink(scope, element, attr) {

            scope.$on('onDocumentClick', function(){
                element.removeClass('open');
            });

            element.on('click', function (event) {
                event.stopPropagation();
                element.addClass('open');
            });
        }
    }

})();