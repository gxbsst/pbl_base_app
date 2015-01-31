(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('mapTodoController', mapTodoController)
        .controller('addTodoController', addTodoController);


    mapTodoController.$inject = ['$scope', '$state', '$element', '$interval', 'Todos', 'TodoItems'];

    function mapTodoController($scope, $state, $element, $interval, Todos, TodoItems) {
        $scope.todoread=false;
        $scope.addTodo=addTodo;

        Todos.all(function (result) {
            $scope.todoread=true;
            $scope.todos=result.data;
        });

        function addTodo(){

        }
    }

    addTodoController.$inject = ['$rootScope','$scope', 'Todos'];

    function addTodoController($rootScope,$scope,Todos) {

        $scope.todo={};
        var todo=$scope.todo;
        $scope.beforeRender=beforeRender;
        $scope.onSetTime=onSetTime;
        $scope.send=send;
        //$scope.onUsersAdd=onUsersAdd;
        //$scope.onUsersRemove=onUsersRemove;
        //
        //
        //function onUsersAdd() {
        //    return function (teacher) {
        //        ProjectTeachers.add({
        //            projectId: project.id
        //        }, {
        //            user_ids: teacher.id
        //        }, getTeachers);
        //    }
        //}
        //
        //function onUsersRemove() {
        //    return function (teacher, teachers) {
        //        ProjectTeachers.remove({
        //            projectId: project.id,
        //            assignmentId: teacher.id
        //            }, getTeachers);
        //    }
        //}

        function send(){
            todo.user_id=$rootScope.currentUser.id;
            var recipients=[{assignee_type:'User',assignee_id:$rootScope.currentUser.id}];
            var users=todo.users.split(",");
            angular.forEach(users, function (user) {
                recipients.push({assignee_type:'User',assignee_id:user});
            });
            Todos.add({todo:{start_at:todo.start_at,end_at:todo.end_at,content:todo.content,user_id:todo.user_id,
                recipient:recipients
            }},function(result){
                console.log(result);
            })
        }
        function beforeRender($view, $dates, $upDate,type) {
            switch ($view) {
                case 'day':
                    $upDate.display = moment($upDate.dateValue).add(1, 'month').format('YYYY年MM月');
                    break;
                /*case 'month':
                 $upDate.display = moment($upDate.dateValue).add(1, 'year').format('YYYY年');
                 break;*/
            }
            var start = moment(new Date()),
                end = moment(new Date()).add(99, 'day');

            //switch (type){
            //    case 'Start':
            //        start = moment($scope.todo.start_at),
            //        end = moment($scope.todo.end_at).add(1, 'days');
            //        break;
            //    case 'End':
            //        break
            //}
            //
            //angular.forEach($dates, function (date) {
            //    if (!moment(date.dateValue).utcOffset(0).isBetween(start, end, 'day')) {
            //        date.selectable = false;
            //    }
            //});
        }


        function onSetTime(newDate, todo) {
            //Tasks.update({
            //    taskId: task.id
            //}, {
            //    task: {
            //        start_at: newDate
            //    }
            //});
            $scope.$broadcast('onDocumentClick');
        }
    }

})();
