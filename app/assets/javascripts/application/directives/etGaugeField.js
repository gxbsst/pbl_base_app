(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etGaugeField', etGaugeField);

    etGaugeField.$inject = ['$timeout'];

    function etGaugeField($timeout) {
        return {
            restrict: 'A',
            link: etGaugeFieldLink
        };

        function etGaugeFieldLink(scope, element, attr) {

            var textarea = element.find('textarea'),
                model = textarea.attr('ng-model');

            element.on('click', function () {
                textarea.focus();
            });
            textarea.on('input', setHeight);
            scope.$watch(model, setHeight);
            $timeout(setHeight);

            function setHeight() {
                textarea.height(0).height(textarea[0].scrollHeight - parseInt(textarea.css('paddingTop')) - parseInt(textarea.css('paddingBottom')));
            }

        }
    }

})();