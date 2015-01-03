(function () {
    'use strict';
    Mock

        //查询新闻列表
        .mock('/articles/news', {
            'data|1-10':[{
                'id':'@GUID',
                'pic':'@DATAIMAGE("100x75")',
                'photo':'@DATAIMAGE("50x50")',
                'title':'@TITLE',
                'author' : '@FIRST @LAST',
                'authorpic':'@DATAIMAGE("20x20")',
                'thumbnail' : '@avatar',
                'time':'@DATE'
            }]
        })

        //创建一个新的PBL，返回PBL的ID，空标题的PBL作为未命名的PBL
//        .mock('/projects', 'POST', {
//            'id':'@GUID'
//        })

        //调用一个PBL的扁平结构
//        .mock('/projects/:projectId', 'GET', {
//            'data': {
//                'id': '@GUID',
//                'project_name': '@TITLE',
//                'curriculum_standards|1-5':[{
//                    'id': '@GUID',
//                    'title': '@TITLE'
//                }],
//                'skills|1-5':[{
//                    'id': '@GUID',
//                    'title': '@TITLE'
//                }],
//                'driven_issue': '@PARAGRAPH',
//                'standard_analysis':'@PARAGRAPH',
//                'standard_decomposition|1-5':[{
//                    'id':'@GUID',
//                    'verb':'@TITLE',
//                    'noun':'@TITLE',
//                    'role':'@TITLE',
//                    'products':'@TITLE',
//                    'skill':'@TITLE'
//                }],
//                'final_product':{
//                    'form':{
//                        'id':'@GUID',
//                        'title': '@TITLE'
//                    },
//                    'description': '@PARAGRAPH',
//                    'example': '@GUID'
//                },
//                'stage_products|1-10':[{
//                    'id':'@GUID',
//                    'form':{
//                        'id':'@GUID',
//                        'title': '@TITLE'
//                    },
//                    'description': '@PARAGRAPH',
//                    'example': ['@GUID']
//                }]
//            }
//        })

        //提交一个PBL表单,UPDATE
//        .mock('/projects/:projectId', 'PUT', {
//            'result':'success'
//        })

        //删除一个PBL表单,DELETE,暂时不用
//        .mock('/projects', 'delete', {
//            'result':'success'
//        })
        ;

})();