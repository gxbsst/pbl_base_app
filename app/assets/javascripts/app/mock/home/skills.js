(function () {
    'use strict';
    Mock
        .mock('/skills', {
            'data':'@skills'
        })
        .mock('/skills/:skillId', {
            'data|2-5':[{
                'id|+1':100,
                'title':'@categories'
            }]
        })
        .mock('/skills/categories/:categorieId', {
            'data|2-5':[{
                'id|+1':100,
                'title':'@title',
                'children|1-5':[{
                    'id|+1':100,
                    'title': '@title'
                }]
            }]
        })
        .mock('/projects/:projectId/skills', 'GET', {
            'data|1-5':[{
                'id|+1':100,
                'title': '@title'
            }]
        })
        .mock('/projects/:projectId/skills', 'POST', {
            'id|+1':100,
            'title': '@title'
        })
        .mock('/projects/:projectId/skills/:skillId', 'DELETE', {
            success: true
        })
        .mock('/projects/:projectId/skills/:skillId', {
            'data|1-5':[{
                'id|+1':100,
                'title': '@title'
            }]
        });

})();
