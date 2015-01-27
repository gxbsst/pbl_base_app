(function () {
    'use strict';

    angular
        .extend(Object, {
            keys: function (object) {
                var results = [];
                for (var key in object) {
                    if (!/^\$/.test(key)) {
                        results.push(key);
                    }
                }
                return results;
            },
            values: function (object) {
                var results = [];
                for (var key in object){
                    if (!/^\$/.test(key)) {
                        results.push(object[key]);
                    }
                }
                return results;
            },
            size: function (object) {
                var size = 0;
                angular.forEach(object, function () {
                    size++;
                });
                return size;
            },
            clone : function(sObj){
                if(typeof sObj !== "object"){
                    return sObj;
                }
                var s = {};
                if(sObj.constructor == Array){
                    s = [];
                }
                for(var i in sObj){
                    s[i] = Object.clone(sObj[i]);
                }
                return s;
            },
            merge:function(tObj,sObj){
                for(var i in sObj){
                    if(sObj[i]){
                        if(typeof sObj[i] !== "object"){
                            tObj[i] = sObj[i];
                        }else if (sObj[i].constructor == Array){
                            tObj[i] = Object.clone(sObj[i]);
                        }else{
                            tObj[i] = tObj[i] || {};
                            Object.merge(tObj[i],sObj[i]);
                        }
                    }
                }
            }
});

})();