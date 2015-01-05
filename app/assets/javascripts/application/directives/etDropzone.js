(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etDropzone', etDropzone)
        .directive('etDrop', etDrop)
        .directive('etDrag', etDrag);

    etDropzone.$inject = ['$parse', '$timeout'];

    function etDropzone($parse, $timeout){
        return {
            require: 'etDropzone',
            restrict: 'CA',
            scope: true,
            compile: function () {
                return {
                    pre: etDropzoneLink
                }
            },
            controller: angular.noop
        };

        function etDropzoneLink(scope, element, attr, ctrl){
            var config = angular.extend({
                    drops: '.et-drop',
                    drags: '.et-drag'
                }, scope.$eval(attr.etDropzone) || {});

            scope.$on('onSetDrop', init);
            scope.$on('onSetDrag', init);

            interact.maxInteractions(Infinity);

            interact(config.drags)
                .draggable({ max: Infinity })
                .on('dragstart', function (event) {
                    var el = angular.element(event.target).addClass('shadow');
                    event.interaction.x = parseInt(el.data('x'), 10) || 0;
                    event.interaction.y = parseInt(el.data('y'), 10) || 0;
                })
                .on('dragmove', function (event) {
                    var el = angular.element(event.target);
                    event.interaction.x += event.dx;
                    event.interaction.y += event.dy;
                    el.css({left: event.interaction.x, top: event.interaction.y});
                    return false;
                })
                .on('dragend', function (event) {
                    var el = angular.element(event.target);
                    el.css({left: 0, top: 0}).removeClass('shadow hover');
                });

            function init(){
                interact(config.drops)
                    .dropzone({
                        accept: config.drags,
                        overlap: 'pointer',
                        ondropactivate: function (event) {
                            var dropzone = angular.element(event.target),
                                drag = angular.element(event.relatedTarget),
                                onBegin = $parse(drag.attr('on-begin'));
                            dropzone.addClass('et-drop-activate');
                            onBegin(drag.scope(), {$event: event});
                        },
                        ondragenter: function (event) {
                            var dropzone = angular.element(event.target),
                                drag = angular.element(event.relatedTarget),
                                onEnter = $parse(drag.attr('on-enter'));
                            dropzone.addClass('et-drop-enter');
                            drag.addClass('et-drag-drop');
                            onEnter(drag.scope(), {$event: event, $target: dropzone.scope().$eval(dropzone.attr('drop'))});
                        },
                        ondragleave: function (event) {
                            var dropzone = angular.element(event.target),
                                drag = angular.element(event.relatedTarget),
                                onLeave = $parse(drag.attr('on-leave'));
                            dropzone.removeClass('et-drop-enter');
                            drag.removeClass('et-drag-drop');
                            onLeave(drag.scope(), {$event: event, $target: dropzone.scope().$eval(dropzone.attr('drop'))});
                        },
                        ondrop: function (event) {
                            var dropzone = angular.element(event.target),
                                drag = angular.element(event.relatedTarget),
                                onDropped = $parse(drag.attr('on-dropped'));
                            onDropped(drag.scope(), {$event: event, $target: dropzone.scope().$eval(dropzone.attr('drop'))});
                        },
                        ondropdeactivate: function (event) {
                            var dropzone = angular.element(event.target),
                                drag = angular.element(event.relatedTarget),
                                onEnd = $parse(drag.attr('on-end'));
                            dropzone.removeClass('et-drop-activate et-drop-enter');
                            drag.removeClass('et-drag-drop');
                            onEnd(drag.scope(), {$event: event, $target: dropzone.scope().$eval(dropzone.attr('drop'))});
                        }
                    });
            }

        }
    }

    function etDrop(){
        return {
            restrict: 'CA',
            link: etDropLink,
            controller: angular.noop
        };

        function etDropLink(scope, element, attr){
            scope.$emit('onSetDrop');
        }
    }

    function etDrag(){
        return {
            restrict: 'CA',
            link: etDragLink,
            controller: angular.noop
        };

        function etDragLink(scope, element, attr){
            scope.$emit('onSetDrag');
        }
    }

})();