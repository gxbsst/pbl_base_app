(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('clazz', clazz)
        .filter('group', group);

    group.$inject = ['$filter'];

    function group($filter) {
        return function(group){
            if(group.clazz){
                return $filter('grade')(group.clazz.grade_id) + group.clazz.name;
            }
            return group.name;
        }

    }

    clazz.$inject = ['$filter'];

    function clazz($filter) {
        return function(clazz){
            if(clazz){
                return $filter('grade')(clazz.grade_id) + clazz.name;
            }
            return '';
        }

    }

})();