(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('TalkController', TalkController);

    TalkController.$inject = ['$scope', 'Users'];

    function TalkController($scope, Users) {

        var vm = this;

        vm.send = send;

        $scope.$watch('user', function (user) {
            if(user){
                vm.user = user;
                getMessages();
            }
        });

        function getMessages(more){
            vm.messages = vm.messages || [];
            var older = vm.messages.first(),
                latest = vm.messages.last(),
                params = {
                    userId: vm.user.id,
                    action: 'sms'
                };
            if(more){
                older && angular.extend(params, {
                    older_id: older.id
                });
            }else{
                latest && angular.extend(params, {
                    latest_id: latest.id
                });
            }
            Users.all(params, function(result){
                vm.messages = vm.messages.concat(result.data);
            });
        }

        function send(){
            Users.add({
                userId: vm.user.id,
                action: 'sms',
                sms: vm.message
            }, function () {
                vm.message.content = '';
                getMessages();
            });
        }

    }

})();
