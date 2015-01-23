(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etExec', etExec);

    etExec.$inject = ['$parse'];

    function etExec($parse){
        return {
            restrict: 'A',
            priority: 400,
            compile: function() {
                return {
                    pre: function(scope, element, attrs) {
                        angular.forEach(attrs.etExec.split(';'), function (param) {
                            if(param){
                                var fn = $parse(param);
                                fn(scope);
                            }
                        });
                    }
                };
            }
        }
    }

})();