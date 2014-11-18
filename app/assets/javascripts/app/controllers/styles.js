(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('StylesController', StylesController);

    function StylesController() {
        var vm = this;
        vm.view = 'styles/elements.html';
    }

})();
