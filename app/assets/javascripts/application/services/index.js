(function () {
    'use strict';

    angular
        .module('app.services')
        .service('TeacherSaying', TeacherSaying)
        .service('Links', Links)
        .service('Learning', Learning);

    TeacherSaying.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function TeacherSaying($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {
                data:[{name:'黎加厚',cover:'FtfCsegGl2m1NRX4hUGGqgCdl7_A',cont:'基于项目的学习是以学习研究学科的概念和原理为中心，通过学生参与一个活动项目的调查和研究来解决问题，以构建起他们自己的知识体系，并能运用到现实社会当中去。',title:'上海师范大学教授'},
                    {name:'刘延申',cover:'FqfYppggBoiGHMiwJZo9vk2QIuiB',cont:'项目学习是学生通过亲自调研，查阅文献，收集资料，分析研究，撰写论文等讲学到得理论知识和现实生活中的实际问题紧密结合，得到综合训练和提高。',title:'华中师范大学教授'},
                    {name:'Thom Markham',cover:'FlNfmoOhnuz-DldjtckufXkGUy2C',cont:'PBL teaches doing as well as knowing. Students acquire knowledge, but they also apply what they learn to solve authentic problems and produce results that matter。',title:'PBL教育专家'}]
            };
        }
    }

    Links.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Links($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {
                data: [{title:'BIE',link:'http://bie.org',cover:'FrDWsz9irOCMggMP95kT2n4GfHnG'},
                    {title:'Edutopia',link:'http://www.edutopia.org',cover:'Fso0isiWXJlOK_G2cFtec24yjvnK'},
                    {title:'Thommarkham',link:'http://www.thommarkham.com',cover:'FvNNu2zA00l4rAkdaTJvr1wzCfBi'},
                    {title:'PBL Japan',link:'http://www.pbl-japan.com',cover:'Fl6BSi7JNQixArufRjssi6YQcANo'},
                    {title:'PBL World',link:'http://pblworld.org',cover:'FiKEXbdWs85hCtf2fXswmDK1m_X1'}]
            };
        }
    }

    Learning.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Learning($resource, RESOURCE_ACTIONS) {
        //return $resource('', {}, RESOURCE_ACTIONS);
        this.all=function() {
            return {
                data: [{title:'个性化的PBL：学生设计学习的过程',cont:'个性化的PBL项目学习是一种好的现象，无论学生身在何处，当他们花时间去学习，并参与那些驱使他们去学习的活动。将这些个性化的因素全部拼在一起，才能真正满足学生在学习需求和学习欲望上的道路。',cover:'FggFgUObFN40BPTkXktGSkLfEnIA'},
                {title:'PBL项目各个组成部分的设计原则',cont:'PBL项目设计需要在一开始就制定出合理而且可行的方案，但是这个可执行的方案，不仅仅要满足其学习的目的和视野的拓展，同时也要在各个方面满足其设计的原则。',cover:'FpRFcxgOG33wUGugfZI-ntTVVBbB'},
                {title:'PBL项目学习与传统教学的区别',cont:'PBL项目学习的最大特色，就是通过看似与课程无关的项目和问题入手，在解决问题完成项目的过程中，参与PBL的学生需要不断地学习积累，并将知识熟练地运用到解决问题的过程中去。',cover:'FnvQ28sGcmtnXEbMIdhvq60_lnlv'},
                {title:'PBL教学法 让孩子“学会”变“会学”',cont:'Project-based Learning，PBL（不同于Problem-Based Learning），是目前国际上比较流行的一种教学组织方式。通过项目学习，学生不仅要求掌握所学的知识，更主要的是培养一种技能与能力，就是运用原有的知识去获得新知识的技能与能力',cover:'Fq_2rYt0FrCmlhp5gGb5KyNW5Qb2'}]
            };
        }
    }
})();