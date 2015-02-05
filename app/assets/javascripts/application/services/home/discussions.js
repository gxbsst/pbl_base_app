(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Discussions', Discussions);

    Discussions.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Discussions($resource, RESOURCE_ACTIONS) {
        return $resource('/discussions/:discussionId', {
            discussionId: '@discussionId'
        }, RESOURCE_ACTIONS);
    }

})();