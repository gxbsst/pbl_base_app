(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    etTags.$inject = ['$injector'];

    function etTags($injector) {
        return {
            require: 'etTags',
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'directives/et-tags.html',
            link: etTagsLink,
            controller: angular.noop,
            controllerAs: 'tagsConfig'
        };

        function etTagsLink(scope, element, attr, ctrl) {

            var inputElement = element.find('.et-tag-input'),
                onAdd = scope.$eval(attr.onAdd) || angular.noop,
                onRemove = scope.$eval(attr.onRemove) || angular.noop,
                onChange = scope.$eval(attr.onChange) || angular.noop;

            scope.$watch(attr.ngModel, function (ngModel) {
                ctrl.ngModel = ngModel;
                ctrl.tags = [];
                if (ngModel) {
                    if (typeof ngModel == 'string') {
                        ngModel = ngModel.split(',');
                    }
                    ctrl.tags = ngModel.map(ctrl.formatter);
                }
            });

            scope.$watch(function () {
                return attr.placeholder;
            }, function (placeholder) {
                ctrl.placeholder = placeholder;
            });

            scope.$watch(attr.etTags, function (config) {
                if (config) {
                    angular.extend(ctrl, config);
                }
            }, true);

            ctrl.input = '';
            ctrl.tags = [];
            ctrl.add = add;
            ctrl.remove = remove;
            ctrl.formatter = formatter;
            ctrl.onKeypress = onKeypress;

            element.on('click', setFocus);

            inputElement
                .on('focusin', function () {
                    ctrl.focusin = true;
                }).on('focusout', function () {
                    scope.$apply(function () {
                        delete ctrl.focusin;
                    });
                });

            function setFocus() {
                inputElement.focus();
                ctrl.show = !ctrl.show;
            }

            function onKeypress($event) {
                if ($event.which == 13) {
                    $event.preventDefault();
                    ctrl.add(ctrl.input);
                }
            }

            function add(tag) {
                tag = ctrl.formatter(tag);
                if (!exist(tag)) {
                    ctrl.tags.push(tag);
                    setFocus();
                    onAdd.call(scope, tag, ctrl.tags);
                    onChange.call(scope, tag, ctrl.tags);
                }
                ctrl.input = '';
            }

            function remove(tag, $event) {
                $event.stopPropagation();
                ctrl.tags.remove(function (item) {
                    return item.$id == tag.$id;
                });
                setFocus();
                onRemove.call(scope, tag, ctrl.tags);
                onChange.call(scope, tag, ctrl.tags);
            }

            function formatter(tag) {
                if (typeof tag == 'string') {
                    tag = tag.trim();
                    return {$id: tag, $label: tag};
                }
                if (tag.id) {
                    tag.$id = tag.id;
                }
                var label = tag.label || tag.name || tag.title;
                if (label) {
                    tag.$label = label;
                }
                return tag;
            }

            function exist(tag) {
                return ctrl.tags.has(function (item) {
                    return item.$id == tag.$id;
                });
            }

        }
    }

})();