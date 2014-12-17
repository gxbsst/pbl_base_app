(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Disciplines', Disciplines)
        .service('Tasks', Tasks)
        ;

    Disciplines.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Disciplines($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }


    Tasks.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Tasks($resource, RESOURCE_ACTIONS) {
        return $resource('/project/tasks/:taskId', {taskId: '@taskId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();