(function() {
    'use strict';

    angular
        .module('app.config')
        .run(configure);

    configure.$inject = ['$injector', '$q', '$timeout'];

    function configure($injector, $q, $timeout){

        var $validationProvider = $injector.get('$validation');

        var expression = {
            required: function(value) {
                return !!value;
            },
            account: /^[a-zA-Z][a-zA-Z0-9_]{4,16}$/,
            accountUnique: function () {
                var uniqueDefer = $q.defer();
                $timeout(function () {
                    uniqueDefer.resolve();
                }, 5000);
                return $q.all([
                    uniqueDefer.promise
                ]).then(function () {
                    return true;
                });
            },
            url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
            number: /^\d+$/
        };

        var defaultMsg = {
            required: {
                error: "'VALIDATION.required.error'|i18n",
                success: "'VALIDATION.required.success'|i18n"
            },
            account: {
                error: "'Account is error!'",
                success: "'It\\'s Required'"
            },
            accountUnique: {
                error: "'not unique'",
                success: "'unique'"
            },
            url: {
                error: 'This should be Url',
                success: 'It\'s Url'
            },
            email: {
                error: 'This should be Email',
                success: 'It\'s Email'
            },
            number: {
                error: 'This should be Number',
                success: 'It\'s Number'
            }
        };

        $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

    }

})();