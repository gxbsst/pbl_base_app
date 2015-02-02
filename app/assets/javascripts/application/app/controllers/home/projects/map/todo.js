(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('mapTodoController', mapTodoController)
        .controller('completeTodoController', completeTodoController)
        .controller('addTodoController', addTodoController)
        .controller('editTodoController', editTodoController);


    mapTodoController.$inject = ['$rootScope','$scope', '$state', '$element', '$interval', 'Todos', 'TodoItems'];

    function mapTodoController($rootScope,$scope, $state, $element, $interval, Todos, TodoItems) {
        $scope.todoread=false;
        $scope.completeTodo=completeTodo;
        $scope.removeTodo=removeTodo;
        $scope.todoQueue={};
        TodoItems.all({user_id:$rootScope.currentUser.id},function (result) {
            $scope.todoread=true;
            $scope.todos=result.data;
            angular.forEach(result.data, function (todo) {
                console.log('todo');
                console.log(todo);
                if (todo.state=='opening'){
                    $scope.todoQueue['opening']=($scope.todoQueue['opening']||[]);
                    $scope.todoQueue['opening'].push(todo);
                }else{
                    var startD = new Date(Date.parse(todo.start_at));
                    var endD   = new Date();
                    var days = Math.abs(parseInt((startD.getTime()-endD.getTime()) / (1000 * 60 * 60 * 24)));
                    if(days < 30){
                        console.log("日期范围应在一个月之内");
                        console.log(todo);
                    }
                    var year=startD.getYear();
                    $scope.todoQueue[year]=($scope.todoQueue[year]||[]);
                    $scope.todoQueue[year].push(todo);
                }
            });
            console.log($scope.todoQueue);
            angular.forEach($scope.todoQueue, function (queue) {
                console.log('queue');
                console.log(queue);
            });
        });

        function removeTodo(todo){
            if($rootScope.currentUser.id==todo.user_id){

                Todos.remove({
                    todoId: todo.id
                },function(result){
                    console.log('Todos.remove');
                    console.log(result);
                });
            }else{
                TodoItems.remove({
                    todoId: todo.id
                },function(result){
                    console.log('TodoItems.remove');
                    console.log(result);
                });
            }
        }

        function completeTodo(todo){
            TodoItems.complete({
                todoId: todo.id,
                action:'complete'
            },function(result){
                console.log(result);
            });
        }
    }

    completeTodoController.$inject = ['$rootScope','$scope', 'Todos','TodoItems'];

    function completeTodoController($rootScope,$scope,Todos,TodoItems) {
        $scope.cancel_complete=cancel_complete;
        function cancel_complete(todo){
            TodoItems.cancel_complete({
                todoId: todo.id,
                action:'cancel_complete'
            },function(result){
                console.log(result);
            });
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

    editTodoController.$inject = ['$rootScope','$scope', 'Todos'];

    function editTodoController($rootScope,$scope,Todos) {

        var todo=$scope.todo;
        $scope.beforeRender=beforeRender;
        $scope.onSetTime=onSetTime;
        $scope.send=send;


        function send(){
            todo.user_id=$rootScope.currentUser.id;
            var recipients=[{assignee_type:'User',assignee_id:$rootScope.currentUser.id}];
            var users=todo.users.split(",");
            angular.forEach(users, function (user) {
                recipients.push({assignee_type:'User',assignee_id:user});
            });
            Todos.update({id:todo.id,todo:{start_at:todo.start_at,end_at:todo.end_at,content:todo.content,user_id:todo.user_id,
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
            }
            var start = moment(new Date()),
                end = moment(new Date()).add(99, 'day');
        }


        function onSetTime(newDate, todo) {

            $scope.$broadcast('onDocumentClick');
        }
    }

})();
