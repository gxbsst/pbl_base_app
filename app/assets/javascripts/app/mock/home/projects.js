(function () {
    'use strict';
    Mock

        ////查询PBL列表
        //.mock('/projects', {
        //    'data|1-20':[{
        //        'id':'@GUID',
        //        'title':'@TITLE'
        //    }]
        //})
        //
        ////创建一个新的PBL，返回PBL的ID，空标题的PBL作为未命名的PBL
        //.mock('/projects', 'POST', {
        //    'data': {'id':'@GUID'}
        //})
        //
        ////提交一个PBL表单,UPDATE
        //.mock('/projects/:projectId', 'PUT', {
        //    'data': {'result':'success'}
        //})
        //
        ////删除一个PBL表单,DELETE,暂时不用
        //.mock('/projects', 'DELETE', {
        //    'data': {'result':'success'}
        //})
        //
        ////调用一个PBL
        //.mock('/projects/:projectId', 'GET', {
        //    'data': {
        //        'id': '@GUID',
        //        'project_name': '@TITLE',
        //        'standards|1-5':[{
        //            'id': '@GUID',
        //            'title': '@TITLE'
        //        }],
        //        'skills|1-5':[{
        //            'id': '@GUID',
        //            'title': '@TITLE'
        //        }],
        //        'driven_issue': '@PARAGRAPH',
        //        'standard_analysis':'@PARAGRAPH',
        //        'standard_decompositions|1-5':[{
        //            'id':'@GUID',
        //            'verb':'@TITLE',
        //            'noun':'@TITLE',
        //            'role':'@TITLE',
        //            'products':'@TITLE',
        //            'skill':'@TITLE'
        //        }],
        //        'final_product':{
        //            'worksform':{
        //                'id':'@GUID',
        //                'title': '@TITLE'
        //            },
        //            'description': '@PARAGRAPH',
        //            'example': '@GUID'
        //        },
        //        'stage_products|1-10':[{
        //            'id':'@GUID',
        //            'worksform':{
        //                'id':'@GUID',
        //                'title': '@TITLE'
        //            },
        //            'description': '@PARAGRAPH',
        //            'example': ['@GUID']
        //        }],
        //        'gauges':{
        //
        //        },
        //        'knowledge':[],
        //        'task':{
        //            'description':'@PARAGRAPH',
        //            'site': '@TITLE',
        //            'teacher_tools': '@TITLE',
        //            'student_tools': '@TITLE',
        //            'types':'@ID',
        //            'test':{
        //                'discipline':{
        //                    'id': '@GUID',
        //                    'title': '@TITLE'
        //                }
        //            },
        //            'evaluation':{
        //                'duration':{
        //                    'time_span': '@integer',
        //                    'cycle': {
        //                        'id': '@GUID',
        //                        'title': '@TITLE'
        //                    }
        //                },
        //                'results':{
        //                    'id':'@GUID',
        //                    'worksform':{
        //                        'id':'@GUID',
        //                        'title': '@TITLE'
        //                    },
        //                    'description': '@PARAGRAPH',
        //                    'example': ['@GUID']
        //                },
        //                'gauge':{}
        //            },
        //            'event':{
        //                'duration':{
        //                    'time_span': '@integer',
        //                    'cycle': {
        //                        'id': '@GUID',
        //                        'title': '@TITLE'
        //                    }
        //                }
        //            },
        //            'resource|1-3':[{
        //                'id': '@GUID',
        //                'title': '@TITLE',
        //                'type':'@TITLE'
        //            }]
        //        }
        //    }
        //})

        //获取作品形态列表
        .mock('/worksforms', {
            'data|20':[{
                'id':'@GUID',
                'title':'@TITLE',
                'explain':'@PARAGRAPH'
            }]
        })
        .mock('/projects/:projectId/gauges', 'GET', {
            'data|2-5':[{
                'id':'@guid',
                'gauge':['@skill', '@name', '@percent', '@title', '@title', '@title', '@title', '@title']
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