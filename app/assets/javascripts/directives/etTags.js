(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etTags', etTags);

    etTags.$inject = [];

    function etTags() {
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
                if(ngModel){
                    ctrl.tags = typeof ngModel == 'string' ? ngModel.split(',') : ngModel;
                }else{
                    ctrl.tags = [];
                }
            });

            scope.$watch(function () {
                return attr.placeholder;
            }, function (placeholder) {
                ctrl.placeholder = placeholder;
            });

            ctrl.input = '';
            ctrl.tags = [];
            ctrl.add = add;
            ctrl.remove = remove;
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
            }

            function onKeypress($event) {
                if ($event.which == 13) {
                    $event.preventDefault();
                    ctrl.add(ctrl.input);
                }
            }

            function add(tag) {
                tag = tag.trim();
                if (tag && !exist(tag)) {
                    ctrl.tags.push(tag);
                    ctrl.ngModel = ctrl.tags.join(',');
                    setFocus();
                    onAdd.call(scope, tag, ctrl.ngModel);
                    onChange.call(scope, tag, ctrl.ngModel);
                }
                ctrl.input = '';
            }

            function remove(tag, $event) {
                $event.stopPropagation();
                ctrl.ngModel = ctrl.tags.remove(function (t) {
                    return t == tag;
                }).join(',');
                setFocus();
                onRemove.call(scope, tag, ctrl.ngModel);
                onChange.call(scope, tag, ctrl.ngModel);
            }

            function exist(tag) {
                return ctrl.tags.has(function (t) {
                    return t == tag;
                });
            }

        }
    }

})();