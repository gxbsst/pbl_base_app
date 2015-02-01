(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('typeFilter', typeFilter);

    function typeFilter() {
        return function (type) {
            return {
                Teacher: '老师',
                Student: '学生',
                Parent: '家长'
            }[type] || '';
        }
    }

})();