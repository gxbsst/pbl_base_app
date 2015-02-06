(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('clazz', clazz)
        .filter('group', group);

    group.$inject = ['$filter'];

    function group($filter) {
        return function(group){
            var name = group.name;
            if(group.clazz){
                name = $filter('grade')(group.clazz.grade_id) + group.clazz.name;
                if(group.owner_type == 'Parent'){
                    name += '(家长群)';
                }
            }
            return name;
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