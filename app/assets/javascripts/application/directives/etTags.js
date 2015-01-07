(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    etTags.$inject = ['$document', '$timeout'];

    function etTags($document, $timeout) {
        return {
            require: 'etTags',
            restrict: 'A',
            terminal: true,
            priority: 1000,
            replace: true,
            scope: true,
            templateUrl: 'directives/et-tags.html',
            link: etTagsLink,
            controller: angular.noop,
            controllerAs: 'tagsConfig'
        };

        function etTagsLink(scope, element, attr, ctrl) {

            var body = $document.find('body'),
                inputElement = element.find('.et-tag-input'),
                optionsElement = element.find('.et-tags-options'),
                onAdd = scope.$eval(attr.onAdd) || angular.noop,
                onRemove = scope.$eval(attr.onRemove) || angular.noop,
                onChange = scope.$eval(attr.onChange) || angular.noop,
                docHeight, focusout;

            scope.$watch(attr.ngModel, function (ngModel) {
                ctrl.ngModel = ngModel;
                ctrl.tags = [];
                if (ngModel) {
                    if (typeof ngModel == 'string') {
                        ngModel = ngModel.split(',');
                    }
                    ctrl.tags = ngModel.map(ctrl.formatter);
                    getOptions(true);
                }
            }, true);

            scope.$watch(function () {
                var placeholder;
                try{
                    placeholder = scope.$eval(attr.placeholder);
                }catch(e){
                    placeholder = attr.placeholder;
                }
                return placeholder;
            }, function (placeholder) {
                ctrl.placeholder = placeholder;
            });

            scope.$watch(attr.etTags, function (config) {
                angular.extend(ctrl, config || {});
            }, true);

            scope.$watch(function () {
                return ctrl.options;
            }, function (options) {
                if (angular.isArray(options)) {
                    ctrl.$options = options;
                }
            }, true);

            ctrl.input = '';
            ctrl.$options = [];
            ctrl.template = 'directives/et-tags-template.html';
            ctrl.add = add;
            ctrl.remove = remove;
            ctrl.select = select;
            ctrl.formatter = formatter;
            ctrl.onKeyup = onKeyup;
            ctrl.hasOption = hasOption;

            element.on('click', setFocus);

            inputElement
                .on('focusin', function () {
                    docHeight = $document.height();
                    ctrl.focusin = true;
                    $timeout(function () {
                        ctrl.showOptions = true;
                    }, 15);
                    getOptions();
                }).on('focusout', function () {
                    scope.$apply(function () {
                        delete ctrl.focusin;
                        $timeout(function () {
                            delete ctrl.showOptions;
                        }, 10);
                    });
                });

            function setFocus() {
                inputElement.focus();
            }

            function onKeyup($event) {
                if ($event.which == 13) {
                    $event.preventDefault();
                    ctrl.add(ctrl.input);
                }
                getOptions();
            }

            function getOptions(force) {
                if ((force || ctrl.$input != ctrl.input) && angular.isFunction(ctrl.options)) {
                    ctrl.options.call(null, ctrl.input)
                        .then(function (options) {
                            ctrl.$options = options;
                            ctrl.$input = ctrl.input;
                            $timeout(function () {
                                ctrl.top = optionsElement.outerHeight() + element.offset().top + element.outerHeight() > docHeight;
                            });
                        });
                }
            }

            function hasOption(){
                return ctrl.$options.has(function (option) {
                    return !option.selected;
                });
            }

            function add(tag) {
                tag = ctrl.formatter(tag);
                if (!exist(tag)) {
                    ctrl.tags.push(tag);
                    setFocus();
                    onAdd.call(scope, tag, ctrl.tags);
                    onChange.call(scope, tag, ctrl.tags);
                    getOptions(true);
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
                getOptions(true);
            }

            function select(option){
                add(option);
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