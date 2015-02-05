(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SMSController', SMSController)
        .controller('NotifiesController', NotifiesController);

    SMSController.$inject = ['$rootScope', 'User', 'Notifications'];

    function SMSController($rootScope, User, Notifications) {

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

    NotifiesController.$inject = ['$rootScope', 'NOTIFIES_TYPES', 'User', 'Notifications'];

    function NotifiesController($rootScope, NOTIFIES_TYPES, User, Notifications) {

        var vm = this;

        vm.types = angular.copy(NOTIFIES_TYPES);
        vm.filter = filter;
        vm.template = template;
        vm.setPage = setPage;
        vm.show = show;
        vm.prev = prev;
        vm.next = next;
        vm.destroy = destroy;

        setPage();

        function setPage(page, loading){
            if(typeof page == 'boolean'){
                loading = page;
                page = vm.notifies.current_page;
            }
            loading = typeof loading == 'boolean'? loading : true;
            if(vm.notifies && loading){
                delete vm.notifies.data;
            }
            var options = {
                action: 'notifies',
                page: page || 1,
                limit: 8
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

        function destroy(notify, $event){
            $event.stopPropagation();
            Notifications.remove({
                notificationId: notify.id
            }, function (result) {
                $rootScope.notifies_count = result.count;
                setPage(true);
            });
        }

        function show(notify){
            angular.forEach(vm.notifies.data, function(entry){
                delete entry.show;
            });
            notify.show = true;
            if(!notify.read){
                Notifications.update(angular.extend({
                    notificationId: notify.id,
                    action: 'read'
                }, vm.params || {}), function (result) {
                    notify.read = true;
                    $rootScope.notifies_count = result.count;
                });
            }
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
            return 'notifications/' + ([notify.sender_type, notify.event_type].join('-') + '.html').toLowerCase();
        }
    }

})();
