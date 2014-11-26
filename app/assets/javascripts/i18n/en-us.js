(function() {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['en-us'] = {

            DIRECTIVE:{
                Collapse: 'Collapse',
                Expand: 'Expand'
            },

            'hello world': 'Hello world!',
            'Pane examples': 'Pane examples',
            Pane: 'Pane%1',
            Modal: 'Modal dialog %1',
            tab: 'Tab%1',
            column: 'Column%1',
            up: 'Up',
            down: 'Down',
            img: 'http://dl.iteye.com/upload/attachment/0080/6960/261b91b3-4fc0-349a-892c-157a58c403bb.jpg',
            username: 'Username: ',
            'enter username': 'please enter username'

        };
    }
})();