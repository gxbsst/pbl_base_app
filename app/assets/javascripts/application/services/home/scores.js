(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Scores', Scores);


    Scores.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Scores($resource, RESOURCE_ACTIONS) {
        return $resource('/assignment/scores/:workId/:action', {workId: '@workId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();