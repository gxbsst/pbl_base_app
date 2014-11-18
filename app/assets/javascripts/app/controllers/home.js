(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$locale'];

    function HomeController($scope, $locale) {
        var vm = this;
        console.log($locale);
    }

})();
