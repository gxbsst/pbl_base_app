(function () {
    'use strict';
    Mock
        .mock('/standards', {
            'data':'@subjects'
        })
        .mock('/standards/:subjectId', {
            'data|2-5':[{
                'id|+1':100,
                'title':'@grade'
            }]
        })
        .mock('/standards/grades/:gradeId', {
            'data|2-5':[{
                'id|+1':100,
                'title':'@title',
                'children|1-5':[{
                    'id|+1':100,
                    'title': '@title'
                }]
            }]
        })
        .mock('/projects/:projectId/standards', 'GET', {
            'data|1-5':[{
                'id|+1':100,
                'title': '@title'
            }]
        })
        .mock('/projects/:projectId/standards', 'POST', {
            'id|+1':100,
            'title': '@title'
        })
        .mock('/projects/:projectId/standards/:standardId', 'DELETE', {
            success: true
        })
        .mock('/projects/:projectId/standards/:standardId', {
            'data|1-5':[{
                'id|+1':100,
                'title': '@title'
            }]
        });

})();