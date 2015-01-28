(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'Users', 'Groups'];

    function SearchController($scope, Users, Groups) {

        var vm = this,
            keyword = $scope.keyword;

        vm.search = search;

        function search(){
            Users.all({
                username: keyword
            }, function(result){
                vm.users = result;
            });
            Groups.all({
                name: keyword,
                owner_type: 'User'
            });
        }

    }

})();
