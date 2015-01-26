(function () {
    'use strict';

    angular
        .module('app.i18n')
        .config(configure);

    configure.$inject = ['i18nConfigProvider'];

    function configure(i18nConfigProvider) {
        i18nConfigProvider.locales['zh-cn'] = {

            SITE: {
                name: '北京欧亚融信信息技术有限公司'
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

            ERRORS: {
                username_required: '帐号必须填写',
                username_invalid: '帐号必须由英文字母、数字或者下划线组成，并且以字母开头，长度在4-16位之间',
                username_taken: '帐号名已被使用',
                email_required: '邮箱地址必须填写',
                email_email_format: '邮箱地址格式不正确',
                email_taken: '邮箱地址已存在',
                password_required: '密码必须填写',
                password_invalid: '密码长度不能少于4位',
                gender_required: '请选择您的性别',
                relation_required: '请选择您与学生的关系',
                realname_required: '真实姓名必须填写',
                realname_invalid: '真实姓名只能包含汉字、字母及空格'
            },

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


            worktypes: {
                undue:'未开始',
                opening:'已开始',
                working:'修改中',
                submitted:'未批改',
                evaluating:'评分中',
                evaluated:'已评分'
            },
            projecttypes: {
                all:'全部',
                draft:'草稿',
                release:'进行中',
                completed:'已完成'
            },
            projectlist: {
                user_id:'我创建的项目',
                actor_id:'我参与的项目'
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