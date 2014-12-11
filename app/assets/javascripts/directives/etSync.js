(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etSync', etSync);

    etSync.$inject = ['$injector'];

    function etSync($injector){
        return {
            restrict: 'A',
            scope: true,
            link: etSyncLink
        };

        function etSyncLink(scope, element, attr){
            scope.$watch(attr.etSync, function (config) {
                scope.$config = config;
            }, true);
            scope.$watch(attr.ngModel, function (ngModel) {
                scope.ngModel = ngModel;
            });
            element.on('focusin', function () {
                scope.model = scope.ngModel;
            });
            element.on('focusout', function () {
                if (scope.model != scope.ngModel) {
                    scope.model = scope.ngModel;
                    var service = $injector.get(scope.$config.$service);
                    service.update(scope.$config);
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