(function () {
    'use strict';

    angular.module('app', [
        'app.mock',
        'app.modules',
        'app.config',
        'app.i18n',
        'app.filters',
        'app.services',
        'app.directives',
        'app.directives.datetime',
        'app.pbl'
    ]);

})();