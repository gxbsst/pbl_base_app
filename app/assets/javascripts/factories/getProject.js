(function () {
    'use strict';

    angular
        .module('app.factories')
        .factory('getProject', getProject);

    getProject.$inject = ['$q', 'Projects'];

    function getProject($q, Projects) {

        return function (query) {

            var defer = $q.defer();

            Projects.get(query, function (result) {
                var products = result.data.products || [],
                    findFinal = function (product) {
                        return product.is_final;
                    };
                result.data.final_product = products.findOne(findFinal);
                if(result.data.final_product){
                    products.remove(findFinal);
                }
                defer.resolve(result.data);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

    }
})();
