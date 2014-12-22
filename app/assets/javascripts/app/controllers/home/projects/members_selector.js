(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('MemberSelectorController', MemberSelectorController);

    MemberSelectorController.$inject = ['$scope', 'Friends', 'Groups', 'ProjectMembers'];

    function MemberSelectorController($scope, Friends, Groups, ProjectMembers) {

        var vm = this;

        vm.friends = Friends.all();
        vm.groups = Groups.all();
        vm.onSearch = onSearch;

        ProjectMembers.all(function (result) {
            vm.members = result.data;
        });

        $scope.$watch(function () {
            return vm.friends.data;
        }, function(users){
            vm.users = users;
            vm.$users = users;
        });

        function onSearch(){
            if(vm.keyword){
                vm.users = vm.$users.find(function (user) {
                    return (new RegExp(vm.keyword.toLowerCase())).test(user.name.toLowerCase());
                });
            }else{
                vm.users = vm.$users;
            }
        }


    }

})();