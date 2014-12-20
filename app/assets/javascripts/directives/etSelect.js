(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etSelect', etSelect);

    etSelect.$inject = ['utils'];

    function etSelect(utils) {
        return {
            require: ['etSelect', '?etConfig'],
            restrict: 'A',
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

                var vm = ctrl[0];

                vm.label = 'name';
                vm.value = 'id';
                vm.placeholder = 'DIRECTIVE.SelectDefaultLabel';

                vm.active = active;
                vm.select = select;
                vm.isSelected = isSelected;

                scope.$on('onDocumentClick', function () {
                    delete vm.show;
                    delete vm.focusin;
                });

                ctrl[1] && utils.merge(scope, ctrl[1], vm);

                if (attr.etSelect) {
                    scope.$watch(attr.etSelect, function (options) {
                        vm.options = options;
                    });
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
                    vm.selected = vm.options.findOne(function (option) {
                        return option[vm.value] == value;
                    });
                });

                function isSelected(option) {
                    return option[vm.value] == scope.$eval(attr.ngModel);
                }

                function active($event) {
                    $event.stopPropagation();
                    vm.show = !vm.show;
                    vm.focusin = true;
                }

                function select(option) {
                    scope.$eval(attr.ngModel + ' = ' + JSON.stringify(option[vm.value]));
                }

            }
        }

    }

})();