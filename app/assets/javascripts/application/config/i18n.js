(function() {
    'use strict';

    angular
        .module('app.i18n', [])
        .provider('i18nConfig', i18nConfig)
        .run(configure);

    function i18nConfig() {

        this.locales = {};
        this.locale = null;
        this.defaultLocale = 'en-us';

        this.$get = function () {
            return {
                locales: this.locales,
                locale: this.locale,
                defaultLocale: this.defaultLocale
            };
        };

    }

    configure.$inject = ['$rootScope', '$location', 'cookie', 'i18nConfig'];

    function configure($rootScope, $location, cookie, i18nConfig) {

        i18nConfig.locale = cookie('locale', [
            $location.search().locale,
            cookie('locale'),
            navigator.systemLanguage,
            navigator.language,
            i18nConfig.defaultLocale
        ].findOne(finder).toLowerCase());

        $rootScope.setLocale = setLocale;
        $rootScope.getLocale = getLocale;

        function setLocale(locale){
            i18nConfig.locale = cookie('locale', [
                locale,
                i18nConfig.locale,
                i18nConfig.defaultLocale
            ].findOne(finder).toLowerCase());
        }

        function getLocale(){
            return i18nConfig.locale;
        }

        function finder(locale){
            return locale && i18nConfig.locales[locale.toLowerCase()];
        }

    }
})();