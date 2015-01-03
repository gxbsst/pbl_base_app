(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etAutocomplete', etAutocomplete);

    etAutocomplete.$inject = [];

    function etAutocomplete() {
        return {
            require: 'etAutocomplete',
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'directives/et-autocomplete.html',
            link: etAutocompleteLink,
            controller: angular.noop,
            controllerAs: 'autocompleteConfig'
        };

        function etAutocompleteLink(scope, element, attr, ctrl){

        }
    }

})();