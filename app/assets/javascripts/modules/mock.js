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
                    name: v
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
        skills: ['21世纪技能', 'Scans技能', 'John Thomas技能', '知识时代必备技能'],
        skill: function () {
            return this.pick(this.skills);
        },
        categories: ['学习和创新技能', '创造和革新技能', '批判性思维和解决问题的能力', '交流与合作', '信息、媒体和技术技能', '生活和职业技能'],
        category: function () {
            return this.pick(this.categories);
        }
    });

    function Item() {
    }

    Item.prototype.add = function (url, method) {
        var result = null;
        angular.forEach(Mock._mocked, function (value) {
            if (new RegExp('^' + value.rurl.replace(/:[A-Za-z0-9-%]+/g, '[A-Za-z0-9-%]+').replace(/\//g, '\\/') + '$').test(url) && (value.rtype || 'GET') === method) {
                result = Mock.mock(value.template);
            }
        });
        return result;
    };

    angular
        .module('app.mock', [])
        .config(function ($httpProvider) {
            var item;
            item = new Item();
            return $httpProvider.interceptors.push(function () {
                return {
                    request: function (config) {
                        var result;
                        result = item.add(config.url, config.method);
                        if (result) {
                            config.original = {
                                url: config.url,
                                result: result,
                                method: config.method,
                                params: config.params,
                                data: config.data
                            };
                            config.data && console.log('[request  ' + config.method + '] ' + config.url + ' => ', config.data);
                            config.method = "GET";
                            config.url = "?mockUrl=" + config.url;
                        }
                        return config;
                    },
                    response: function (response) {
                        var original = response.config.original;
                        if (original) {
                            response.data = original.result;
                            console.log('[response ' + original.method + '] ' + original.url + ' => ', original.result);
                        }
                        return response;
                    }
                };
            });
        });

})();