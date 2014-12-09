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
        ////调用一个PBL的扁平结构
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
        //        }
        //    }
        //})
        //
        ////提交一个PBL表单,UPDATE
        //.mock('/projects/:projectId', 'PUT', {
        //    'data': {'result':'success'}
        //})
        //
        ////删除一个PBL表单,DELETE,暂时不用
        //.mock('/projects', 'delete', {
        //    'data': {'result':'success'}
        //})


        //获取作品形态列表
        .mock('/worksforms', {
            'data|20':[{
                'id':'@GUID',
                'title':'@TITLE',
                'explain':'@PARAGRAPH'
            }]
        })
        ;

})();