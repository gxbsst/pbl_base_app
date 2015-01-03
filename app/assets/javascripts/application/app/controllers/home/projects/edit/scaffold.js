(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditScaffoldController', ProjectEditScaffoldController);

    ProjectEditScaffoldController.$inject = ['$scope', 'RESOURCE_TYPES', 'Resources', 'project', 'Disciplines', 'Knowledge', 'Tasks', 'ProjectProducts'];

    function ProjectEditScaffoldController($scope, RESOURCE_TYPES, Resources, project, Disciplines, Knowledge, Tasks, ProjectProducts) {
        var vm = this;

        project.knowledge = project.knowledge || [];
        vm.project = project;
        vm.tempKnowledge = '';
        vm.addKnowledge = addKnowledge;
        vm.removeKnowledge = removeKnowledge;
        vm.disciplines = [];
        vm.chooseType = chooseType;
        vm.getResources = getResources;
        vm.removeResource = removeResource;
        vm.removeTask = removeTask;
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;

        $scope.$on('setAddTask', setAddTask);

        Disciplines.all(function (data) {
            vm.disciplines = data.data;
            //测试ng-model绑定
            //vm.disciplines.push(vm.project.tasks[0].test.discipline);
        });

        //onProjectTask();
        //onProjectKnowledge();
        onProjectTasks();
        onProjectProducts();

        function onUploadBegin(product) {
            return function () {
                product.$uploading = true;
            }
        }

        function onUploadSuccess(product) {
            return function () {
                product.resource && Resources.remove({
                    resourceId: product.resource.id
                });
                delete product.$uploading;
                getTaskResources();
            }
        }

        function getTaskResources() {
            Resources.all({
                owner_types: RESOURCE_TYPES.project.task,
                owner_ids: vm.tasks.map(function (task) {
                    return task.id;
                }).join(',')
            }, function (result) {
                vm.resources = result.data;
            });
        }

        function getResources(task) {
            return (vm.resources || []).find(function (resource) {
                return resource.owner_type == RESOURCE_TYPES.project.task && resource.owner_id == task.id;
            });
        }

        function removeResource(resource) {
            resource.$disabled = true;
            Resources.remove({
                resourceId: resource.id
            }, getTaskResources);
        }

        function chooseType(task, typeval, disabled) {
            task.task_type = typeval;
            if (!disabled) {
                Tasks.update({taskId: task.id, task: {'task_type': typeval}});
            }
        }

        function addKnowledge() {
            //vm.project.knowledge.push(vm.tempKnowledge);
            Knowledge.add({
                "knowledge": {
                    "project_id": vm.project.id,
                    "description": vm.tempKnowledge
                }
            }, onProjectKnowledge);
            vm.tempKnowledge = "";
        }

        function removeKnowledge(knowledge) {
            Knowledge.remove({knowledgeId: knowledge.id}, onProjectKnowledge);
        }

        function onProjectKnowledge() {
            Knowledge.all(
                {project_id: vm.project.id},
                function (data) {
                    vm.project.knowledge = data.data;
                    console.log(data);
                });
        }

        function setAddTask(event, task) {
            //vm.project.tasks.splice(vm.project.tasks.length, 0, task);
            console.log(task);
            task.project_id = vm.project.id;
            console.log(task);
            Tasks.add({"task": task}, onProjectTasks);
        }

        function removeTask(task, $event) {
            //vm.project.tasks.splice(vm.project.tasks.length, 0, task);
            $event.stopPropagation();
            if (confirm('您确定要删除这个任务吗？')) {
                Tasks.remove({taskId: task.id}, onProjectTasks);
            }
        }


        function onProjectTasks() {
            Tasks.all({
                project_id: vm.project.id
            }, function (result) {
                vm.tasks = result.data;
                getTaskResources();
            });
        }

        function onProjectProducts() {
            console.log("products");
            ProjectProducts.all({
                project_id: vm.project.id
            }, function (result) {
                var products = result.data,
                    findFinal = function (product) {
                        return product.is_final;
                    };
                //vm.project.final_product = products.findOne(findFinal);
                if (vm.project.final_product) {
                    products.remove(findFinal);
                }
                vm.products = products;

                console.log(vm.products);
            });
        }
    }

})();