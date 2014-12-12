(function () {
    'use strict';

    angular
        .module('app.selector', ['ui.select', 'ngSanitize'])
        .config(selectConfig);

    selectConfig.$inject = ['uiSelectConfig'];

    function selectConfig(uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
    }

})();