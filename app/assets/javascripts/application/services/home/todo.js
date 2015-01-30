(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Todos', Todos)
        .service('TodoItems', TodoItems);

    Todos.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Todos($resource, RESOURCE_ACTIONS) {
        return $resource('/todo/todos', {action: '@action'}, RESOURCE_ACTIONS);
    }


    TodoItems.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function TodoItems($resource, RESOURCE_ACTIONS) {
        return $resource('/todo/todo_items/', {action: '@action'}, RESOURCE_ACTIONS);
    }

})();