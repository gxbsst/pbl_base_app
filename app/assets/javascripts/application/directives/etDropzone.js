(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etDropzone', etDropzone)
        .directive('etDrop', etDrop)
        .directive('etDrag', etDrag);

    etDropzone.$inject = ['$parse'];

    function etDropzone($parse){
        return {
            require: 'etDropzone',
            restrict: 'A',
            compile: function () {
                return {
                    pre: etDropzoneLink
                }
            },
            controller: angular.noop
        };

        function etDropzoneLink(scope, element, attr, ctrl){
            var onBegin = $parse(attr.onBegin),
                onEnter = $parse(attr.onEnter),
                onLeave = $parse(attr.onLeave),
                onDropped = $parse(attr.onDropped),
                onEnd = $parse(attr.onEnd);

            ctrl.$drops = [];
            ctrl.$drags = [];

            scope.$watch(function () {
                return ctrl.$drags;
            }, function (drags) {
                console.log(drags.length)
            });

            /*interact(element[0])
                .dropzone({
                    overlap: 'pointer',
                    ondropactivate: function (event) {
                        onBegin(scope, {$event: event});
                        //event.target.classList.add('drop-active');
                    },
                    ondragenter: function (event) {
                        onEnter(scope, {$event: event});
                        //var draggable = event.relatedTarget,
                        //    dropzone = event.target;
                        //dropzone.classList.add('drop-target');
                        //draggable.classList.add('can-drop');
                        //draggable.textContent = 'Dragged in';
                    },
                    ondragleave: function (event) {
                        onLeave(scope, {$event: event});
                        //event.target.classList.remove('drop-target');
                        //event.relatedTarget.classList.remove('can-drop');
                        //event.relatedTarget.textContent = 'Dragged out';
                    },
                    ondrop: function (event) {
                        onDropped(scope, {$event: event});
                        //event.relatedTarget.textContent = 'Dropped';
                    },
                    ondropdeactivate: function (event) {
                        onEnd(scope, {$event: event});
                        //event.target.classList.remove('drop-active');
                        //event.target.classList.remove('drop-target');
                    }
                });*/
        }
    }

    function etDrop(){
        return {
            require: ['^etDropzone', 'etDrop'],
            restrict: 'A',
            link: etDropLink,
            controller: angular.noop
        };

        function etDropLink(scope, element, attr, ctrl){
            var dropzone = ctrl[0],
                drop = ctrl[1];
            //dropzone.$interact.accept(element[0]);
        }
    }

    function etDrag(){
        return {
            require: ['^etDropzone', '^etDrop', 'etDrag'],
            restrict: 'A',
            link: etDragLink,
            controller: angular.noop
        };

        function etDragLink(scope, element, attr, ctrl){
            var dropzone = ctrl[0],
                drop = ctrl[1],
                drag = ctrl[2];
            dropzone.$drags.push(element[0]);
        }
    }

})();