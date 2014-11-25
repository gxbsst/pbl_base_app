(function () {
    'use strict';

    angular
        .module('app.modal', ['app.factories'])
        .provider('modalConfig', modalConfig)
        .factory('modalFactory', modalFactory)
        .directive('ngModal', ngModal);

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

            function showModal(config) {

                var defer = $q.defer();

                $template(config).then(function (template) {

                    var controller = config.controller,
                        childScope = (config.$scope || $rootScope).$new(),
                        inject = angular.extend({
                            $scope: childScope
                        }, config.inject || {}),
                        modalController = controller ? $controller(controller, inject) : null,
                        modalElement = $compile(angular.element(template))(childScope);

                    childScope.destroyModal = function () {
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

    ngModal.$inject = ['modalFactory'];

    function ngModal(modalFactory) {
        return {
            restrict: 'A',
            scope: true,
            link: ngModalLink
        };

        function ngModalLink(scope, element, attr) {

            scope.config = angular.extend({
                $scope: scope,
                overlay: true,
                templateUrl: 'modules/modal/ng-modal.html'
            }, attr.ngModal.$parseConfig(scope));

            element.on('click', function () {
                modalFactory.showModal(scope.config);
            });

        }
    }

})();