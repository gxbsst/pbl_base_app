(function () {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['zh-cn'] = {

            SITE: {
                name: '桥 ● 全球教育共同体'
            },

            DIRECTIVE: {
                Collapse: '收起',
                Expand: '展开',
                SelectDefaultLabel: '请选择'
            },

            GAUGE_HEAD: [
                ['不及格', '及格', '一般', '良好', '优秀'],
                ['A', 'B', 'C', 'D', 'E'],
                ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
            ],

            VALIDATION: {
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

            NAV: {
                logo: 'logo_zh-cn',
                news: '新闻动态',
                home: '个人中心',
                pbl: '项目案例',
                amoocs: '爱慕课',
                explore: '发现'
            },

            ARTICLE: {
                news: '新闻',
                publications: '发表',
                pbl: 'PBL',
                moocs: '慕课'
            },

            guide: '步骤%1',
            create: '创建',
            'hello world': '你好，世界!',
            'Pane examples': '面板示例',
            Pane: '面板%1',
            Modal: '模态窗口%1',
            tab: '选项卡%1',
            column: '第%1列',
            up: '上',
            down: '下',
            img: 'http://www.jingwentian.com/avatar/large/1.png',
            next: '下一步',
            prev: '上一步',
            username: '用户名：',
            'enter username': '请输入用户名',
            'all posts': '所有动态'

        };

    }
})();