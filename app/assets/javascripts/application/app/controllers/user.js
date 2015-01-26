(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('UserIController', UserIController);

    UserIController.$inject = ['$scope','$rootScope','User'];

    function UserIController($scope,$rootScope,User) {
        var vm = this;
        vm.user = $rootScope.currentUser;
        User.get({action:'clazzs'},function(result){
            vm.user.clazzs=result.data;
        })
    }

})();
