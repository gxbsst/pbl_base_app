(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngHelper', ngHelper);

    ngHelper.$inject = ['$compile', '$template'];

    function ngHelper($compile, $template) {

        return {
            restrict: 'A',
            compile: ngHelperLink
        };

        function ngHelperLink(){

            return {
                pre: function (scope, element, attrs) {
                    $template({
                        templateUrl: 'helpers/%1.html'.parse(attrs.ngHelper || element[0].tagName)
                    }).then(function (template) {

                        var newElement = angular.element(template),
                            serialized = (attrs.ngModel || '').serialize(),
                            id = attrs.id || serialized || 'helper-' + Date.now(),
                            name = attrs.name || serialized || id,
                            attachPoint = newElement.find('[data-attach-point]');

                        attrs.$$element = attachPoint.length ? attachPoint : newElement;

                        angular.forEach({
                            id: id,
                            name: name,
                            type: 'text'
                        }, function (value, key) {
                            attrs.$set(key, value);
                        });

                        angular.forEach(attrs.$attr, function (value, key) {
                            attrs.$set(value, attrs[key]);
                        });

                        attrs.$set('data-attach-point', null);
                        attrs.$set('ng-helper', null);

                        $compile(newElement)(scope);

                        element.replaceWith(newElement);

                    });
                }
            };

        }

    }

})();