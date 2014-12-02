(function () {
    'use strict';

    Mock
        .mock('/posts', {
            'data|1-15': [{
                'id|+1': 1,
                'title': '@title',
                'liked|1-100': 100,
                'content': '@paragraph(2)'
            }]
        })
        .mock('/posts/:postId', {
            'id|1-15': 1,
            'title': '@title',
            'liked|1-100': 100,
            'content': '@paragraph(2)'
        })
        .mock('/user', 'POST', {
            'id': '@guid',
            'name': '@name',
            'role': '@role',
            'email': '@email',
            'age|15-50': 50,
            'constellation': '@constellation',
            'gender|1': '@gender',
            'avatar|1': '@avatar'
        });

})();