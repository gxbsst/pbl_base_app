(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Skill', Skill);

    Skill.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Skill($resource, RESOURCE_ACTIONS) {
        return $resource('/skill/:action/:id', {action: '@action', id: '@id'}, RESOURCE_ACTIONS);
    }

})();