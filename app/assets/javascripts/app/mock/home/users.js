(function () {
    'use strict';
    Mock
        .mock('/friends', {
            'data|10-20':[{
                id:'@guid',
                name:'@name',
                avatar: '@avatar'
            }]
        })
        .mock('/groups', {
            'data|5-10':[{
                id:'@guid',
                name:'@title(10,20)'
            }]
        })
        .mock('/groups/:groupId', {
            'data|10-20':[{
                id:'@guid',
                name:'@name',
                avatar: '@avatar'
            }]
        })
        .mock('/project/members', 'GET', {
            'data|10-20':[{
                id:'@guid',
                name:'@name',
                avatar: '@avatar'
            }]
        })
        .mock('/project/teachers', 'GET', {
            'data|10-20':[{
                id:'@guid',
                name:'@name',
                avatar: '@avatar'
            }]
        })
        .mock('/project/members/:memberId', 'POST', {
            data:{ success: true }
        });

})();
