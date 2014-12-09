(function () {
    'use strict';
    Mock
        .mock('/standards', {
            'data':'@subjects'
        })
        .mock('/standards/:subjectId', {
            'data|2-5':[{
                'id|+1':100,
                'name':'@grade'
            }]
        })
        .mock('/standards/grades/:gradeId', {
            'data|2-5':[{
                'id|+1':100,
                'name':'@title',
                'children|1-5':[{
                    'id|+1':100,
                    'name': '@title'
                }]
            }]
        });

})();