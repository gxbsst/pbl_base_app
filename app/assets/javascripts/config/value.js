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
            DEFAULTS: {
                avatars: {
                    user: 'default-avatar-user',
                    group: 'default-avatar-group'
                }
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
                buckets: {
                    image: 'mooc-images',
                    'static': 'mooc-attachments',
                    video: 'mooc-video',
                    mp4: 'mooc-video-mp4',
                    ogv: 'mooc-video-ogv'
                },
                upload: 'http://up.qiniu.com',
                mp4: 'http://mooc-video-mp4.qiniudn.com',
                ogv: 'http://mooc-video-ogv.qiniudn.com',
                image: 'http://mooc-images.qiniudn.com'
            },
            RESOURCE_TYPES: {
                project: {
                    project: 'Project',
                    cover: 'ProjectCover',
                    document: 'ProjectDocument',
                    product: 'ProductSample',
                    resource: 'ProjectResource',
                    task: 'TaskResource'
                }
            },
            ROLES: {
                teacher: 'Teacher',
                student: 'Student'
            },
            DURATION_UNITS: [
                {id: 1, title: '小时'},
                {id: 2, title: '天'},
                {id: 3, title: '周'}
            ],
            GRADES: [
                {id: 1, title: '一年级'},
                {id: 2, title: '二年级'},
                {id: 3, title: '三年级'},
                {id: 4, title: '四年级'},
                {id: 5, title: '五年级'},
                {id: 6, title: '六年级'},
                {id: 7, title: '七年级'},
                {id: 8, title: '八年级'},
                {id: 9, title: '九年级'}
            ]
        })
})();