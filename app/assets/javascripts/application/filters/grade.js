(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('grade', grade);

    grade.$inject = ['$filter', 'GRADES'];

    function grade($filter, GRADES) {
        return function(grade){
            grade = GRADES.findOne(function (item) {
                return item.id == grade;
            });
            if(grade){
                return grade.title;
            }
            return '';
        }

    }

})();