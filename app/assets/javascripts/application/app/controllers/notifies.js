(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SMSController', SMSController)
        .controller('NotifiesController', NotifiesController);

    SMSController.$inject = ['User', 'Notifications'];

    function SMSController(User, Notifications) {

        var vm = this;

        vm.show = show;
        vm.setPage = setPage;
        vm.prev = prev;
        vm.next = next;

        function setPage(page){
            User.get({
                action: 'sms',
                page: page || 1
            }, function (result) {
                vm.sms = result;
            });
        }

        function prev() {

            var meta = vm.sms.meta,
                page = meta.current_page - 1;

            if (page < 1) {
                page = 1;
            }

            setPage(page);

        }

        function next() {

            var meta = vm.sms.meta,
                page = meta.current_page + 1;

            if (page > meta.total_pages) {
                page = meta.total_pages;
            }

            setPage(page);

        }

        function show(notification){
            angular.forEach(vm.sms, function(entry){
                delete entry.show;
            });
            Notifications.update({
                notificationId: notification.id,
                action: 'read'
            }, function(result){
                angular.extend(notification, result.data);
                notification.show = true;
            });
        }

    }

    NotifiesController.$inject = ['NOTIFIES_TYPES', 'User', 'Notifications'];

    function NotifiesController(NOTIFIES_TYPES, User, Notifications) {

        var vm = this;

        vm.types = angular.copy(NOTIFIES_TYPES);
        vm.show = show;
        vm.setPage = setPage;
        vm.prev = prev;
        vm.next = next;
        vm.filter = filter;
        vm.template = template;

        setPage();

        function setPage(page){
            var options = {
                action: 'notifies',
                page: page || 1
            };
            angular.extend(options, vm.params || {});
            User.get(options, function (result) {
                vm.notifies = result;
            });
        }

        function prev() {

            var meta = vm.notifies.meta,
                page = meta.current_page - 1;

            if (page < 1) {
                page = 1;
            }

            setPage(page);

        }

        function next() {

            var meta = vm.notifies.meta,
                page = meta.current_page + 1;

            if (page > meta.total_pages) {
                page = meta.total_pages;
            }

            setPage(page);

        }

        function show(notification){
            angular.forEach(vm.notifies, function(entry){
                delete entry.show;
            });
            Notifications.update({
                notificationId: notification.id,
                action: 'read'
            }, function(result){
                angular.extend(notification, result.data);
                notification.show = true;
            });
        }

        function filter(type){
            angular.forEach(vm.types, function (type) {
                delete type.selected;
            });
            if(type){
                type.selected = true;
                vm.params = type.filters;
            }else{
                delete vm.params;
            }
            setPage(1);
        }

        function template(notify){
            return ([notify.sender_type, notify.event_type].join('-') + '.html').toLowerCase();
        }
    }

})();
