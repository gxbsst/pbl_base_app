(function() {
    'use strict';

    angular
        .extend(String.prototype, {
            '$parseConfig': function(scope){

                scope.config = {};

                angular.forEach(this.split(';'), function(config){
                    config = config.split('=');
                    scope.$watch(config[1], function (value) {
                        scope.config[config[0]] = value;
                    });
                });

                return scope.config;

            }
        });

})();