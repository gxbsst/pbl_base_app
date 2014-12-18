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
            switch(element.context.localName)
            {
                case "select":
                    //对象参数应绑定至ID
                    //example：{projectId:vm.project.id,project:{duration_unit:vm.project.duration_unit.id},$service:'Projects'}
                    element.on('change', modelUpdate);
                    break;

                //element 类型为input或其他
                case "input":
                default:

                    element.on('focusout', modelUpdate);
            }

            function modelUpdate(){
                if(!scope.$config.$disabled){
                    if (scope.model != scope.ngModel) {
                        scope.model = scope.ngModel;
                        var service = $injector.get(scope.$config.$service);
                        service.update(scope.$config);
                    }else{
                        console.log(scope.$config.$disabled);
                    }
                }
            }

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