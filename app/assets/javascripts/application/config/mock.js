(function () {
    'use strict';

    Mock.Random.extend({
        constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
        constellation: function () {
            return this.pick(this.constellations);
        },
        genders: ['Male', 'Female'],
        gender: function () {
            return this.pick(this.genders);
        },
        avatars: ['FktEdgPtxNrzo5rFX4tBnHu6cpYe', 'FlBfZhI80eSrloIRndAf7Vk_5ikE', 'FlH_xNuoG_bXavQ2VaEfPma1tVFA', 'FlPt_eC1NjQzDLnkhIIgsu4z_Wg3'],
        avatar: function () {
            return this.pick(this.avatars);
        },
        roles: ['SuperMaster', 'Master', 'Teacher', 'Student', 'Parent'],
        role: function () {
            return this.pick(this.roles);
        },
        subjects: function () {
            return ['语文', '数学', '自然科学'].map(function (v) {
                return {
                    id: Mock.Random.guid(),
                    title: v
                };
            });
        },
        subject: function () {
            return this.pick(this.subjects);
        },
        grades: ['一年级', '二年级', '三年级', '四年级', '五年级'],
        grade: function () {
            return this.pick(this.grades);
        },
        skills : ['21世纪技能', 'Scans技能', 'John Thomas技能', '知识时代必备技能'],
        skill: function () {
            return this.pick(this.skills);
        },
        skillObject: function () {
            return this.pick(this.skills.map(function (v) {
                return {
                    id: Mock.Random.guid(),
                    title: v
                };
            }));
        },
        categories: ['学习和创新技能', '创造和革新技能', '批判性思维和解决问题的能力', '交流与合作', '信息、媒体和技术技能', '生活和职业技能'],
        category: function () {
            return this.pick(this.categories);
        },
        percent: function () {
            return Random.integer(10,50) + '%';
        }
    });

    /*Mock
        .mock('/posts', {
            'data|1-15': [{
                'id|+1': 1,
                'title': '@title',
                'liked|1-100': 100,
                'content': '@paragraph(2)'
            }]
        })
        .mock('/posts/:postId', {
            'id|1-15': 1,
            'title': '@title',
            'liked|1-100': 100,
            'content': '@paragraph(2)'
        })
        .mock('/pbls', {
            'data|1-15': [{
                'id|+1': 1,
                'title': '@title',
                'liked|1-100': 100,
                'content': '@paragraph(2)'
            }]
        })
        .mock('/pbls/:pblId', {
            'id|1-15': 1,
            'title': '@title',
            'liked|1-100': 100,
            'content': '@paragraph(2)'
        })
        .mock('/user', 'GET', {
            'id': '@guid',
            'name': '@name',
            'role': '@role',
            'email': '@email',
            'age|15-50': 50,
            'constellation': '@constellation',
            'gender': '@gender',
            'avatar': '@avatar'
        });*/

})();