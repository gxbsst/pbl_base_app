(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('ngTips', ngTips);

    ngTips.$inject = ['$document', '$timeout', '$template', '$compile'];

    function ngTips($document, $timeout, $template, $compile) {

        var body = $document.find('body');

        return {
            restrict: 'A',
            scope: true,
            link: ngTipsLink
        };

        function ngTipsLink(scope, element, attr) {

            scope.config = angular.extend({
                templateUrl: 'directives/ng-tips.html'
            }, attr.ngTips.$parseConfig(scope));

            var enterTimer, leaveTimer, tips;

            element
                .on('mouseenter', mouseEnter)
                .on('mouseleave', mouseLeave);

            function mouseEnter() {
                $timeout.cancel(enterTimer);
                $timeout.cancel(leaveTimer);
                leaveTimer = null;

                if(!tips){
                    enterTimer = $timeout(function () {
                        $template(scope.config)
                            .then(function (template) {
                                tips = $compile(angular.element(template))(scope);
                                tips
                                    .css({
                                        top: element.offset().top + element.outerHeight() + 10,
                                        left: element.offset().left
                                    })
                                    .on('mouseenter', function () {
                                        if (leaveTimer) {
                                            $timeout.cancel(leaveTimer);
                                            leaveTimer = null;
                                        }
                                    })
                                    .on('mouseleave', mouseLeave);
                                body.append(tips);
                            });
                    }, 150);
                }

            }

            function mouseLeave() {
                $timeout.cancel(enterTimer);
                if(tips){
                    leaveTimer = $timeout(function () {
                        tips.remove();
                        tips = leaveTimer = null;
                    }, 150);
                }
            }

        }

    }

})();