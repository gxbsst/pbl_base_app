(function () {
    'use strict';

    angular
        .module('app.factories.dateformatter', ['app.factories.dimensions'])
        .provider('$dateParser', ["$localeProvider", function($localeProvider) {

            var cYear=new Date().getFullYear(),
                cMonth=new Date().getMonth(),
                cDay=new Date().getDay();
        // define a custom ParseDate object to use instead of native Date
        // to avoid date values wrapping when setting date component values
        function ParseDate() {
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth();
            this.day = new Date().getDay();
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.milliseconds = 0;
        }

        ParseDate.prototype.setMilliseconds = function(value) { this.milliseconds = value; };
        ParseDate.prototype.setSeconds = function(value) { this.seconds = value; };
        ParseDate.prototype.setMinutes = function(value) { this.minutes = value; };
        ParseDate.prototype.setHours = function(value) { this.hours = value; };
        ParseDate.prototype.getHours = function() { return this.hours; };
        ParseDate.prototype.setDate = function(value) { this.day = value; };
        ParseDate.prototype.setMonth = function(value) { this.month = value; };
        ParseDate.prototype.setFullYear = function(value) { this.year = value; };
        ParseDate.prototype.fromDate = function(value) {
            this.year = value.getFullYear();
            this.month = value.getMonth();
            this.day = value.getDate();
            this.hours = value.getHours();
            this.minutes = value.getMinutes();
            this.seconds = value.getSeconds();
            this.milliseconds = value.getMilliseconds();
            return this;
        };

        ParseDate.prototype.toDate = function() {
            return new Date(this.year, this.month, this.day, this.hours, this.minutes, this.seconds, this.milliseconds);
        };

        var proto = ParseDate.prototype;

        function noop() {
        }

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function indexOfCaseInsensitive(array, value) {
            var len = array.length, str=value.toString().toLowerCase();
            for (var i=0; i<len; i++) {
                if (array[i].toLowerCase() === str) { return i; }
            }
            return -1; // Return -1 per the "Array.indexOf()" method.
        }

        var defaults = this.defaults = {
            format: 'shortDate',
            strict: false
        };

        this.$get = ["$locale", "dateFilter", function($locale, dateFilter) {

            var DateParserFactory = function(config) {

                var options = angular.extend({}, defaults, config);

                var $dateParser = {};

                var regExpMap = {
                    'sss'   : '[0-9]{3}',
                    'ss'    : '[0-5][0-9]',
                    's'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                    'mm'    : '[0-5][0-9]',
                    'm'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                    'HH'    : '[01][0-9]|2[0-3]',
                    'H'     : options.strict ? '1?[0-9]|2[0-3]' : '[01]?[0-9]|2[0-3]',
                    'hh'    : '[0][1-9]|[1][012]',
                    'h'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                    'a'     : 'AM|PM',
                    'EEEE'  : $locale.DATETIME_FORMATS.DAY.join('|'),
                    'EEE'   : $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
                    'dd'    : '0[1-9]|[12][0-9]|3[01]',
                    'd'     : options.strict ? '[1-9]|[1-2][0-9]|3[01]' : '0?[1-9]|[1-2][0-9]|3[01]',
                    'MMMM'  : $locale.DATETIME_FORMATS.MONTH.join('|'),
                    'MMM'   : $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
                    'MM'    : '0[1-9]|1[012]',
                    'M'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                    'yyyy'  : '[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',
                    'yy'    : '[0-9]{2}',
                    'y'     : options.strict ? '-?(0|[1-9][0-9]{0,3})' : '-?0*[0-9]{1,4}',
                };

                var setFnMap = {
                    'sss'   : proto.setMilliseconds,
                    'ss'    : proto.setSeconds,
                    's'     : proto.setSeconds,
                    'mm'    : proto.setMinutes,
                    'm'     : proto.setMinutes,
                    'HH'    : proto.setHours,
                    'H'     : proto.setHours,
                    'hh'    : proto.setHours,
                    'h'     : proto.setHours,
                    'EEEE'  : noop,
                    'EEE'   : noop,
                    'dd'    : proto.setDate,
                    'd'     : proto.setDate,
                    'a'     : function(value) { var hours = this.getHours() % 12; return this.setHours(value.match(/pm/i) ? hours + 12 : hours); },
                    'MMMM'  : function(value) { return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.MONTH, value)); },
                    'MMM'   : function(value) { return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.SHORTMONTH, value)); },
                    'MM'    : function(value) { return this.setMonth(1 * value - 1); },
                    'M'     : function(value) { return this.setMonth(1 * value - 1); },
                    'yyyy'  : proto.setFullYear,
                    'yy'    : function(value) { return this.setFullYear(2000 + 1 * value); },
                    'y'     : proto.setFullYear
                };

                var regex, setMap;

                $dateParser.init = function() {
                    $dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
                    regex = regExpForFormat($dateParser.$format);
                    setMap = setMapForFormat($dateParser.$format);
                };

                $dateParser.isValid = function(date) {
                    if(angular.isDate(date)) return !isNaN(date.getTime());
                    return regex.test(date);
                };

                $dateParser.parse = function(value, baseDate, format) {
                    // check for date format special names
                    if(format) format = $locale.DATETIME_FORMATS[format] || format;
                    if(angular.isDate(value)) value = dateFilter(value, format || $dateParser.$format);
                    var formatRegex = format ? regExpForFormat(format) : regex;
                    var formatSetMap = format ? setMapForFormat(format) : setMap;
                    var matches = formatRegex.exec(value);
                    if(!matches) return false;
                    // use custom ParseDate object to set parsed values
                    var date = baseDate && !isNaN(baseDate.getTime()) ? new ParseDate().fromDate(baseDate) : new ParseDate().fromDate(new Date(cYear, cMonth, cDay, 0));
                    for(var i = 0; i < matches.length - 1; i++) {
                        formatSetMap[i] && formatSetMap[i].call(date, matches[i+1]);
                    }
                    // convert back to native Date object
                    var newDate = date.toDate();

                    // check new native Date object for day values overflow
                    if (parseInt(date.day, 10) !== newDate.getDate()) {
                        return false;
                    }

                    return newDate;
                };

                $dateParser.getDateForAttribute = function(key, value) {
                    var date;

                    if(value === 'today') {
                        var today = new Date();
                        date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (key === 'maxDate' ? 1 : 0), 0, 0, 0, (key === 'minDate' ? 0 : -1));
                    } else if(angular.isString(value) && value.match(/^".+"$/)) { // Support {{ dateObj }}
                        date = new Date(value.substr(1, value.length - 2));
                    } else if(isNumeric(value)) {
                        date = new Date(parseInt(value, 10));
                    } else if (angular.isString(value) && 0 === value.length) { // Reset date
                        date = key === 'minDate' ? -Infinity : +Infinity;
                    } else {
                        date = new Date(value);
                    }

                    return date;
                };

                $dateParser.getTimeForAttribute = function(key, value) {
                    var time;

                    if(value === 'now') {
                        time = new Date().setFullYear(cYear, cMonth, cDay);
                    } else if(angular.isString(value) && value.match(/^".+"$/)) {
                        time = new Date(value.substr(1, value.length - 2)).setFullYear(cYear, cMonth, cDay);
                    } else if(isNumeric(value)) {
                        time = new Date(parseInt(value, 10)).setFullYear(cYear, cMonth, cDay);
                    } else if (angular.isString(value) && 0 === value.length) { // Reset time
                        time = key === 'minTime' ? -Infinity : +Infinity;
                    } else {
                        time = $dateParser.parse(value, new Date(cYear, cMonth, cDay, 0));
                    }

                    return time;
                };

                /* Handle switch to/from daylight saving.
                 * Hours may be non-zero on daylight saving cut-over:
                 * > 12 when midnight changeover, but then cannot generate
                 * midnight datetime, so jump to 1AM, otherwise reset.
                 * @param  date  (Date) the date to check
                 * @return  (Date) the corrected date
                 *
                 * __ copied from jquery ui datepicker __
                 */
                $dateParser.daylightSavingAdjust = function(date) {
                    if (!date) {
                        return null;
                    }
                    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                    return date;
                };

                // Private functions

                function setMapForFormat(format) {
                    var keys = Object.keys(setFnMap), i;
                    var map = [], sortedMap = [];
                    // Map to setFn
                    var clonedFormat = format;
                    for(i = 0; i < keys.length; i++) {
                        if(format.split(keys[i]).length > 1) {
                            var index = clonedFormat.search(keys[i]);
                            format = format.split(keys[i]).join('');
                            if(setFnMap[keys[i]]) {
                                map[index] = setFnMap[keys[i]];
                            }
                        }
                    }
                    // Sort result map
                    angular.forEach(map, function(v) {
                        // conditional required since angular.forEach broke around v1.2.21
                        // related pr: https://github.com/angular/angular.js/pull/8525
                        if(v) sortedMap.push(v);
                    });
                    return sortedMap;
                }

                function escapeReservedSymbols(text) {
                    return text.replace(/\//g, '[\\/]').replace('/-/g', '[-]').replace(/\./g, '[.]').replace(/\\s/g, '[\\s]');
                }

                function regExpForFormat(format) {
                    var keys = Object.keys(regExpMap), i;

                    var re = format;
                    // Abstract replaces to avoid collisions
                    for(i = 0; i < keys.length; i++) {
                        re = re.split(keys[i]).join('${' + i + '}');
                    }
                    // Replace abstracted values
                    for(i = 0; i < keys.length; i++) {
                        re = re.split('${' + i + '}').join('(' + regExpMap[keys[i]] + ')');
                    }
                    format = escapeReservedSymbols(format);

                    return new RegExp('^' + re + '$', ['i']);
                }

                $dateParser.init();
                return $dateParser;

            };

            return DateParserFactory;

        }];

    }])
        .service('$dateFormatter', ["$locale", "dateFilter", function($locale, dateFilter) {

        // The unused `lang` arguments are on purpose. The default implementation does not
        // use them and it always uses the locale loaded into the `$locale` service.
        // Custom implementations might use it, thus allowing different directives to
        // have different languages.

        this.getDefaultLocale = function() {
            return $locale.id;
        };

        // Format is either a data format name, e.g. "shortTime" or "fullDate", or a date format
        // Return either the corresponding date format or the given date format.
        this.getDatetimeFormat = function(format, lang) {
            return $locale.DATETIME_FORMATS[format] || format;
        };

        this.weekdaysShort = function(lang) {
            return $locale.DATETIME_FORMATS.SHORTDAY;
        };

        function splitTimeFormat(format) {
            return /(h+)([:\.])?(m+)[ ]?(a?)/i.exec(format).slice(1);
        }

        // h:mm a => h
        this.hoursFormat = function(timeFormat) {
            return splitTimeFormat(timeFormat)[0];
        };

        // h:mm a => mm
        this.minutesFormat = function(timeFormat) {
            return splitTimeFormat(timeFormat)[2];
        };

        // h:mm a => :
        this.timeSeparator = function(timeFormat) {
            return splitTimeFormat(timeFormat)[1];
        };

        // h:mm a => true, H.mm => false
        this.showAM = function(timeFormat) {
            return !!splitTimeFormat(timeFormat)[3];
        };

        this.formatDate = function(date, format, lang){
            return dateFilter(date, format);
        };

    }])
        .provider('$tooltip', function() {

        var defaults = this.defaults = {
            animation: 'am-fade',
            customClass: '',
            prefixClass: 'tooltip',
            prefixEvent: 'tooltip',
            container: false,
            target: false,
            placement: 'top',
            template: 'tooltip/tooltip.tpl.html',
            contentTemplate: false,
            trigger: 'hover focus',
            keyboard: false,
            html: false,
            show: false,
            title: '',
            type: '',
            delay: 0,
            autoClose: false,
            bsEnabled: true
        };

        this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "$sce", "dimensions", "$$rAF", "$timeout", function($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $sce, dimensions, $$rAF, $timeout) {

            var trim = String.prototype.trim;
            var isTouch = 'createTouch' in $window.document;
            var htmlReplaceRegExp = /ng-bind="/ig;
            var $body = angular.element($window.document);

            function TooltipFactory(element, config) {

                var $tooltip = {};

                // Common vars
                var nodeName = element[0].nodeName.toLowerCase();
                var options = $tooltip.$options = angular.extend({}, defaults, config);
                $tooltip.$promise = fetchTemplate(options.template);
                var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
                if(options.delay && angular.isString(options.delay)) {
                    var split = options.delay.split(',').map(parseFloat);
                    options.delay = split.length > 1 ? {show: split[0], hide: split[1]} : split[0];
                }

                // Support scope as string options
                if(options.title) {
                    scope.title = $sce.trustAsHtml(options.title);
                }

                // Provide scope helpers
                scope.$setEnabled = function(isEnabled) {
                    scope.$$postDigest(function() {
                        $tooltip.setEnabled(isEnabled);
                    });
                };
                scope.$hide = function() {
                    scope.$$postDigest(function() {
                        $tooltip.hide();
                    });
                };
                scope.$show = function() {
                    scope.$$postDigest(function() {
                        $tooltip.show();
                    });
                };
                scope.$toggle = function() {
                    scope.$$postDigest(function() {
                        $tooltip.toggle();
                    });
                };
                // Publish isShown as a protected var on scope
                $tooltip.$isShown = scope.$isShown = false;

                // Private vars
                var timeout, hoverState;

                // Support contentTemplate option
                if(options.contentTemplate) {
                    $tooltip.$promise = $tooltip.$promise.then(function(template) {
                        var templateEl = angular.element(template);
                        return fetchTemplate(options.contentTemplate)
                            .then(function(contentTemplate) {
                                var contentEl = findElement('[ng-bind="content"]', templateEl[0]);
                                if(!contentEl.length) contentEl = findElement('[ng-bind="title"]', templateEl[0]);
                                contentEl.removeAttr('ng-bind').html(contentTemplate);
                                return templateEl[0].outerHTML;
                            });
                    });
                }

                // Fetch, compile then initialize tooltip
                var tipLinker, tipElement, tipTemplate, tipContainer, tipScope;
                $tooltip.$promise.then(function(template) {
                    if(angular.isObject(template)) template = template.data;
                    if(options.html) template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
                    template = trim.apply(template);
                    tipTemplate = template;
                    tipLinker = $compile(template);
                    $tooltip.init();
                });

                $tooltip.init = function() {

                    // Options: delay
                    if (options.delay && angular.isNumber(options.delay)) {
                        options.delay = {
                            show: options.delay,
                            hide: options.delay
                        };
                    }

                    // Replace trigger on touch devices ?
                    // if(isTouch && options.trigger === defaults.trigger) {
                    //   options.trigger.replace(/hover/g, 'click');
                    // }

                    // Options : container
                    if(options.container === 'self') {
                        tipContainer = element;
                    } else if(angular.isElement(options.container)) {
                        tipContainer = options.container;
                    } else if(options.container) {
                        tipContainer = findElement(options.container);
                    }

                    // Options: trigger
                    bindTriggerEvents();

                    // Options: target
                    if(options.target) {
                        options.target = angular.isElement(options.target) ? options.target : findElement(options.target);
                    }

                    // Options: show
                    if(options.show) {
                        scope.$$postDigest(function() {
                            options.trigger === 'focus' ? element[0].focus() : $tooltip.show();
                        });
                    }

                };

                $tooltip.destroy = function() {

                    // Unbind events
                    unbindTriggerEvents();

                    // Remove element
                    destroyTipElement();

                    // Destroy scope
                    scope.$destroy();

                };

                $tooltip.enter = function() {

                    clearTimeout(timeout);
                    hoverState = 'in';
                    if (!options.delay || !options.delay.show) {
                        return $tooltip.show();
                    }

                    timeout = setTimeout(function() {
                        if (hoverState ==='in') $tooltip.show();
                    }, options.delay.show);

                };

                $tooltip.show = function() {
                    if (!options.bsEnabled || $tooltip.$isShown) return;

                    scope.$emit(options.prefixEvent + '.show.before', $tooltip);
                    var parent, after;
                    if (options.container) {
                        parent = tipContainer;
                        if (tipContainer[0].lastChild) {
                            after = angular.element(tipContainer[0].lastChild);
                        } else {
                            after = null;
                        }
                    } else {
                        parent = null;
                        after = element;
                    }


                    // Hide any existing tipElement
                    if(tipElement) destroyTipElement();
                    // Fetch a cloned element linked from template
                    tipScope = $tooltip.$scope.$new();
                    tipElement = $tooltip.$element = tipLinker(tipScope, function(clonedElement, scope) {});

                    // Set the initial positioning.  Make the tooltip invisible
                    // so IE doesn't try to focus on it off screen.
                    tipElement.css({top: '-9999px', left: '-9999px', display: 'block', visibility: 'hidden'});

                    // Options: animation
                    if(options.animation) tipElement.addClass(options.animation);
                    // Options: type
                    if(options.type) tipElement.addClass(options.prefixClass + '-' + options.type);
                    // Options: custom classes
                    if(options.customClass) tipElement.addClass(options.customClass);

                    // Support v1.3+ $animate
                    // https://github.com/angular/angular.js/commit/bf0f5502b1bbfddc5cdd2f138efd9188b8c652a9
                    var promise = $animate.enter(tipElement, parent, after, enterAnimateCallback);
                    if(promise && promise.then) promise.then(enterAnimateCallback);

                    $tooltip.$isShown = scope.$isShown = true;
                    safeDigest(scope);
                    $$rAF(function () {
                        $tooltip.$applyPlacement();

                        // Once placed, make the tooltip visible
                        if(tipElement) tipElement.css({visibility: 'visible'});
                    }); // var a = bodyEl.offsetWidth + 1; ?

                    // Bind events
                    if(options.keyboard) {
                        if(options.trigger !== 'focus') {
                            $tooltip.focus();
                        }
                        bindKeyboardEvents();
                    }

                    if(options.autoClose) {
                        bindAutoCloseEvents();
                    }

                };

                function enterAnimateCallback() {
                    scope.$emit(options.prefixEvent + '.show', $tooltip);
                }

                $tooltip.leave = function() {

                    clearTimeout(timeout);
                    hoverState = 'out';
                    if (!options.delay || !options.delay.hide) {
                        return $tooltip.hide();
                    }
                    timeout = setTimeout(function () {
                        if (hoverState === 'out') {
                            $tooltip.hide();
                        }
                    }, options.delay.hide);

                };

                var _blur;
                $tooltip.hide = function(blur) {

                    if(!$tooltip.$isShown) return;
                    scope.$emit(options.prefixEvent + '.hide.before', $tooltip);

                    // store blur value for leaveAnimateCallback to use
                    _blur = blur;

                    // Support v1.3+ $animate
                    // https://github.com/angular/angular.js/commit/bf0f5502b1bbfddc5cdd2f138efd9188b8c652a9
                    var promise = $animate.leave(tipElement, leaveAnimateCallback);
                    if(promise && promise.then) promise.then(leaveAnimateCallback);

                    $tooltip.$isShown = scope.$isShown = false;
                    safeDigest(scope);

                    // Unbind events
                    if(options.keyboard && tipElement !== null) {
                        unbindKeyboardEvents();
                    }

                    if(options.autoClose && tipElement !== null) {
                        unbindAutoCloseEvents();
                    }
                };

                function leaveAnimateCallback() {
                    scope.$emit(options.prefixEvent + '.hide', $tooltip);
                    // Allow to blur the input when hidden, like when pressing enter key
                    if(_blur && options.trigger === 'focus') {
                        return element[0].blur();
                    }

                    // clean up child scopes
                    destroyTipElement();
                }

                $tooltip.toggle = function() {
                    $tooltip.$isShown ? $tooltip.leave() : $tooltip.enter();
                };

                $tooltip.focus = function() {
                    tipElement[0].focus();
                };

                $tooltip.setEnabled = function(isEnabled) {
                    options.bsEnabled = isEnabled;
                };

                // Protected methods

                $tooltip.$applyPlacement = function() {
                    if(!tipElement) return;

                    // Determine if we're doing an auto or normal placement
                    var placement = options.placement,
                        autoToken = /\s?auto?\s?/i,
                        autoPlace  = autoToken.test(placement);

                    if (autoPlace) {
                        placement = placement.replace(autoToken, '') || defaults.placement;
                    }

                    // Need to add the position class before we get
                    // the offsets
                    tipElement.addClass(options.placement);

                    // Get the position of the target element
                    // and the height and width of the tooltip so we can center it.
                    var elementPosition = getPosition(),
                        tipWidth = tipElement.prop('offsetWidth'),
                        tipHeight = tipElement.prop('offsetHeight');

                    // If we're auto placing, we need to check the positioning
                    if (autoPlace) {
                        var originalPlacement = placement;
                        var container = options.container ? angular.element(document.querySelector(options.container)) : element.parent();
                        var containerPosition = getPosition(container);

                        // Determine if the vertical placement
                        if (originalPlacement.indexOf('bottom') >= 0 && elementPosition.bottom + tipHeight > containerPosition.bottom) {
                            placement = originalPlacement.replace('bottom', 'top');
                        } else if (originalPlacement.indexOf('top') >= 0 && elementPosition.top - tipHeight < containerPosition.top) {
                            placement = originalPlacement.replace('top', 'bottom');
                        }

                        // Determine the horizontal placement
                        // The exotic placements of left and right are opposite of the standard placements.  Their arrows are put on the left/right
                        // and flow in the opposite direction of their placement.
                        if ((originalPlacement === 'right' || originalPlacement === 'bottom-left' || originalPlacement === 'top-left') &&
                            elementPosition.right + tipWidth > containerPosition.width) {

                            placement = originalPlacement === 'right' ? 'left' : placement.replace('left', 'right');
                        } else if ((originalPlacement === 'left' || originalPlacement === 'bottom-right' || originalPlacement === 'top-right') &&
                            elementPosition.left - tipWidth < containerPosition.left) {

                            placement = originalPlacement === 'left' ? 'right' : placement.replace('right', 'left');
                        }

                        tipElement.removeClass(originalPlacement).addClass(placement);
                    }

                    // Get the tooltip's top and left coordinates to center it with this directive.
                    var tipPosition = getCalculatedOffset(placement, elementPosition, tipWidth, tipHeight);
                    applyPlacementCss(tipPosition.top, tipPosition.left);
                };

                $tooltip.$onKeyUp = function(evt) {
                    if (evt.which === 27 && $tooltip.$isShown) {
                        $tooltip.hide();
                        evt.stopPropagation();
                    }
                };

                $tooltip.$onFocusKeyUp = function(evt) {
                    if (evt.which === 27) {
                        element[0].blur();
                        evt.stopPropagation();
                    }
                };

                $tooltip.$onFocusElementMouseDown = function(evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    // Some browsers do not auto-focus buttons (eg. Safari)
                    $tooltip.$isShown ? element[0].blur() : element[0].focus();
                };

                // bind/unbind events
                function bindTriggerEvents() {
                    var triggers = options.trigger.split(' ');
                    angular.forEach(triggers, function(trigger) {
                        if(trigger === 'click') {
                            element.on('click', $tooltip.toggle);
                        } else if(trigger !== 'manual') {
                            element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                            element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
                            nodeName === 'button' && trigger !== 'hover' && element.on(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
                        }
                    });
                }

                function unbindTriggerEvents() {
                    var triggers = options.trigger.split(' ');
                    for (var i = triggers.length; i--;) {
                        var trigger = triggers[i];
                        if(trigger === 'click') {
                            element.off('click', $tooltip.toggle);
                        } else if(trigger !== 'manual') {
                            element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                            element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
                            nodeName === 'button' && trigger !== 'hover' && element.off(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
                        }
                    }
                }

                function bindKeyboardEvents() {
                    if(options.trigger !== 'focus') {
                        tipElement.on('keyup', $tooltip.$onKeyUp);
                    } else {
                        element.on('keyup', $tooltip.$onFocusKeyUp);
                    }
                }

                function unbindKeyboardEvents() {
                    if(options.trigger !== 'focus') {
                        tipElement.off('keyup', $tooltip.$onKeyUp);
                    } else {
                        element.off('keyup', $tooltip.$onFocusKeyUp);
                    }
                }

                var _autoCloseEventsBinded = false;
                function bindAutoCloseEvents() {
                    // use timeout to hookup the events to prevent
                    // event bubbling from being processed imediately.
                    $timeout(function() {
                        // Stop propagation when clicking inside tooltip
                        tipElement.on('click', stopEventPropagation);

                        // Hide when clicking outside tooltip
                        $body.on('click', $tooltip.hide);

                        _autoCloseEventsBinded = true;
                    }, 0, false);
                }

                function unbindAutoCloseEvents() {
                    if (_autoCloseEventsBinded) {
                        tipElement.off('click', stopEventPropagation);
                        $body.off('click', $tooltip.hide);
                        _autoCloseEventsBinded = false;
                    }
                }

                function stopEventPropagation(event) {
                    event.stopPropagation();
                }

                // Private methods

                function getPosition($element) {
                    $element = $element || (options.target || element);

                    var el = $element[0];

                    var elRect = el.getBoundingClientRect();
                    if (elRect.width === null) {
                        // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
                        elRect = angular.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
                    }

                    var elPos;
                    if (options.container === 'body') {
                        elPos = dimensions.offset(el);
                    } else {
                        elPos = dimensions.position(el);
                    }

                    return angular.extend({}, elRect, elPos);
                }

                function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
                    var offset;
                    var split = placement.split('-');

                    switch (split[0]) {
                        case 'right':
                            offset = {
                                top: position.top + position.height / 2 - actualHeight / 2,
                                left: position.left + position.width
                            };
                            break;
                        case 'bottom':
                            offset = {
                                top: position.top + position.height,
                                left: position.left + position.width / 2 - actualWidth / 2
                            };
                            break;
                        case 'left':
                            offset = {
                                top: position.top + position.height / 2 - actualHeight / 2,
                                left: position.left - actualWidth
                            };
                            break;
                        default:
                            offset = {
                                top: position.top - actualHeight,
                                left: position.left + position.width / 2 - actualWidth / 2
                            };
                            break;
                    }

                    if(!split[1]) {
                        return offset;
                    }

                    // Add support for corners @todo css
                    if(split[0] === 'top' || split[0] === 'bottom') {
                        switch (split[1]) {
                            case 'left':
                                offset.left = position.left;
                                break;
                            case 'right':
                                offset.left =  position.left + position.width - actualWidth;
                        }
                    } else if(split[0] === 'left' || split[0] === 'right') {
                        switch (split[1]) {
                            case 'top':
                                offset.top = position.top - actualHeight;
                                break;
                            case 'bottom':
                                offset.top = position.top + position.height;
                        }
                    }

                    return offset;
                }

                function applyPlacementCss(top, left) {
                    tipElement.css({ top: top + 'px', left: left + 'px' });
                }

                function destroyTipElement() {
                    // Cancel pending callbacks
                    clearTimeout(timeout);

                    if($tooltip.$isShown && tipElement !== null) {
                        if(options.autoClose) {
                            unbindAutoCloseEvents();
                        }

                        if(options.keyboard) {
                            unbindKeyboardEvents();
                        }
                    }

                    if(tipScope) {
                        tipScope.$destroy();
                        tipScope = null;
                    }

                    if(tipElement) {
                        tipElement.remove();
                        tipElement = $tooltip.$element = null;
                    }
                }

                return $tooltip;

            }

            // Helper functions

            function safeDigest(scope) {
                scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();
            }

            function findElement(query, element) {
                return angular.element((element || document).querySelectorAll(query));
            }

            var fetchPromises = {};
            function fetchTemplate(template) {
                if(fetchPromises[template]) return fetchPromises[template];
                return (fetchPromises[template] = $q.when($templateCache.get(template) || $http.get(template))
                    .then(function(res) {
                        if(angular.isObject(res)) {
                            $templateCache.put(template, res.data);
                            return res.data;
                        }
                        return res;
                    }));
            }

            return TooltipFactory;

        }];

    });


    angular.module('app.factories.dimensions', [])
        .factory('dimensions', ["$document", "$window", function($document, $window) {

            var jqLite = angular.element;
            var fn = {};

            /**
             * Test the element nodeName
             * @param element
             * @param name
             */
            var nodeName = fn.nodeName = function(element, name) {
                return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
            };

            /**
             * Returns the element computed style
             * @param element
             * @param prop
             * @param extra
             */
            fn.css = function(element, prop, extra) {
                var value;
                if (element.currentStyle) { //IE
                    value = element.currentStyle[prop];
                } else if (window.getComputedStyle) {
                    value = window.getComputedStyle(element)[prop];
                } else {
                    value = element.style[prop];
                }
                return extra === true ? parseFloat(value) || 0 : value;
            };

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * @required-by bootstrap-tooltip, bootstrap-affix
             * @url http://api.jquery.com/offset/
             * @param element
             */
            fn.offset = function(element) {
                var boxRect = element.getBoundingClientRect();
                var docElement = element.ownerDocument;
                return {
                    width: boxRect.width || element.offsetWidth,
                    height: boxRect.height || element.offsetHeight,
                    top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
                    left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
                };
            };

            /**
             * Provides read-only equivalent of jQuery's position function
             * @required-by bootstrap-tooltip, bootstrap-affix
             * @url http://api.jquery.com/offset/
             * @param element
             */
            fn.position = function(element) {

                var offsetParentRect = {top: 0, left: 0},
                    offsetParentElement,
                    offset;

                // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
                if (fn.css(element, 'position') === 'fixed') {

                    // We assume that getBoundingClientRect is available when computed position is fixed
                    offset = element.getBoundingClientRect();

                } else {

                    // Get *real* offsetParentElement
                    offsetParentElement = offsetParent(element);

                    // Get correct offsets
                    offset = fn.offset(element);
                    if (!nodeName(offsetParentElement, 'html')) {
                        offsetParentRect = fn.offset(offsetParentElement);
                    }

                    // Add offsetParent borders
                    offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
                    offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
                }

                // Subtract parent offsets and element margins
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
                    left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
                };

            };

            /**
             * Returns the closest, non-statically positioned offsetParent of a given element
             * @required-by fn.position
             * @param element
             */
            var offsetParent = function offsetParentElement(element) {
                var docElement = element.ownerDocument;
                var offsetParent = element.offsetParent || docElement;
                if(nodeName(offsetParent, '#document')) return docElement.documentElement;
                while(offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElement.documentElement;
            };

            /**
             * Provides equivalent of jQuery's height function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/height/
             * @param element
             * @param outer
             */
            fn.height = function(element, outer) {
                var value = element.offsetHeight;
                if(outer) {
                    value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
                } else {
                    value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
                }
                return value;
            };

            /**
             * Provides equivalent of jQuery's width function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/width/
             * @param element
             * @param outer
             */
            fn.width = function(element, outer) {
                var value = element.offsetWidth;
                if(outer) {
                    value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
                } else {
                    value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
                }
                return value;
            };

            return fn;

        }]);

})();