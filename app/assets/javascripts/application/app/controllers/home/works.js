(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('setWorkScoresController', setWorkScoresController);

    setWorkScoresController.$inject = ['$rootScope','$scope','TYPE_DEFIN','WORK_TYPES','Scores','Works'];

    function setWorkScoresController($rootScope,$scope,TYPE_DEFIN,WORK_TYPES,Scores,Works) {
        var userId='';

        $scope.current={
            user_id:'',
            comment:'',
            score:0,
            state:false,
            total:0,
            gaugescore:{},
            gaugecomment:{},
            gaugeweight:{}
        };
        $scope.ruleHeadsLength=ruleHeadsLength;
        $scope.calculateScores=calculateScores;
        $scope.setWorkScore=setWorkScore;
        $scope.getWorkScore=getWorkScore;
        $scope.clickUser=clickUser;

        scoreInit();
        getWorkScore(userId);

        function scoreInit(){
            Works.update({
                workId:$scope.work.id,
                work:{state:WORK_TYPES.evaluating}
            }, function(){
                console.log("set score");
                $scope.work.state=WORK_TYPES.evaluating;
            });

            if($scope.task.submit_way==TYPE_DEFIN.Group)
            {
                angular.forEach($scope.work.usersHash, function (user) {
                    userId=user.id;
                });
            }else{
                userId=$scope.work.acceptor_id;
            }

            angular.forEach($scope.task.rules, function (gauge) {
                $scope.current.gaugescore[gauge.id]=0;
                $scope.current.gaugecomment[gauge.id]='';
                $scope.current.gaugeweight[gauge.id]=0;
                if (parseInt(gauge.weight)>0){
                    $scope.current.gaugeweight[gauge.id]=parseInt(gauge.weight);
                    $scope.current.total+=parseInt(gauge.weight);
                }
            });

            if($scope.task.task_type==TYPE_DEFIN.Discipline){
                $scope.current.total=100;
            }
        }

        function clickUser(userId){
            console.log(userId);
            getWorkScore(userId);
        }
        function ruleHeadsLength(ruleHeads){
            return ruleHeads.find(function(rulehead){
                return !rulehead.disabled;
            }).length;
        }
        function calculateScores(){
            $scope.current.score=0;
            //angular.forEach($scope.work.gaugescore, function (score) {
            //    if (parseInt(score)>0){
            //        $scope.current.score+=parseInt(score);
            //    }
            //});

            angular.forEach($scope.task.rules, function (gauge) {
                if (parseInt($scope.current.gaugescore[gauge.id])>0){
                   $scope.current.score+=parseInt($scope.current.gaugescore[gauge.id])*parseInt($scope.current.gaugeweight[gauge.id])/100;
                }
            });
        }

        function setWorkScore(userId){

            var scores=[],score={};
            score= {
                comment:$scope.current.comment,
                score:$scope.current.score,
                owner_id:$scope.work.id,
                owner_type:TYPE_DEFIN.Work,
                user_id:userId,
                scorer_id:$rootScope.currentUser.id
            };
            scores.push(score);
            //
            //$scope.current.score=0;
            angular.forEach($scope.task.rules, function (gauge) {
                var gaugescore=0;
                if (parseInt($scope.current.gaugescore[gauge.id])>0){
                    gaugescore=parseInt($scope.current.gaugescore[gauge.id]);
                }
                score= {
                    comment:$scope.current.gaugecomment[gauge.id],
                    score:gaugescore,
                    owner_id:gauge.id,
                    owner_type:TYPE_DEFIN.Rule,
                    user_id:userId,
                    scorer_id:$rootScope.currentUser.id
                };

                console.log(score);
                scores.push(score);
            });

            console.log(scores);
            angular.forEach(scores, function (score) {
                Scores.add({
                    score: score
                }, function(){
                    console.log("set score");
                    Works.update({
                        workId:$scope.work.id,
                        work:{state:WORK_TYPES.evaluated}
                    }, function(){
                        console.log("set score");
                        $scope.work.state=WORK_TYPES.evaluated;
                    });
                });
            });
            //Scores.add({
            //    score: scores
            //}, function(){
            //    console.log("set over");
            //});
        }

        function getWorkScore(userId){

            var scores=[],score={};
            //Scores.all({
            //    work_id: $scope.work.id
            //}, function (result) {
            //    scores = result.data;
            //});
            var param={
                owner_id:$scope.work.id,
                owner_type:TYPE_DEFIN.Work
            };
            if (userId!=''&&userId!=null){
                param.user_id=userId;
            }
            Scores.all(param, function (result) {
                score = result.data[0];
                if (score!=null){
                    console.log('score');
                    console.log(score);
                    $scope.current.score=score.score;
                    $scope.current.comment=score.comment;
                    $scope.current.state=false;
                    $scope.current.user_id=score.user_id;
                    console.log('score.user_id');
                    console.log(score.user_id);
                }else{
                    $scope.current.state=true;
                }
            });
            //scores.push(score);

            angular.forEach($scope.task.rules, function (gauge) {
                param={
                    owner_id:gauge.id,
                    owner_type:TYPE_DEFIN.Rule
                };
                if (userId!=''&&userId!=null){
                    param.user_id=userId;
                }
                Scores.all(param, function (result) {
                    score = result.data[0];
                    $scope.current.gaugescore[score.owner_id]=score.score;
                    $scope.current.gaugecomment[score.owner_id]=score.comment;
                    console.log(score);
                });
                //scores.push(score);
            });

            //console.log(scores);
            //angular.forEach(scores, function (score) {
            //    if(score.owner_type==TYPE_DEFIN.Work){
            //        $scope.current.comment=score.comment;
            //        $scope.current.score=score.score;
            //    }else{
            //        $scope.work.gaugescore[score.owner_id]=score.score;
            //        $scope.work.gaugecomment[score.owner_id]=score.comment;
            //    }
            //});
        }
    }

})();