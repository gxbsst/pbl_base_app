(function() {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['en-us'] = {

            SITE: {
                name: 'Bridges ● Developing a global educational community'
            },

            DIRECTIVE:{
                Collapse: 'Collapse',
                Expand: 'Expand',
                SelectDefaultLabel: 'Select'
            },

            VALIDATION:{
                required: {
                    error: 'This should be Required!!',
                    success: 'It\'s Required'
                },
                account: {
                    error: 'Account is error!',
                    success: 'It\'s Required'
                },
                url: {
                    error: 'This should be Url',
                    success: 'It\'s Url'
                },
                email: {
                    error: 'This should be Email',
                    success: 'It\'s Email'
                },
                number: {
                    error: 'This should be Number',
                    success: 'It\'s Number'
                }
            },

            NAV: {
                logo: 'logo_en-us',
                news: 'News',
                home: 'Home',
                pbl: 'PBL',
                amoocs: 'AMoocs',
                explore: 'Explore'
            },

            guide: 'Guide%1',
            create: 'Create',
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
            'enter username': 'please enter username',
            'all posts': 'All posts'

        };
    }
})();