(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('DemosController', DemosController)
        .controller('ModalDemoController', ModalDemoController)
        .controller('FromDemoController', FromDemoController)
        .controller('ScrollbarDemoController', ScrollbarDemoController);

    DemosController.$inject = ['$scope'];

    function DemosController($scope) {
        var vm = this;
        vm.view = 'demos/elements.html';

        $scope.person = {};
        $scope.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
            { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
            { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
        ];
        $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
        $scope.multipleDemo = {};
        $scope.multipleDemo.colors = ['Blue','Red'];
        $scope.multipleDemo.colors2 = ['Blue','Red'];
        $scope.multipleDemo.selectedPeople = [$scope.people[5], $scope.people[4]];
        $scope.multipleDemo.selectedPeople2 = $scope.multipleDemo.selectedPeople;
        $scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];
        $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];

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

    ModalDemoController.$inject = ['$scope', '$timeout'];

    function ModalDemoController($scope, $timeout){
        $scope.demo = 'Hi, modal!';
        $timeout(function () {
            $scope.demo = 'Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>Hi, modal!<br/>';
        },2000);
    }

    ScrollbarDemoController.$inject = ['$scope'];

    function ScrollbarDemoController($scope){
        $scope.someArray = [1, 2, 3];
        $scope.addItem = function() {
            var arrayLength = $scope.someArray.length;
            var nextValue = arrayLength > 0 ? $scope.someArray[arrayLength - 1] + 1 : 1;
            $scope.someArray.push(nextValue);
        };
        $scope.removeItem = function() {
            if ($scope.someArray.length) { $scope.someArray.pop(); }
        };
        $scope.onResize = function (width,height) {
            console.log(width,height);
            $scope.$broadcast('rebuild:scrollbar');
        }
    }

    FromDemoController.$inject = ['$scope', '$filter'];

    function FromDemoController($scope, $filter){
        $scope.AccountInvalidCallback = function (element, validMessage, validation) {
            console.log(arguments);
        };
        $scope.AccountValidCallback = function (element, validMessage, validation) {
            console.log(arguments);
        };
    }

})();
