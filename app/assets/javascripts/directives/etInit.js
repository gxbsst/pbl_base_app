(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etInit', etInit);

    function etInit(){
        return {
            restrict: 'A',
            priority: 450,
            compile: function() {
                return {
                    pre: function(scope, element, attrs) {
                        console.log(attrs.etInit)
                        angular.forEach(attrs.etInit.split(';'), function (param) {
                            console.log(param)
                            if(param){
                                var value = param.split('=')[1];
                                console.log(value)
                                value && scope.$watch(value, function () {
                                    scope.$eval(param);
                                });
                            }
                        });
                    }
                };
            }
        }
    }

})();