(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('etLogout', etLogout);

    etLogout.$inject = ['$rootScope', 'Users'];

    function etLogout($rootScope, Users){
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.on('click', function () {
                    Users.remove({
                        action: 'sign_out'
                    }, function () {
                        delete $rootScope.currentUser;
                    });
                });
            }
        }
    }

})();