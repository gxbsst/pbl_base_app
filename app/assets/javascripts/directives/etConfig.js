(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etConfig', etConfig);

    etConfig.$inject = ['utils'];

    function etConfig(utils) {
        return {
            require: 'etConfig',
            restrict: 'A',
            priority: 1000,
            link: etConfigLink,
            controller: angular.noop
        };

        function etConfigLink(scope, element, attr, ctrl) {
            utils.params(scope, attr.etConfig, ctrl);
        }
    }

})();