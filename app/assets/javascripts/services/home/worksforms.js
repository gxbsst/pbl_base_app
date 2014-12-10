(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Worksforms', Worksforms);

    Worksforms.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Worksforms($resource, RESOURCE_ACTIONS) {
        return $resource('/worksforms/:worksformId', {projectId: '@worksformId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();