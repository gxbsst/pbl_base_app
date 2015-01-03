(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTips', etTips);

    etTips.$inject = ['$document', '$timeout', '$template', '$compile', 'utils'];

    function etTips($document, $timeout, $template, $compile, utils) {

        var body = $document.find('body');

        return {
            require: 'etTips',
            restrict: 'A',
            scope: true,
            link: etTipsLink,
            controller: angular.noop,
            controllerAs: 'tipsConfig'
        };

        function etTipsLink(scope, element, attr, ctrl) {

            ctrl.templateUrl = 'directives/et-tips.html';
            ctrl.delay = 0;
            ctrl.black = true;
            ctrl.right = false;
            ctrl.resize = resize;
            utils.params(scope, attr.etTips, ctrl, 'content');

            var enterTimer, leaveTimer, tips;

            element
                .on('mouseenter', mouseEnter)
                .on('mouseleave', mouseLeave);

            scope.$on('$destroy', function () {
                tips && tips.remove();
            });

            function mouseEnter() {

                if (ctrl.disabled)return;

                $timeout.cancel(enterTimer);
                $timeout.cancel(leaveTimer);
                leaveTimer = null;

                if (!tips) {
                    enterTimer = $timeout(function () {
                        $template(ctrl)
                            .then(function (template) {
                                tips = $compile(angular.element(template))(scope);
                                tips.css({
                                    top: element.offset().top + element.outerHeight() + 12,
                                    left: element.offset().left + (element.outerWidth() / 2)
                                });
                                if (ctrl.delay) {
                                    tips
                                        .on('mouseenter', function () {
                                            if (leaveTimer) {
                                                $timeout.cancel(leaveTimer);
                                                leaveTimer = null;
                                            }
                                        })
                                        .on('mouseleave', mouseLeave);
                                }
                                body.append(tips);
                            });
                    }, ctrl.delay);
                }

            }

            function mouseLeave() {

                if (ctrl.disabled)return;

                $timeout.cancel(enterTimer);
                if (tips) {
                    leaveTimer = $timeout(function () {
                        tips.remove();
                        tips = leaveTimer = null;
                    }, ctrl.delay);
                }
            }

            function resize() {
                tips && tips.css({
                    marginLeft: -tips.outerWidth() / 2
                });
            }

        }

    }

})();