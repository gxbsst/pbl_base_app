(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope'];

    function HeaderController($rootScope) {

        //console.log(currentUser);

        //$rootScope.currentUser = User.add();

    }

})();