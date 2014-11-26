(function () {

    if (!document.querySelector)
        document.querySelector = function (selector) {
            var head = document.documentElement.firstChild;
            var styleTag = document.createElement("STYLE");
            head.appendChild(styleTag);
            document.__qsResult = [];

            styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsResult.push(this))}";
            window.scrollBy(0, 0);
            head.removeChild(styleTag);

            var result = [];
            for (var i in document.__qsResult)
                result.push(document.__qsResult[i]);
            return result;
        }

})();