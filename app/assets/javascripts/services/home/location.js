(function () {
    'use strict';

    angular
        .module('app.services')
        .service('Location1', Location1)
        .service('Location2', Location2)
        .service('Location3', Location3)
        .service('Location4', Location4)
        .service('Location', Location)
    ;

    Location1.$inject = ['$resource', 'RESOURCE_ACTIONS'];
    Location2.$inject = ['$resource', 'RESOURCE_ACTIONS'];
    Location3.$inject = ['$resource', 'RESOURCE_ACTIONS'];
    Location4.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Location1($resource, RESOURCE_ACTIONS) {
        console.log($resource);
        return function(){
            this.all=function(){return{data:[
                {id:'1',title:'北京市'},{id:'22',title:'天津市'},{id:'44',title:'上海市'},{id:'66',title:'重庆市'},
                {id:'108',title:'河北省'},{id:'406',title:'山西省'},{id:'622',title:'内蒙古'},{id:'804',title:'辽宁省'},
                {id:'945',title:'吉林省'},{id:'1036',title:'黑龙江省'},{id:'1226',title:'江苏省'},{id:'1371',title:'浙江省'},
                {id:'1500',title:'安徽省'},{id:'1679',title:'福建省'},{id:'1812',title:'江西省'},{id:'1992',title:'山东省'},
                {id:'2197',title:'河南省'},{id:'2456',title:'湖北省'},{id:'2613',title:'湖南省'},{id:'2822',title:'广东省'},
                {id:'3015',title:'广西'},{id:'3201',title:'海南省'},{id:'3235',title:'四川省'},{id:'3561',title:'贵州省'},
                {id:'3728',title:'云南省'},{id:'3983',title:'西藏'},{id:'4136',title:'陕西省'},{id:'4334',title:'甘肃省'},
                {id:'4499',title:'青海省'},{id:'4588',title:'宁夏'},{id:'4624',title:'新疆'},{id:'4802',title:'香港'},
                {id:'4822',title:'澳门'},{id:'4825',title:'台湾省'}
            ]}
            }
        }
    }
    function Location2($resource, RESOURCE_ACTIONS) {
        return function(){
            this.all=[
                {id:'45',title:'上海市'}
            ]
        }
    }
    function Location3($resource, RESOURCE_ACTIONS) {
        return function(){
            this.all=[
                {id:'46',title:'黄浦区'},{id:'47',title:'卢湾区'},{id:'48',title:'徐汇区'},
                {id:'49',title:'长宁区'},{id:'50',title:'静安区'},{id:'51',title:'普陀区'},
                {id:'52',title:'闸北区'},{id:'53',title:'虹口区'},{id:'54',title:'杨浦区'},
                {id:'55',title:'闵行区'},{id:'56',title:'宝山区'},{id:'57',title:'嘉定区'},
                {id:'58',title:'浦东新区'},{id:'59',title:'金山区'},{id:'60',title:'松江区'},
                {id:'61',title:'青浦区'},{id:'62',title:'南汇区'},{id:'63',title:'奉贤区'},
                {id:'64',title:'崇明县'},{id:'65',title:'城桥镇'}
            ]
        }
    }
    function Location4($resource, RESOURCE_ACTIONS) {
        return function(){
            this.all=[
                {id:'46',title:'黄浦区'}
            ]
        }
    }




    Location.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Location($resource, RESOURCE_ACTIONS) {
        return $resource('/disciplines/:disciplineId', {disciplineId: '@disciplineId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();