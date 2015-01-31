(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etScrolltop', etScrolltop);

    etScrolltop.$inject = ['$document', '$timeout', 'utils'];

    function etScrolltop($document, $timeout, utils) {
        return {
            require: 'etScrolltop',
            restrict: 'A',
            scope: true,
            link: etScrolltopLink,
            controller: angular.noop,
            controllerAs: 'scrolltopConfig'
        };

        function etScrolltopLink(scope, element, attr, ctrl) {
            $(window).scroll(function() {
                if($(window).scrollTop()>540){
                    $(element).addClass("hasback");
                }else{
                    $(element).removeClass("hasback");
                }
            });
        }
    }

})();