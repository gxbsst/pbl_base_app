(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Todos', Todos)
        .service('TodoItems', TodoItems);

    Todos.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Todos($resource, RESOURCE_ACTIONS) {
        return $resource('/todo/todos/:todoId/:action', {
            todoId: '@todoId',action: '@action'
        }, RESOURCE_ACTIONS);
    }


    TodoItems.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function TodoItems($resource, RESOURCE_ACTIONS) {
        return $resource('/todo/todo_items/:todoId/:action', {
            todoId: '@todoId',action: '@action'
        }, RESOURCE_ACTIONS);
    }

})();