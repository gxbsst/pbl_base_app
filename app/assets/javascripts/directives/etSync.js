(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etSync', etSync);

    etSync.$inject = ['$injector'];

    function etSync($injector){
        return {
            require: 'etSync',
            restrict: 'A',
            scope: true,
            link: etSyncLink,
            controller: angular.noop,
            controllerAs: 'syncConfig'
        };

        function etSyncLink(scope, element, attr, ctrl){

            if(!attr.etSync)return;

            scope.$watch(attr.etSync, function (config) {
                config && angular.extend(ctrl, config);
            }, true);

            scope.$watch(attr.ngModel, function (ngModel) {
                ctrl.$ngModel = ngModel;
            });

            switch(attr.type){
                case 'checkbox':
                case 'radio':
                    element.on('click', save);
                    break;
                default:
                    element.on('focusin', function () {
                        ctrl.$clone = ctrl.$ngModel;
                    });
                    element.on('focusout', save);
                    break;
            }

            function save(){
                if(!ctrl.$disabled && ctrl.$service){
                    if (ctrl.$clone != ctrl.$ngModel) {
                        ctrl.$clone = ctrl.$ngModel;
                        var service = $injector.get(ctrl.$service);
                        service.update(ctrl);
                    }
                }
            }
        }
    }

})();