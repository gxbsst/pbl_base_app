(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('typeFilter', typeFilter);

    function typeFilter() {
        return function (type) {
            switch (type){
                case 'Teacher':
                    type='老师';
                    break;
                case 'Parent':
                    type='父母';
                    break;
                case 'Student':
                    type='学生';
                    break;
            }
            return type;
        }
    }

})();