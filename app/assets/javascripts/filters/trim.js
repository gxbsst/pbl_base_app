(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('trim', trim);

    trim.$inject = ['limitToFilter'];

    function trim(limitToFilter) {
        return function(input, limit) {
            if (input.length > limit) {
                return limitToFilter(input, limit-3) + '...';
            }
            return input;
        };
    }
})();

//
//function JHshStrLen(sString)
//{
//    var sStr,iCount,i,strTemp ;
//
//    iCount = 0 ;
//    sStr = sString.split("");
//    for (i = 0 ; i < sStr.length ; i ++)
//    {
//        strTemp = escape(sStr[i]);
//        if (strTemp.indexOf("%u",0) == -1) // 表示是汉字
//        {
//            iCount = iCount + 1 ;
//        }
//        else
//        {
//            iCount = iCount + 2 ;
//        }
//    }
//    return iCount ;
//}
