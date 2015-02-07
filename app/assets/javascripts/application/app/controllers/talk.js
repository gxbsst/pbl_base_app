(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('TalkController', TalkController);

    TalkController.$inject = ['$scope', '$timeout', '$q', 'Users'];

    function TalkController($scope, $timeout, $q, Users) {

        var vm = this,
            callback = function () {
                pull = $timeout(function () {
                    getMessages();
                }, 5 * 1000);
            },
            pull;

        vm.messages = [];
        vm.send = send;
        vm.histories = histories;

        $scope.$watch('user', function (user) {
            if (user) {
                vm.user = user;
                getMessages(true);
            }
        });

        $scope.$on('$destroy', function () {
            $timeout.cancel(pull);
        });

        function getMessages(more) {

            pull && $timeout.cancel(pull);

            delete vm.scrollBottom;
            delete vm.scrollTop;
            if (more) {
                vm.loading = true;
            }
            var older = vm.messages.first(),
                latest = vm.messages.last(),
                params = {
                    userId: vm.user.id,
                    action: 'sms'
                };
            if (more) {
                older && angular.extend(params, {
                    older_id: older.id
                });
            } else {
                latest && angular.extend(params, {
                    latest_id: latest.id
                });
            }
            Users.all(params, function (result) {
                delete vm.loading;
                if (!params.latest_id) {
                    vm.more = result.data.length >= 10;
                    result.data = result.data.reverse();
                }
                if (params.older_id) {
                    vm.messages = result.data.concat(vm.messages);
                } else {
                    vm.messages = vm.messages.concat(result.data);
                }
                if (result.data.length) {
                    $timeout(function () {
                        if (params.older_id) {
                            vm.scrollTop = true;
                        } else {
                            vm.scrollBottom = true;
                        }
                    }, 50);
                }

                callback();
            });

        }

        function send() {
            vm.sending = true;
            Users.add({
                userId: vm.user.id,
                action: 'sms',
                sms: vm.message
            }, function () {
                getMessages();
                delete vm.message.content;
                delete vm.sending;
            });
        }

        function histories() {
            getMessages(true);
        }

    }

})();
