/**
 * Created by xi.chen on 2014/12/8.
 */
(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('articleNewsIndexController', articleNewsIndexController)
    ;

    articleNewsIndexController.$inject = ['articleNews', '$http'];

    function articleNewsIndexController(articleNews) {
        var vm = this;
        articleNews.all(function(data){
            vm.articleNews =data.data;
        });
    }

})();