(function () {
    'use strict';

    angular
        .module('app.pbl')
        .controller('BaseController', BaseController);

    BaseController.$inject = ['$scope', '$rootScope', '$document', 'RESOURCE_TYPES'];

    function BaseController($scope, $rootScope, $document, RESOURCE_TYPES) {

        $document.on('click', function () {
            $scope.$apply(function () {
                $rootScope.$broadcast('onDocumentClick');
            });
        });

        angular.extend($rootScope, {
            RESOURCE_TYPES: RESOURCE_TYPES,
            UPLOAD_HANDLES: {
                onBegin: function (object) {
                    return function (data) {
                        object.$uploading = true;
                    }
                },
                onProgress: function (object) {
                    return function (evt) {
                        object.$progress = Math.round(evt.loaded / evt.total * 100);
                    }
                },
                onCompleted: function (object) {
                    return function (data) {
                        delete object.$uploading;
                    }
                }
            }
        });

    }

})();