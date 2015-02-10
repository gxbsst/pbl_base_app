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
                data: [{key: 1, title: '一年级'}, {key: 2, title: '二年级'}, {key: 3, title: '三年级'},
                    {key: 4, title: '四年级'}, {key: 5, title: '五年级'}, {key: 6, title: '六年级'},
                    {key: 7, title: '七年级'}, {key: 8, title: '八年级'}, {key: 9, title: '九年级'}]
            };
        }
    }

    ProjectTechnique.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function ProjectTechnique($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {data: [{key: 'SCANS技能', title: 'SCANS技能'}, {key: 'enGauge 21世纪技能', title: 'enGauge 21世纪技能'},
                {key: '7C技能', title: '7C技能'}, {key: '21世纪技能', title: '21世纪技能'}]};
        }
    }
})();