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
        }
    });

    function Item() {
    }

    Item.prototype.add = function (url, method) {
        var result = null;
        angular.forEach(Mock._mocked, function (value) {
            if (new RegExp('^' + value.rurl.replace(/:.\w+/g, '\\w+').replace(/\//g, '\\/') + '$').test(url) && (value.rtype || 'GET') === method) {
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
                            config.method = "GET";
                            config.url = "?mockUrl=" + config.url;
                        }
                        return config;
                    },
                    response: function (response) {
                        var original = response.config.original;
                        if (original) {
                            response.data = original.result;
                            console.log('[' + original.method + '] ' + original.url + ' => ', original.result);
                        }
                        return response;
                    }
                };
            });
        });

})();