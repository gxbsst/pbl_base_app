(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Gauges', Gauges)
        .service('GaugeRecommends', GaugeRecommends);

    Gauges.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Gauges($resource, RESOURCE_ACTIONS) {
        return $resource('/gauges/:action/:gaugeId', {
            action: '@action',
            gaugeId: '@gaugeId',
            include: 'techniques'
        }, RESOURCE_ACTIONS);
    }

    GaugeRecommends.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function GaugeRecommends($resource, RESOURCE_ACTIONS) {
        return $resource('/gauge_recommends', {
            include: 'techniques'
        }, RESOURCE_ACTIONS);
    }

})();