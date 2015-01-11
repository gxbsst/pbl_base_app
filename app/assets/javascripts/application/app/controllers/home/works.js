(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('setWorkScoresController', setWorkScoresController);

    setWorkScoresController.$inject = ['$rootScope','$scope','TYPE_DEFIN',"Scores"];

    function setWorkScoresController($rootScope,$scope,TYPE_DEFIN,Scores) {

        var scores=[],score={};
        $scope.work.gaugescore={};
        $scope.current={
            comment:'',
            score:0,
            state:false
        };
        $scope.ruleHeadsLength=ruleHeadsLength;
        $scope.calculateScores=calculateScores;
        $scope.setWorkScore=setWorkScore;
        $scope.getWorkScore=getWorkScore;

        function ruleHeadsLength(ruleHeads){
            return ruleHeads.find(function(rulehead){
                return !rulehead.disabled;
            }).length;
        }
        function calculateScores(){
            $scope.current.score=0;
            angular.forEach($scope.work.gaugescore, function (score) {
                if (parseInt(score)>0){
                    $scope.current.score+=parseInt(score);
                }
            });
        }

        function setWorkScore(){
            score= {
                comment:$scope.current.comment,
                score:$scope.current.score,
                owner_id:$scope.work.id,
                owner_type:TYPE_DEFIN.Work,
                user_id:$scope.work.acceptor_id,
                sender_id:$rootScope.currentUser.id
            };
            scores.push(score);
            //
            //$scope.current.score=0;
            angular.forEach($scope.task.rules, function (gauge) {
                var gaugescore=0;
                if (parseInt($scope.work.gaugescore[gauge.id])>0){
                    gaugescore=parseInt($scope.work.gaugescore[gauge.id]);
                }
                score= {
                    comment:$scope.work.gaugecomment[gauge.id],
                    score:gaugescore,
                    owner_id:gauge.id,
                    owner_type:TYPE_DEFIN.Rule,
                    user_id:$scope.work.acceptor_id,
                    sender_id:$rootScope.currentUser.id
                };
                scores.push(score);
            });

            console.log(scores);
            //Scores.add({
            //    score: scores
            //}, function(){
            //    console.log("set over");
            //});
        }

        function getWorkScore(){

            //Scores.all({
            //    work_id: $scope.work.id
            //}, function (result) {
            //    scores = result.data;
            //});
            angular.forEach(scores, function (score) {
                if(score.owner_type==TYPE_DEFIN.Work){
                    $scope.current.comment=score.comment;
                    $scope.current.score=score.score;
                }else{
                    $scope.work.gaugescore[score.owner_id]=score.score;
                    $scope.work.gaugecomment[score.owner_id]=score.comment;
                }
            });
        }
    }

})();