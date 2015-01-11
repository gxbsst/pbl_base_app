(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etSelect', etSelect);

    etSelect.$inject = ['$rootScope', '$parse', 'utils'];

    function etSelect($rootScope, $parse, utils) {
        return {
            require: ['etSelect', '?etConfig'],
            restrict: 'A',
            scope: true,
            replace: true,
            terminal: true,
            priority: 1000,
            transclude: true,
            compile: etSelectCompile,
            templateUrl: 'directives/et-select.html',
            controller: angular.noop,
            controllerAs: 'selectConfig'
        };

        function etSelectCompile(element, attr, transclude) {
            return {
                post: etSelectPost
            };

            function etSelectPost(scope, element, attr, ctrl) {

                var vm = ctrl[0],
                    valueElement = element.find('.et-select-value');

                vm.label = 'title';
                vm.value = 'id';
                vm.placeholder = 'DIRECTIVE.SelectDefaultLabel';

                vm.active = active;
                vm.select = select;
                vm.isSelected = isSelected;

                if (attr.etSync) {
                    scope.$watch(attr.etSync, function (syncConfig) {
                        vm.syncConfig = syncConfig;
                    }, true);
                }

                if (attr.ngChange) {
                    scope.$watch(attr.ngModel, function () {
                        var fn = $parse(attr.ngChange);
                        fn(scope);
                    });
                }

                attr.ngDisabled && scope.$watch(attr.ngDisabled, function (disabled) {
                    vm.disabled = disabled;
                });

                scope.$on('onDocumentClick', function () {
                    delete vm.show;
                    if (vm.focusin) {
                        delete vm.focusin;
                        valueElement.trigger('focusout');
                    }
                });

                ctrl[1] && utils.merge(scope, ctrl[1], vm);

                if (attr.etSelect) {
                    scope.$watch(attr.etSelect, function (options) {
                        vm.options = options;
                        findSelected();
                    }, true);
                } else {
                    scope.$watch(function () {
                        return vm;
                    }, function () {
                        transclude(scope, function (clone) {
                            vm.options = [];
                            angular.forEach(clone, function (node) {
                                if (node.tagName == 'OPTION') {
                                    var option = {};
                                    option[vm.value] = node.value;
                                    option[vm.label] = node.innerText;
                                    vm.options.push(option);
                                }
                            });
                        });
                    }, true);
                }

                scope.$watch(attr.ngModel, function (value) {
                    vm.ngModel = value;
                    findSelected();
                });

                function findSelected() {
                    if (vm.options) {
                        vm.selected = vm.options.findOne(function (option) {
                            return option[vm.value] == vm.ngModel;
                        });
                    }
                }

                function isSelected(option) {
                    if(option){
                        return option[vm.value] == vm.ngModel;
                    }else{
                        return !vm.ngModel;
                    }
                }

                function active($event) {
                    $event.stopPropagation();
                    $rootScope.$broadcast('onDocumentClick');
                    vm.show = !vm.show;
                    vm.focusin = true;
                    valueElement.trigger('focusin');
                }

                function select(option) {
                    scope.$eval(attr.ngModel + ' = ' + (option ? JSON.stringify(option[vm.value]) : '""'));
                    attr.onSelect && scope.$eval(attr.onSelect);
                }

            }
        }

    }

})();