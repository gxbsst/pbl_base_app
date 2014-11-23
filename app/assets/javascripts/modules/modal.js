(function () {
    'use strict';

    angular
        .module('app.modal', [])
        .provider('modalConfig', modalConfig)
        .factory('modalFactory', modalFactory)
        .directive('ngModal', ngModal);

    function modalConfig() {

        this.zIndex = 10000;
        this.count = 0;
        this.modals = [];
        this.$get = function () {
            return {
                config: this.config
            };
        };

    }

    modalFactory.$inject = ['$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateCache', 'modalConfig'];

    function modalFactory($document, $compile, $controller, $http, $rootScope, $q, $templateCache, modalConfig) {

        var body = $document.find('body');

        return new Modal();

        function Modal() {

            var self = this,
                getTemplate = function (config) {

                    var defer = $q.defer();

                    if (config.template) {
                        defer.resolve(config.template);
                    } else if (config.templateUrl) {
                        var cache = $templateCache.get(config.templateUrl);
                        if(cache){
                            defer.resolve(cache);
                        }else{
                            $http({
                                method: 'GET',
                                url: config.templateUrl,
                                cache: true
                            }).then(function (result) {
                                defer.resolve(result.data);
                            }).catch(function (error) {
                                defer.reject(error);
                            });
                        }
                    } else {
                        defer.reject('No template or templateUrl has been specified.');
                    }

                    return defer.promise;

                };

            self.showModal = showModal;

            function showModal(config) {

                var defer = $q.defer();

                getTemplate(config).then(function (template) {

                    var controller = config.controller,
                        childScope = (config.scope || $rootScope).$new(),
                        inject = angular.extend({
                            $scope: childScope
                        }, config.inject || {}),
                        modalController = controller ? $controller(controller, inject) : null,
                        modalElement = $compile(angular.element(template))(childScope);

                    childScope.$watch(function () {
                        return [modalElement[0].clientWidth, modalElement[0].clientHeight];
                    }, function (values) {
                        config.marginLeft = -values[0]/2;
                        config.marginTop = -values[1]/2;
                    }, true);

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

                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;

            }

        }

    }

    ngModal.$inject = ['modalFactory'];

    function ngModal(modalFactory){
        return {
            restrict: 'A',
            scope: true,
            link: ngModalLink
        };

        function ngModalLink(scope, element, attr){

            scope.config = angular.extend({
                templateUrl: 'modules/modal/ng-modal.html'
            }, attr.ngModal.$parseConfig(scope));

            if(!scope.config.scope){
                scope.config.scope = scope;
            }

            element.on('click', function () {
                modalFactory.showModal(scope.config);
            });

        }
    }

})();