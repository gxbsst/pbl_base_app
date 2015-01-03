(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('thumb', thumb);

    thumb.$inject = ['PATHS'];

    function thumb(PATHS) {
        return function(key, opts, version){
            if(!key){
                return '';
            }
            if(/^[0-9]+$/.test(opts)){
                version = opts;
                opts = {};
            }
            version = version ? '&version=' + version : '';
            if(key.indexOf('?') > 0){
                return key + version;
            }
            var def = {
                imageView: 1,
                w: 100,
                h: 100,
                q: 90,
                format: 'JPG'
            };
            if(typeof opts == 'string'){
                if(/[0-9]x[0-9]/.test(opts)){
                    var o = opts.split('x');
                    opts = $.extend(def, {
                        w: o[0],
                        h: o[1]
                    });
                }else{
                    return [[PATHS.image, key].join('/'), opts].join('?') + version;
                }
            }else{
                opts = $.extend(def, opts || {});
            }
            var params = [];
            angular.forEach(opts, function(v ,n){
                params.push(n);
                params.push(v);
            });
            return [[PATHS.image, key].join('/'), params.join('/')].join('?') + version;
        }

    }

})();