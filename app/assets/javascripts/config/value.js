(function () {
    'use strict';

    angular
        .module('app.config')
        .value({
            RESOURCE_ACTIONS: {
                all: {method: 'GET'},
                add: {method: 'POST'},
                update: {method: 'PUT'},
                remove: {method: 'DELETE'}
            },
            PATHS: {
                image: 'http://img.edutec.com',
                'static': 'http://static.edutec.com'
            },
            TOOLBARS: [
                {
                    icon: 'pf-user-heart',
                    src: 'home/toolbar/users.html'
                },
                {
                    icon: 'pf-users',
                    src: 'home/toolbar/groups.html'
                },
                {
                    icon: 'pf-doc-eye',
                    src: 'home/toolbar/articles.html'
                },
                {
                    icon: 'pf-bubble-star',
                    src: 'home/toolbar/recommends.html'
                },
                {
                    icon: 'pf-clock',
                    src: 'home/toolbar/histories.html'
                }
            ],
            QINIU: {
                upload: 'http://up.qiniu.com',
                mp4: 'http://mooc-video-mp4.qiniudn.com',
                ogv: 'http://mooc-video-ogv.qiniudn.com',
                image: 'http://mooc-images.qiniudn.com'
            },
            Cycles:[
                {'id':'1','title':'小时'},
                {'id':'2','title':'日'},
                {'id':'3','title':'周'}
            ]
        })
})();