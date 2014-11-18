(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        var vm = this;
    }

})();
