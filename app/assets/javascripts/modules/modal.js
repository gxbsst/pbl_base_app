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

    modalFactory.$inject = ['$document', '$compile', '$controller', '$rootScope', '$q', '$template', 'modalConfig'];

    function modalFactory($document, $compile, $controller, $rootScope, $q, $template, modalConfig) {

        var body = $document.find('body');

        return new Modal();

        function Modal() {

            var self = this;

            self.showModal = showModal;

            function showModal(scope) {

                var config = scope.$config,
                    defer = $q.defer();

                $template(config).then(function (template) {

                    var controller = config.controller,
                        childScope = (config.$scope || $rootScope).$new(),
                        inject = angular.extend({
                            $scope: childScope
                        }, config.inject || {}),
                        modalController = controller ? $controller(controller, inject) : null,
                        modalElement = $compile(angular.element(template))(childScope),
                        container = modalElement.find('.et-modal-container');

                    childScope.modalResize = function () {
                        container.css({
                            marginLeft: -container.outerWidth() / 2,
                            marginTop: -container.outerHeight() / 2
                        });
                    };

                    childScope.destroyModal = function () {
                        delete scope.$modal;
                        childScope.$destroy();
                        modalElement.remove();
                    };

                    body.append(modalElement);

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

    }

    etModal.$inject = ['modalFactory'];

    function etModal(modalFactory) {
        return {
            restrict: 'A',
            scope: true,
            link: etModalLink
        };

        function etModalLink(scope, element, attr) {

            scope.$config = angular.extend({
                $scope: scope,
                overlay: true,
                templateUrl: 'modules/modal/et-modal.html'
            }, attr.etModal.parseConfig(scope));

            element.on('click', function () {
                !scope.$modal && scope.$apply(function () {
                    scope.$modal = modalFactory.showModal(scope);
                });
            });

        }
    }

})();