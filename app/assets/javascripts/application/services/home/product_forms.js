(function () {
    'use strict';

    angular
        .module('app.services')
        .service('ProductForms', ProductForms);

    ProductForms.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProductForms($resource, RESOURCE_ACTIONS) {
        return $resource('/product_forms/:action/:productFormId', {
            action: '@action',
            productFormId: '@productFormId',
            limit: 100
        }, RESOURCE_ACTIONS);
    }

})();