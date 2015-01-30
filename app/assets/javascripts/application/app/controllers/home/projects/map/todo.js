(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('mapTodoController', mapTodoController);


    mapTodoController.$inject = ['$scope', '$state', '$element', '$interval', 'Todos', 'TodoItems'];

    function mapTodoController($scope, $state, $element, $interval, Todos, TodoItems) {
        $scope.todoread=false;
        Todos.all(function (result) {
            $scope.todoread=true;
            $scope.todos=result.data;
        });

    }

})();
