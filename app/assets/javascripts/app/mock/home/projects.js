(function () {
    'use strict';
    Mock

        //查询PBL列表
        .mock('/pbls', {
            'pbls|1-20':[{
                'id':Random.guid(),
                'title':Random.title()
            }]
        })

        //创建一个新的PBL，返回PBL的ID，空标题的PBL作为未命名的PBL
        .mock('/pbls', 'post', {
            'pbl_id':Random.guid()
        })

        //调用一个PBL的扁平结构
        .mock('/pbls/:id', 'get', {
            'pbl': {
                'id': Random.guid(),
                'project_id': Random.guid(),
                'project_name': Random.title(),
                'curriculum_standards':[{
                    'id': Random.guid(),
                    'label': Random.title()
                }],
                'skills':[{
                    'id': Random.guid(),
                    'label': Random.title()
                }],
                'driven_issue': Random.paragraph(),
                'standard_analysis':Random.paragraph(),
                'standard_decomposition':[],
                'final_product':{
                    'form':{
                        'id':Random.guid(),
                        'title': Random.title()
                    },
                    'description': Random.paragraph(),
                    'example': Random.guid()
                },
                'stage_products':[{
                    'id':Random.guid(),
                    'form':{
                        'id':Random.guid(),
                        'title': Random.title()
                    },
                    'description': Random.paragraph(),
                    'example': [Random.guid()]
                }]
            }
        })

        //提交一个PBL表单,UPDATE
        .mock('/pbls', 'put', {
            '':'success'
        })

        //删除一个PBL表单,DELETE,暂时不用
        .mock('/pbls', 'delete', {
            '':'success'
        })
        ;

})();