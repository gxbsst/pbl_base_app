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
            priority: 9999,
            link: etConfigLink,
            controller: angular.noop,
            controllerAs: 'etConfig'
        };

        function etConfigLink(scope, element, attr, ctrl) {
            utils.params(scope, attr.etConfig, ctrl);
        }
    }

})();