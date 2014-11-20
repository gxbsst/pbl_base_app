(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'cookie', '$document', '$filter'];

    function HomeController($scope, cookie, $document, $filter) {
        var vm = this;

        vm.head = ['第1列', '第2列', '第3列'];
        vm.body = [
            ['1:1', '1:2', '1:3'],
            ['2:1', '2:2', '2:3'],
            ['3:1', '3:2', '3:3']
        ];

        vm.addColumn = function () {
            vm.head.push(['第', vm.head.length + 1, '列'].join(''));
            angular.forEach(vm.body, function (row, i) {
                row.push([i + 1, ':', vm.head.length].join(''));
            });
        };
        vm.addRow = function () {
            vm.body.push(vm.head.map(function (c, i) {
                return [vm.body.length + 1, ':', i + 1].join('');
            }));
        };
        vm.moveColumn = function (from, to) {
            vm.head.move(from, to);
            angular.forEach(vm.body, function (row) {
               row.move(from, to);
            });
        };
        vm.moveRow = function (from, to) {
            vm.body.move(from, to);
        };
    }

})();
