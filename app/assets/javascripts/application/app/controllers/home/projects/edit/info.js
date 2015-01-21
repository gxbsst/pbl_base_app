(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('ProjectEditInfoController', ProjectEditInfoController);

    ProjectEditInfoController.$inject = ['$scope', '$rootScope', '$q', 'RESOURCE_TYPES', 'Resources', 'Projects', 'ProjectTeachers', 'Regions', 'project'];

    function ProjectEditInfoController($scope, $rootScope, $q, RESOURCE_TYPES, Resources, Projects, ProjectTeachers, Regions, project) {

        var vm = this;
        project.cover = project.cover || {};
        vm.project = project;
        vm.project.resources = [];
        vm.onUploadBegin = onUploadBegin;
        vm.onUploadSuccess = onUploadSuccess;
        vm.findByType = findByType;
        vm.removeDocument = removeDocument;
        vm.onTagsChange = onTagsChange;
        vm.onTeachersAdd = onTeachersAdd;
        vm.onTeachersRemove = onTeachersRemove;
        vm.onSetTime = onSetTime;
        vm.beforeRender = beforeRender;
        vm.teachersFilter = teachersFilter;
        vm.onRegion = onRegion;

        getProjectRegion();
        getProjectResources();
        getTeachers();

        function getProjectRegion() {
            project.region_id && Regions.all({
                regionId: project.region_id
            }, function (result) {
                project.region = angular.copy(result.data);
                vm.regions = result.data;
            });
        }

        function onRegion($regionId) {
            Projects.update({
                projectId: project.id
            }, {
                project: {region_id: $regionId}
            });
        }

        function getTeachers() {
            ProjectTeachers.all({
                projectId: project.id
            }, function (result) {
                vm.teachers = result.data.map(function (role) {
                    role.user_id = role.user.id;
                    role.label = role.user.username;
                    return role;
                });
            });
        }

        function onUploadBegin(type) {
            return function () {
                project['$uploading_' + type] = true;
            }
        }

        function onUploadSuccess(type) {
            return function () {
                if (type == 'cover' && project.cover && project.cover.id) {
                    Resources.remove({
                        resourceId: project.cover.id
                    });
                }
                delete project['$uploading_' + type];
                getProjectResources();
            }
        }

        function getProjectResources() {
            Resources.all({
                owner_types: [
                    RESOURCE_TYPES.project.cover,
                    RESOURCE_TYPES.project.document].join(','),
                owner_ids: project.id
            }, function (result) {
                vm.project.resources = result.data;
            });
        }

        function findByType(ownerType, multiple) {
            return vm.project.resources[multiple ? 'find' : 'findOne'](function (resource) {
                return resource.owner_type == ownerType;
            });
        }

        function removeDocument(doc) {
            doc.$disabled = true;
            Resources.remove({
                resourceId: doc.id
            }, getProjectResources);
        }

        function onTagsChange() {
            return function (tag, tags) {
                Projects.update({
                    projectId: vm.project.id
                }, {
                    project: {
                        tag_list: tags.map(function (item) {
                            return item.$label;
                        }).join(',')
                    }
                }, function () {
                    vm.project.tag_list = tags.map(function (item) {
                        return item.$label;
                    });
                });
            };
        }

        function onTeachersAdd() {
            return function (teacher) {
                ProjectTeachers.add({
                    projectId: project.id
                }, {
                    user_ids: teacher.id
                }, getTeachers);
            }
        }

        function onTeachersRemove() {
            return function (teacher, teachers) {
                ProjectTeachers.remove({
                    projectId: project.id,
                    assignmentId: teacher.id
                }, getTeachers);
            }
        }

        function onSetTime(newDate) {
            Projects.update({
                projectId: project.id
            }, {
                project: {start_at: newDate}
            });
            $scope.$emit('onDocumentClick');
        }

        function beforeRender($view, $dates, $upDate) {
            switch ($view) {
                case 'day':
                    $upDate.display = moment($upDate.dateValue).add(1, 'month').format('YYYY年MM月');
                    break;
                /*case 'month':
                 $upDate.display = moment($upDate.dateValue).add(1, 'year').format('YYYY年');
                 break;*/
            }
            angular.forEach($dates, function (date) {
                if (moment(date.dateValue).timezoneOffset(0).isBefore(moment(), $view == 'hour' ? 'minute' : $view)) {
                    date.selectable = false;
                }
            });
        }

        function teachersFilter(input) {
            var friends = angular.copy($rootScope.friends),
                defer = $q.defer();
            if (input) {
                friends = friends.find(function (user) {
                    return user.username.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                });
            }
            friends = friends.find(function (user) {
                return !(vm.teachers || []).has(function (teacher) {
                    return user.id == teacher.user.id;
                });
            }).map(function (option) {
                option.label = option.username;
                return option;
            });
            defer.resolve(friends);
            return defer.promise;
        }

    }

})();