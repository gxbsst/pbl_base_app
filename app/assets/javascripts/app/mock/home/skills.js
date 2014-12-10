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
        });

})();
