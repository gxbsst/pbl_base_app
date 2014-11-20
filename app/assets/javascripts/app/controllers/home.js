(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'cookie', '$document', '$filter'];

    function HomeController($scope, cookie, $document, $filter) {
        var vm = this;
    }

})();
