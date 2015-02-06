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
        TodoItems.all({user_id:$rootScope.currentUser.id},function (result) {
            $scope.todoread=true;
            $scope.todos=result.data;
        });

        function removeTodo(todoitem,$event){
            $event.stopPropagation();
            if (confirm('确定删除这个待办事项？')) {
                if($rootScope.currentUser.id==todoitem.user_id){

                    Todos.remove({
                        todoId: todoitem.recipients[0].todo_id
                    },function(result){
                        console.log('Todos.remove');
                        console.log(result);
                        $scope.todos.remove(function (item) {
                            return item.id == todoitem.id;
                        });
                    });
                }else{
                    TodoItems.remove({
                        todoId: todoitem.id
                    },function(result){
                        console.log('TodoItems.remove');
                        console.log(result);
                        $scope.todos.remove(function (item) {
                            return item.id == todoitem.id;
                        });
                    });
                }
            }
        }

        function completeTodo(todo,$event){
            $event.stopPropagation();
            if (confirm('确定完成这个待办事项？')) {
                TodoItems.complete({
                    todoId: todo.id,
                    action:'complete'
                },function(result){
                    console.log(result);
                    todo.state='completed';
                });
            }
        }
    }

    completeTodoController.$inject = ['$rootScope','$scope', 'Todos','TodoItems'];

    function completeTodoController($rootScope,$scope,Todos,TodoItems) {
        $scope.cancel_complete=cancel_complete;
        $scope.selectall=selectall;
        $scope.selectTodo=selectTodo;
        $scope.removeAll=removeAll;
        $scope.selectqueue=[];
        $scope.todoQueue={};
        angular.forEach($scope.todos, function (todo) {
            var startD = new Date(Date.parse(todo.updated_at));
            var endD   = new Date();
            var days = Math.abs(parseInt((startD.getTime()-endD.getTime()) / (1000 * 60 * 60 * 24)));
            if(days < 30){
                $scope.todoQueue['month']=($scope.todoQueue['month']||{id:1,title:'最近一个月',queue:[]});
                $scope.todoQueue['month']['queue'].push(todo);
            }else{
                var year=startD.getFullYear();
                $scope.todoQueue[year]=($scope.todoQueue[year]||{id:year,title:year+'年',queue:[]});
                $scope.todoQueue[year]['queue'].push(todo);
            }

        });

        function selectTodo(todo){
            todo.$select=!todo.$select;
            if(todo.$select){
                $scope.selectqueue.push(todo.id);
            }else{
                $scope.selectqueue.remove(function (item) {
                    return item == todo.id;
                });
            }
        }

        function selectall(){
            $scope.$select=!$scope.$select;
            $scope.selectqueue=[];
            angular.forEach($scope.todos,function(todo){
                if (todo.state=='completed'){
                    todo.$select=$scope.$select;
                    if(todo.$select){
                        $scope.selectqueue.push(todo.id);
                    }
                }
            });
        }

        function removeAll($event){
            $event.stopPropagation();
            if (confirm('将选中的待办事项全部删除？')) {
                //angular.forEach($scope.todos,function(todoitem){
                //    if (todoitem.state=='completed'&&todoitem.$select==true){
                //        TodoItems.remove({
                //            todoId: todoitem.id
                //        },function(result){
                //            console.log('TodoItems.remove');
                //            console.log(result);
                //            angular.forEach($scope.todoQueue,function(queue){
                //                queue.queue.remove(function (item) {
                //                    return item.id == todoitem.id;
                //                });
                //            });
                //        });
                //    }
                //});
                //$scope.todos.remove(function (item) {
                //    return item.id == todoitem.id;
                //});
                angular.forEach($scope.selectqueue,function(todoitemid){
                    TodoItems.remove({
                        todoId: todoitemid
                    },function(result){
                        console.log('TodoItems.remove');
                        console.log(result);
                    });

                    angular.forEach($scope.todoQueue,function(queue){
                        queue.queue.remove(function (item) {
                            return item.id == todoitemid;
                        });
                    });

                    $scope.todos.remove(function (item) {
                        return item.id == todoitemid;
                    });
                });
            }
        }
        function cancel_complete(todo,$event){
            $event.stopPropagation();
            if (confirm('继续执行这个待办事项？')) {
                TodoItems.cancel_complete({
                    todoId: todo.id,
                    action:'cancel_complete'
                },function(result){
                    console.log(result);
                    todo.state='opening';
                    $scope.completenum--;
                });
            }
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
            //var users=todo.users.split(",");
            //angular.forEach(users, function (user) {
            //    recipients.push({assignee_type:'User',assignee_id:user});
            //});
            Todos.add({todo:{start_at:todo.start_at,end_at:todo.end_at,content:todo.content,user_id:todo.user_id,
                recipient:recipients
            }},function(result){
                console.log(result);
                console.log($scope.todos);
                $scope.todos.push(result.data);
                console.log($scope.todos);
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
            //var users=todo.users.split(",");
            //angular.forEach(users, function (user) {
            //    recipients.push({assignee_type:'User',assignee_id:user});
            //});
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
