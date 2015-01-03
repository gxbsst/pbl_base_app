(function () {
    'use strict';

    angular
        .module('app.modal', ['app.factories'])
        .provider('modalConfig', modalConfig)
        .factory('modalFactory', modalFactory)
        .directive('etModal', etModal);

    function modalConfig() {

        this.zIndex = 10000;
        this.count = 0;
        this.modals = [];
        this.$get = function () {
            return {
                config: this
            };
        };

    }

    modalFactory.$inject = ['$document', '$compile', '$controller', '$rootScope', '$q', '$timeout', '$template', 'modalConfig'];

    function modalFactory($document, $compile, $controller, $rootScope, $q, $timeout, $template, modalConfig) {

        $rootScope.modals = {};

        $rootScope.$on('$stateChangeStart', function () {
            angular.forEach($rootScope.modals, function (modal) {
                modal.scope.destroyModal();
            });
        });

        var body = $document.find('body');

        return function showModal(config) {

            var defer = $q.defer();

            $template(config).then(function (template) {

                var controller = config.controller,
                    childScope = (config.$scope || $rootScope).$new(),
                    inject = angular.extend({
                        $scope: childScope
                    }, config.inject || {}),
                    modalController = controller ? $controller(controller, inject) : null,
                    modalElement = $compile(angular.element(template))(childScope),
                    container = modalElement.find('.et-modal-container');

                config.modalResize = function () {
                    container.css({
                        marginLeft: -container.outerWidth() / 2,
                        marginTop: -container.outerHeight() / 2
                    });
                };

                childScope.destroyModal = function () {
                    delete $rootScope.modals[config.$scope.$id];
                    body.removeClass('disable-scroll');
                    childScope.$destroy();
                    modalElement.remove();
                };

                body.addClass('disable-scroll').append(modalElement);
                $timeout(function () {
                    var x = $document.width(),
                        y = window.innerHeight || document.documentElement.offsetHeight;
                    container.css({
                        left: x / 2,
                        top: y / 2
                    }).addClass('et-modal-show');
                }, 100);

                var modal = {
                    controller: modalController,
                    scope: childScope,
                    element: modalElement
                };

                defer.resolve(modal);

            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;

        }

    }

    etModal.$inject = ['$rootScope', 'modalFactory', 'utils'];

    function etModal($rootScope, modalFactory, utils) {

        return {
            require: 'etModal',
            restrict: 'A',
            scope: true,
            link: etModalLink,
            controller: angular.noop,
            controllerAs: 'modalConfig'
        };

        function etModalLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                $scope: scope,
                overlay: true,
                disableBodyScroll: true,
                templateUrl: 'modules/modal/et-modal.html'
            });

            utils.params(scope, attr.etModal, ctrl);

            element.on('click', function () {
                !$rootScope.modals[scope.$id] && scope.$apply(function () {
                    modalFactory(ctrl).then(function (modal) {
                        $rootScope.modals[scope.$id] = modal;
                    });
                });
            });

        }
    }

})();