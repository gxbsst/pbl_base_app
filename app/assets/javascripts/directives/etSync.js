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

            element.on('focusin', function () {
                ctrl.$clone = ctrl.$ngModel;
            });

            element.on('focusout', function(){
                if(!ctrl.$disabled && ctrl.$service){
                    if (ctrl.$clone != ctrl.$ngModel) {
                        ctrl.$clone = ctrl.$ngModel;
                        var service = $injector.get(ctrl.$service);
                        service.update(ctrl);
                    }
                }
            });

            /*function toJSON(model, data, vm){
                if(typeof model == 'string'){
                    model = model.split('.');
                    vm && model.shift();
                }
                var key = model[0],
                    params = {};
                model.shift();
                params[key] = model.length ? toJSON(model, data) : data;
                return params;
            }*/
        }
    }

})();