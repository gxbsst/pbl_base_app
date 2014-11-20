(function() {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['zh-cn'] = {
            'hello world': '你好，世界!'
        }
    }
})();