(function () {
    'use strict';

    angular
        .module('app.services')
        .service('ProjectSubject', ProjectSubject)
        .service('ProjectPhase', ProjectPhase)
        .service('ProjectTechnique', ProjectTechnique);

    ProjectSubject.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectSubject($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {
                data:[{key:'语文',title:'语文'},{key:'数学',title:'数学'},{key:'英语',title:'英语'},
                    {key:'地理',title:'地理'},{key:'历史',title:'历史'}]
            };
        }
    }

    ProjectPhase.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectPhase($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {
                data: [{key: '一年级', title: '一年级'}, {key: '二年级', title: '二年级'}, {key: '三年级', title: '三年级'},
                    {key: '四年级', title: '四年级'}, {key: '五年级', title: '五年级'}, {key: '六年级', title: '六年级'},
                    {key: '七年级', title: '七年级'}, {key: '八年级', title: '八年级'}, {key: '九年级', title: '九年级'}]
            };
        }
    }

    ProjectTechnique.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectTechnique($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {data: [{key: '学习技能', title: '学习技能'}, {key: '沟通技能', title: '沟通技能'}]};
        }
    }
})();