(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etDraggable', etDraggable);

    etDraggable.$inject = ['$document'];

    function etDraggable($document) {
        return {
            restrict: 'A',
            link: etDraggableLink
        };

        function etDraggableLink(scope, element, attr) {

            var startX = 0,
                startY = 0,
                x = 0,
                y = 0,
                handler = element.find('.draggable-handler');
            if (!handler[0]) {
                handler = element;
            }
            handler.on('mousedown', function (event) {
                event.preventDefault();
                x = parseInt(element.css('left'), 10);
                y = parseInt(element.css('top'), 10);
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    }

})();