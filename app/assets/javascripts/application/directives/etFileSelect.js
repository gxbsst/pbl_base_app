(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etFileSelect', etFileSelect);

    etFileSelect.$inject = ['$parse'];

    function etFileSelect($parse){
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.on('change', function (event) {
                    var fn = $parse(attr.etFileSelect);
                    fn(scope, {$event: event, $files: this.files});
                });
            }
        }
    }

})();