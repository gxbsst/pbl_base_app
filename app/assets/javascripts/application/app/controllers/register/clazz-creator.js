(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ClazzCreatorController', ClazzCreatorController);

    ClazzCreatorController.$inject = ['$scope', 'Clazzs'];

    function ClazzCreatorController($scope, Clazzs) {

        var vm = this,
            user = $scope.user;

        vm.clazz = {
            school_id: user.school_id,
            grade_id: user.grade_id
        };
        vm.check = check;
        vm.create = create;

        function check() {
            return vm.clazz.school_id && vm.clazz.grade_id && vm.clazz.name;
        }

        function create() {
            Clazzs.add({
                clazz: vm.clazz
            }, function (result) {
                $scope.$emit('onClazzs', result.data);
                $scope.destroyModal();
            });
        }

    }
})();
