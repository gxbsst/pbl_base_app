(function () {
    'use strict';

    angular
        .module('app.modal', ['app.factories'])
        .provider('modalConfig', modalConfig)
        .factory('modalFactory', modalFactory)
        .factory('modals', modals)
        .directive('etModal', etModal)
        .directive('etModals', etModals);

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

            config.$id = config.$id || 'modal-' + new Date().getTime();
            config.overlay = typeof config.overlay == 'boolean' ? config.overlay : true;
            config.closeable = typeof config.closeable == 'boolean' ? config.closeable : true;
            config.templateUrl = config.templateUrl || 'modules/modal/et-modal.html';

            if ($rootScope.modals[config.$id])return;

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
                    delete $rootScope.modals[config.$id];
                    childScope.$destroy();
                    modalElement.remove();
                    if (!Object.size($rootScope.modals)) {
                        body.removeClass('disable-scroll');
                    }
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
                $id: scope.$id,
                $scope: scope
            });

            utils.params(scope, attr.etModal, ctrl);

            element.on('click', function () {
                modalFactory(ctrl).then(function (modal) {
                    $rootScope.modals[ctrl.$id] = modal;
                });
            });

        }
    }

    etModals.$inject = ['$rootScope', 'modalFactory'];

    function etModals($rootScope, modalFactory) {

        return {
            require: 'etModals',
            restrict: 'A',
            scope: true,
            link: etModalsLink,
            controller: angular.noop,
            controllerAs: 'modalConfig'
        };

        function etModalsLink(scope, element, attr, ctrl) {

            angular.extend(ctrl, {
                $id: scope.$id,
                $scope: scope
            });

            scope.$watch(attr.etModals, function (config) {
                if (config) {
                    angular.extend(ctrl, config);
                }
            }, true);

            scope.getModalConfig = function (config, idx) {
                if (typeof config == 'undefined') {
                    return ctrl;
                }
                if (typeof config == 'number') {
                    return ctrl.modals[config];
                }
                var conf = typeof idx == 'number' ? ctrl.modals[idx] : ctrl;
                angular.extend(conf, config);
            };

            scope.setStep = function (idx) {
                angular.extend(ctrl, ctrl.defaults);
                angular.extend(ctrl, ctrl.modals[idx || 0]);
                return ctrl;
            };

            element.on('click', function () {
                modalFactory(scope.setStep()).then(function (modal) {
                    $rootScope.modals[ctrl.$id] = modal;
                });
            });

        }
    }

    modals.$inject = ['$rootScope', '$q', '$controller', 'modalFactory'];

    function modals($rootScope, $q, $controller, modalFactory) {

        return function (config, scope) {

            scope = scope || $rootScope.$new();

            var defer = $q.defer(),
                locals = {
                    $scope: scope
                },
                ctrl = $controller(angular.noop, locals),
                modal;

            locals.$scope.modalConfig = ctrl;

            angular.extend(ctrl, {
                $id: scope.$id,
                $scope: scope
            });

            scope.getModalConfig = function (config, idx) {
                if (typeof config == 'undefined') {
                    return ctrl;
                }
                if (typeof config == 'number') {
                    return ctrl.modals[config];
                }
                var conf = typeof idx == 'number' ? ctrl.modals[idx] : ctrl;
                angular.extend(conf, config);
            };

            scope.setStep = function (idx) {
                angular.extend(ctrl, ctrl.defaults);
                angular.extend(ctrl, ctrl.modals[idx || 0]);
                return ctrl;
            };

            scope.$watch(function () {
                return config;
            }, function (config) {
                if (config) {
                    angular.extend(ctrl, config);
                    if (!modal) {
                        modal = modalFactory(scope.setStep());
                        modal.then(function (modal) {
                            $rootScope.modals[ctrl.$id] = modal;
                            defer.resolve(modal);
                        });
                    }
                }
            }, true);

            return defer.promise;

        }
    }

})();