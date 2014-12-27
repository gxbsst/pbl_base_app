(function () {
    'use strict';
    Mock

        //查询PBL列表
        /*.mock('/projects', {
            'data|1-20':[{
                'id':'@GUID',
                'title':'@TITLE'
            }]
        })*/

        //创建一个新的PBL，返回PBL的ID，空标题的PBL作为未命名的PBL
        /*.mock('/projects', 'POST', {
            'data': {'id':'@GUID'}
        })*/

        //提交一个PBL表单,UPDATE
        /*.mock('/projects/:projectId', 'PUT', {
            'data': {'result':'success'}
        })*/

        //删除一个PBL表单,DELETE,暂时不用
        /*.mock('/projects', 'DELETE', {
            'data': {'result':'success'}
        })*/

        //调用一个PBL
        /*.mock('/projects/:projectId', 'GET', {
            'data': {
                'id': '@GUID',
                'project_name': '@TITLE',
                'standards|1-5':[{
                    'id': '@GUID',
                    'title': '@TITLE'
                }],
                'skills|1-5':[{
                    'id': '@GUID',
                    'title': '@TITLE'
                }],
                'driven_issue': '@PARAGRAPH',
                'standard_analysis':'@PARAGRAPH',
                'standard_decompositions|1-5':[{
                    'id':'@GUID',
                    'verb':'@TITLE',
                    'noun':'@TITLE',
                    'role':'@TITLE',
                    'products':'@TITLE',
                    'skill':'@TITLE'
                }],
                'final_product':{
                    'worksform':{
                        'id':'@GUID',
                        'title': '@TITLE'
                    },
                    'description': '@PARAGRAPH',
                    'example': [{
                        'id': '@GUID',
                        'title': '@TITLE',
                        'ext':'@TITLE'
                    }]
                },
                'stage_products|1-10':[{
                    'id':'@GUID',
                    'title': '@TITLE',
                    'worksform':{
                        'id':'@GUID',
                        'title': '@TITLE'
                    },
                    'description': '@PARAGRAPH',
                    'example': [{
                        'id': '@GUID',
                        'title': '@TITLE',
                        'ext':'@TITLE'
                    }]
                }],
                'gauges':{

                },
                'knowledge|3-5':['@TITLE'],
                'tasks|2-2':[{
                    'id':'@GUID',
                    'description':'@PARAGRAPH',
                    'site': '@TITLE',
                    'teacher_tools': '@TITLE',
                    'student_tools': '@TITLE',
                    'tasktype':'@NATURAL(1, 3)',
                    'test':{
                        'discipline':{
                            'id': '@GUID',
                            'title': '@TITLE'
                        }
                    },
                    'evaluation':{
                        'duration':{
                            'time_span': '@NATURAL(1, 24)',
                            'cycle': {
                                'id': '@GUID',
                                'title': '@TITLE'
                            }
                        },
                        'results':{
                            'id':'@GUID',
                            'title': '@TITLE',
                            'worksform':{
                                'id':'@GUID',
                                'title': '@TITLE'
                            },
                            'description': '@PARAGRAPH',
                            'example': ['@GUID']
                        },
                        'gauge':{}
                    },
                    'event':{
                        'duration':{
                            'time_span': '@NATURAL(1, 24)',
                            'cycle': {
                                'id': '@GUID',
                                'title': '@TITLE'
                            }
                        }
                    },
                    'resources|1-3':[{
                        'id': '@GUID',
                        'title': '@TITLE',
                        'ext':'@TITLE'
                    }]
                }],
                'duration':'@NATURAL(1, 24)',
                'duration_unit'=:'@NATURAL(1, 3)',
                'public':'@BOOLEAN',
                'tag_list':[],
                'description':'@TITLE'
            }
        })*/

        //获取产品形态列表
        .mock('/worksforms', {
            'data|20':[{
                'id':'@GUID',
                'title':'@TITLE',
                'explain':'@PARAGRAPH'
            }]
        })

        //获取学科列表
        //.mock('/disciplines', {
        //    'data|20':[{
        //        'id':'@GUID',
        //        'title':'@TITLE'
        //    }]
        //})

        .mock('/projects/:projectId/gauges', 'GET', {
            'data|2-5':[{
                id:'@guid',
                technique: '@skillObject',
                standard: '@title',
                gauge: '@guid',
                'weight|10-60': 1,
                level_1: '@title',
                level_2: '@title',
                level_3: '@title',
                level_4: '@title',
                level_5: '@title'
            }]
        })
        .mock('/projects/:projectId/gauges', 'POST', {
            'data': {'result':'success'}
        })
        .mock('/projects/:projectId/gauges/:gaugeId', 'PUT', {
            'data': {'result':'success'}
        })
        .mock('/projects/:projectId/gauges/:gaugeId', 'DELETE', {
            'data': {'result':'success'}
        })
        ;
})();