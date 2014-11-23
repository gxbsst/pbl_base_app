(function() {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['zh-cn'] = {

            DIRECTIVE:{
                Collapse: '收起',
                Expand: '展开'
            },

            'hello world': '你好，世界!',
            'Pane examples': '面板示例',
            Pane: '面板%1',
            Modal: '模态窗口',
            tab: '选项卡%1',
            column: '第%1列',
            up: '上',
            down: '下',
            img: 'http://www.jingwentian.com/avatar/large/1.png'

        }
    }
})();