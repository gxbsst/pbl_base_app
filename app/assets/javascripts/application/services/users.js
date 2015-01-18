(function () {
    'use strict';

    angular
        .module('app.services')
        .service('User', User)
        .service('Users', Users)
        .service('Register', Register)
        .service('Friends', Friends)
        .service('Follows', Follows)
        .service('Rules', Rules);

    User.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function User($resource, RESOURCE_ACTIONS) {
        return $resource('/user', {action: '@action'}, RESOURCE_ACTIONS);
    }

    Users.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Users($resource, RESOURCE_ACTIONS) {
        return $resource('/users/:action/:userId', {userId: '@userId', action: '@action', limit: 100}, RESOURCE_ACTIONS);
    }

    Register.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Register($resource, RESOURCE_ACTIONS) {
        return $resource('/register', {}, RESOURCE_ACTIONS);
    }

    Friends.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Friends($resource, RESOURCE_ACTIONS) {
        return $resource('/user/friends/:action/:friendId', {friendId: '@friendId', action: '@action', limit: 100}, RESOURCE_ACTIONS);
    }

    Follows.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Follows($resource, RESOURCE_ACTIONS) {
        return $resource('/user/follows/:action/:followId', {followId: '@followId', action: '@action', limit: 100}, RESOURCE_ACTIONS);
    }

    Rules.$inject = ['$resource', 'RESOURCE_ACTIONS'];

    function Rules($resource, RESOURCE_ACTIONS) {
        return $resource('/user/rules/:action/:ruleId', {ruleId: '@ruleId', action: '@action'}, RESOURCE_ACTIONS);
    }

})();