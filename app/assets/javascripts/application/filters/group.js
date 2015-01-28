(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('group', group);

    group.$inject = ['$filter'];

    function group($filter) {
        return function(group){
            if(group.clazz){
                return $filter('grade')(group.clazz.grade_id) + group.clazz.name;
            }else{
                return group.name;
            }
        }

    }

})();