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

            VALIDATION:{
                required: {
                    error: '此处不能为空！',
                    success: '已填写'
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

            'hello world': '你好，世界!',
            'Pane examples': '面板示例',
            Pane: '面板%1',
            Modal: '模态窗口%1',
            tab: '选项卡%1',
            column: '第%1列',
            up: '上',
            down: '下',
            img: 'http://www.jingwentian.com/avatar/large/1.png',
            username: '用户名：',
            'enter username': '请输入用户名'

        }
    }
})();