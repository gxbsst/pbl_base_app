(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etSlidershow', etSlidershow);

    etSlidershow.$inject = ['$document', '$timeout', 'utils'];

    function etSlidershow($document, $timeout, utils) {
        return {
            require: 'etSlidershow',
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'directives/et-slidershow.html',
            link: etSlidershowLink,
            controller: angular.noop,
            controllerAs: 'sliderShowConfig'
        };

        function etSlidershowLink(scope, element, attr, ctrl) {
            //
            //angular.extend(ctrl, {
            //    $id: scope.$id,
            //    $scope: scope
            //});
            //
            //utils.params(scope, attr.etSlidershow, ctrl);
            //
            //scope.$watch(function () {
            //    return scope;
            //}, function (vm) {
            //    //console.log(vm.piclist);
            //    //console.log(vm.textlist);
            //
            //})

            scope.sliderPrev=sliderPrev;
            scope.sliderNext=sliderNext;

            var sliderSwitch=true;
            var itemlength=$(element).children('.slider-pic').children('.slideritem').size();
            sliderInit(itemlength);

            $(window).resize(function(){
                sliderInit(itemlength);
            });

             var auto = setInterval(sliderNext, 10000);

            function resetauto(){
                clearInterval(auto);
                auto = setInterval(sliderNext, 10000);
            }

            function sliderInit(len){
                console.log(len);
                $(element).children('.sliderbox').width(parseInt($(element).width())* len )
                    .height($(element).height())
                    .children('.slideritem').width(parseInt($(element).width())).height($(element).height());
            }

            function sliderPrev(){
                if(sliderSwitch){
                    sliderSwitch=false;
                    $(element).children('.sliderbox').animate({left: '-'+$(element).width()+'px'}, "slow",function(){
                        $(this).append($(this).children('.slideritem:first'));
                        $(this).css({left: '0px'});
                        sliderSwitch=true;
                        resetauto();
                    });
                }
            }
            function sliderNext(){
                if(sliderSwitch){
                    sliderSwitch=false;
                    $(element).children('.sliderbox').css({left: '-'+$(element).width()+'px'});
                    $(element).children('.sliderbox').each(function(i){
                        $(this).prepend($(this).children('.slideritem:last'));
                    });
                    $(element).children('.sliderbox').animate({left: '0px'}, "slow",function(){
                        sliderSwitch=true;
                        resetauto();
                    });
                }
            }
        }
    }

})();