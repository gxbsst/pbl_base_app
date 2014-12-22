/**
 * Created by xi.chen on 2014/12/8.
 */

(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('articlePblsIndexController', articlePblsIndexController)
    ;

    articlePblsIndexController.$inject = ['articlePbls', '$http'];

    function articlePblsIndexController(articlePbls) {
        var vm = this;
        articlePbls.all(function(data){
            vm.articlePbls =data.data;
        });
    }

})();