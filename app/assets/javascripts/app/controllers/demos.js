(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('DemosController', DemosController)
        .controller('ModalDemoController', ModalDemoController)
        .controller('FromDemoController', FromDemoController)
        .controller('ScrollbarDemoController', ScrollbarDemoController);

    DemosController.$inject = ['$scope', '$timeout'];

    function DemosController($scope, $timeout) {
        var vm = this;
        vm.view = 'demos/elements.html';
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
        vm.select = [
            {id: 1, title: 'item 1'},
            {id: 2, title: 'item 2 item 2 item 2 '},
            {id: 3, title: 'item 3'}
        ];

        $timeout(function () {
            vm.select = [
                {id: 4, title: 'item 4'},
                {id: 'a', title: 'item 5 item 5'},
                {id: 6, title: 'item 6'}
            ];
            $scope.aa.selected = 'a';
        }, 2000);

        $timeout(function () {
            vm.select = [
                {id: 4, title: 'item 4'},
                {id: 'a', title: 'item 5 item 5'},
                {id: 6, title: 'item 6'}
            ];
            $scope.aa.selected = 6;
        }, 3000);
    }

    ModalDemoController.$inject = ['$scope', '$timeout'];

    function ModalDemoController($scope, $timeout) {
        $scope.demo = 'Hi, modal!';
        $timeout(function () {
            $scope.demo = 'Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>';
        }, 2000);
    }

    ScrollbarDemoController.$inject = ['$scope'];

    function ScrollbarDemoController($scope) {
        $scope.someArray = [1, 2, 3];
        $scope.addItem = function () {
            var arrayLength = $scope.someArray.length;
            var nextValue = arrayLength > 0 ? $scope.someArray[arrayLength - 1] + 1 : 1;
            $scope.someArray.push(nextValue);
        };
        $scope.removeItem = function () {
            if ($scope.someArray.length) {
                $scope.someArray.pop();
            }
        };
        $scope.onResize = function (width, height) {
            console.log(width, height);
            $scope.$broadcast('rebuild:scrollbar');
        }
    }

    FromDemoController.$inject = ['$scope', '$filter', 'Projects'];

    function FromDemoController($scope, $filter, Projects) {

        /*var vm = this;

        Projects.get({projectId: '5eba304b-47ad-4871-b98f-7563b1576f80'}, function (project) {
            vm.project = project.data;
        });

        $scope.AccountInvalidCallback = function (element, validMessage, validation) {
            console.log(arguments);
        };
        $scope.AccountValidCallback = function (element, validMessage, validation) {
            console.log(arguments);
        };
        $scope.onChange = function () {
            return updateTags;
        };

        function updateTags(tag, model) {
            Projects.update({
                projectId: vm.project.id
            }, {
                project: {tags: model}
            });
        }*/
    }

})();
