(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Disciplines', Disciplines)
        .service('Cycles', Cycles);

    Disciplines.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Disciplines($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }


    Cycles.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Cycles($resource, RESOURCE_ACTIONS) {
            this.all=function(){
                return [{'id':'331FA6C3-F784-5518-5784-D7019EEDB434','title':'周'},
                {'id':'9753A0FD-7D3A-A296-2C6E-716741C21B40','title':'日'},
                {'id':'5B4C5A31-9DDB-1174-2BFB-6D8613B9E258','title':'小时'}
                ];
            }
    }

})();