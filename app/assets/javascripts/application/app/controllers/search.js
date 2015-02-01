(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'Users', 'Groups'];

    function SearchController($scope, Users, Groups) {

        var vm = this,
            keyword = $scope.keyword;

        vm.prev = prev;
        vm.next = next;

        setPage('users');
        setPage('groups');

        function setPage(type, page) {

            page = page || 1;

            switch (type) {
                case 'users':
                    Users.all({
                        username: keyword,
                        page: page
                    }, function (result) {
                        vm.users = result;
                    });
                    break;
                case 'groups':
                    Groups.all({
                        name: keyword,
                        page: page
                    }, function (result) {
                        vm.groups = result;
                    });
                    break;
            }
        }

        function prev(type) {

            var meta = vm[type].meta,
                page = meta.current_page - 1;

            if (page < 1) {
                page = 1;
            }

            setPage(type, page);

        }

        function next(type) {

            var meta = vm[type].meta,
                page = meta.current_page + 1;

            if (page > meta.total_pages) {
                page = meta.total_pages;
            }

            setPage(type, page);

        }

    }

})();
