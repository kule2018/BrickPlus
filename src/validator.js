/*! nice-validator 0.10.11
 * (c) 2012-2016 Jony Zhang <niceue@live.com>, MIT Licensed
 * https://github.com/niceue/nice-validator
 */
/*jshint evil:true*/

    "use strict";
    var $ = require('jquery');
    (function ($) {

    /*基本信息*/
    var NS = 'validator',
        CLS_NS = '.' + NS,
        CLS_NS_RULE = '.rule',
        CLS_NS_FIELD = '.field',
        CLS_NS_FORM = '.form',
        CLS_WRAPPER = 'nice-' + NS,
        CLS_MSG_BOX = 'msg-box',
        ARIA_REQUIRED = 'aria-required',
        ARIA_INVALID = 'aria-invalid',
        DATA_RULE = 'data-rule',
        DATA_MSG = 'data-msg',
        DATA_TIP = 'data-tip',
        DATA_OK = 'data-ok',
        DATA_TIMELY = 'data-timely',
        DATA_TARGET = 'data-target',
        DATA_DISPLAY = 'data-display',
        DATA_MUST = 'data-must',
        NOVALIDATE = 'novalidate',
        INPUT_SELECTOR = ':verifiable',

        rRules = /(&)?(!)?\b(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\|)?/g,
        rRule = /(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,
        rDisplay = /(?:([^:;\(\[]*):)?(.*)/,
        rDoubleBytes = /[^\x00-\xff]/g,
        rPos = /top|right|bottom|left/,
        rAjaxType = /(?:(cors|jsonp):)?(?:(post|get):)?(.+)/i,
        rUnsafe = /[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gmi,

        noop = $.noop,
        proxy = $.proxy,
        trim = $.trim,
        isFunction = $.isFunction,
        isString = function(s) {
            return typeof s === 'string';
        },
        isObject = function(o) {
            return o && Object.prototype.toString.call(o) === '[object Object]';
        },
        isIE = document.documentMode || +(navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1),
        attr = function(el, key, value) {
            if (!el || !el.tagName) return null;
            if (value !== undefined) {
                if (value === null) el.removeAttribute(key);
                else el.setAttribute(key, '' + value);
            } else {
                return el.getAttribute(key);
            }
        },
        elementValue = function(element) {
            return $(element).val();
        },
        debug = window.console || {
            log: noop,
            info: noop
        },
        submitButton,
        novalidateonce,
        preinitialized = {},

        defaults = {
            debug: 0,
            timely: 1,
            theme: 'default',
            ignore: '',
            focusInvalid: true,
            //stopOnError: false,
            //focusCleanup: false,
            //ignoreBlank: false,
            //showOk: true,

            //dataFilter: null,
            //valid: null,
            //invalid: null,
            //display: null,
            //target: null,
            beforeSubmit: noop,

            msgWrapper: 'span',
            msgMaker: function(opt) {
                var html;
                html = '<span role="alert" class="msg-wrap n-'+ opt.type + '">' + opt.arrow;
                if (opt.result) {
                    $.each(opt.result, function(i, obj){
                        html += '<span class="n-'+ obj.type +'">' + opt.icon + '<span class="n-msg">' + obj.msg + '</span></span>';
                    });
                } else {
                    html += opt.icon + '<span class="n-msg">' + opt.msg + '</span>';
                }
                html += '</span>';
                return html;
            },
            msgArrow: '',
            msgIcon: '<span class="n-icon"></span>',
            msgClass: '',
            //msgStyle: null,
            //msgShow: null,
            //msgHide: null,
            //bindClassTo: ':input',
            validClass: 'n-valid',
            invalidClass: 'n-invalid'
        },
        themes = {
            'default': {
                formClass: 'n-default',
                msgClass: 'n-right'
            }
        };

    /* jQuery Plugin
       @param {Object} options
        debug         {Boolean}     0               Whether to enable debug mode
        timely        {Number}      1               Whether to enable timely validation
        theme         {String}     'default'        Theme name
        stopOnError   {Boolean}     false           Whether to stop validate when found an error input
        focusCleanup  {Boolean}     false           Whether to clean up the field message when focus the field
        focusInvalid  {Boolean}     true            Whether to focus the field that is invalid
        ignoreBlank   {Boolean}     false           When the field has no value, whether to ignore validation
        ignore        {jqSelector}    ''            Ignored fields (Using jQuery selector)

        beforeSubmit  {Function}                    Do something before submit form
        dataFilter    {Function}                    Convert ajax results
        valid         {Function}                    Triggered when the form is valid
        invalid       {Function}                    Triggered when the form is invalid
        validClass    {String}      'n-valid'       Add this class name to a valid field
        invalidClass  {String}      'n-invalid'     Add this class name to a invalid field
        bindClassTo   {jqSelector}  ':input'        Which element should the className binding to

        display       {Function}                    Callback function to get dynamic display
        target        {Function}                    Callback function to get dynamic target
        msgShow       {Function}                    Trigger this callback when show message
        msgHide       {Function}                    Trigger this callback when hide message
        msgWrapper    {String}      'span'          Message wrapper tag name
        msgMaker      {Function}                    Callback function to make message HTML
        msgArrow      {String}                      Message arrow template
        msgIcon       {String}                      Message icon template
        msgStyle      {String}                      Custom message css style
        msgClass      {String}                      Additional added to the message class names
        formClass     {String}                      Additional added to the form class names

        messages      {Object}                      Custom messages for the current instance
        rules         {Object}                      Custom rules for the current instance
        fields        {Object}                      Field set to be verified
        {String}        key    name|#id
        {String|Object} value                       Rule string, or an object is passed more arguments

        fields[key][rule]       {String}            Rule string
        fields[key][display]    {String|Function}
        fields[key][tip]        {String}            Custom friendly message when focus the input
        fields[key][ok]         {String}            Custom success message
        fields[key][msg]        {Object}            Custom error message
        fields[key][msgStyle]   {String}            Custom message style
        fields[key][msgClass]   {String}            Additional added to the message class names
        fields[key][msgWrapper] {String}            Message wrapper tag name
        fields[key][msgMaker]   {Function}          Custom message HTML maker
        fields[key][dataFilter] {Function}          Conversion ajax results
        fields[key][valid]      {Function}          Triggered when this field is valid
        fields[key][invalid]    {Function}          Triggered when this field is invalid
        fields[key][must]       {Boolean}           If set true, we always check the field even has remote checking
        fields[key][timely]     {Boolean}           Whether to enable timely validation
        fields[key][target]     {jqSelector}        Verify the current field, but the message can be displayed on target element
     */
    $.fn[NS] = function(options) {
        var that = this,
            args = arguments;

        if (that.is(':input')) return that;
        !that.is('form') && (that = this.find('form'));
        !that.length && (that = this);

        that.each(function() {
            var cache = $(this).data(NS);

            if (cache) {
                if ( isString(options) ) {
                    if ( options.charAt(0) === '_' ) return;
                    cache[options].apply(cache, Array.prototype.slice.call(args, 1));
                }
                else if (options) {
                    cache._reset(true);
                    cache._init(this, options);
                }
            } else {
                new Validator(this, options);
            }
        });

        return this;
    };


    // Validate a field, or an area
    $.fn.isValid = function(callback, hideMsg) {
        var me = _getInstance(this[0]),
            hasCallback = isFunction(callback),
            ret, opt;

        if (!me) return true;
        me.checkOnly = !!hideMsg;
        opt = me.options;

        ret = me._multiValidate(
            this.is(':input') ? this : this.find(INPUT_SELECTOR),
            function(isValid){
                if (!isValid && opt.focusInvalid && !me.checkOnly) {
                    // navigate to the error element
                    me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                }
                if (hasCallback) {
                    if (callback.length) {
                        callback(isValid);
                    } else if (isValid) {
                        callback();
                    }
                }
                me.checkOnly = false;
            }
        );

        // If you pass a callback, we maintain the jQuery object chain
        return hasCallback ? this : ret;
    };


    // A faster selector than ":input:not(:submit,:button,:reset,:image,:disabled)"
    $.expr[":"].verifiable = function(elem) {
        var name = elem.nodeName.toLowerCase();

        return ( name === 'input' && !({submit: 1, button: 1, reset: 1, image: 1})[elem.type] ||
                 name === 'select' ||
                 name === 'textarea' ) &&
               elem.disabled === false;
    };

    // any value, but not only whitespace
    $.expr[":"].filled = function(elem) {
        return !!trim(elementValue(elem));
    };


    /**
     * Creates a new Validator
     *
     * @class
     * @param {Element} element - form element
     * @param {Object}  options - options for validator
     */
    function Validator(element, options) {
        var me = this;

        if ( !(me instanceof Validator) ) {
            return new Validator(element, options);
        }

        me.$el = $(element);

        if (me.$el.length) {
            if (Validator.loading) {
                $(window).on('validatorready', init);
            } else {
                init();
            }
        }
        else if ( isString(element) ) {
            preinitialized[element] = options;
        }

        function init() {
            me._init(me.$el[0], options);
        }
    }

    Validator.prototype = {
        _init: function(element, options) {
            var me = this,
                opt, themeOpt, dataOpt;

            // Initialization options
            if ( isFunction(options) ) {
                options = {
                    valid: options
                };
            }
            options = options || {};
            dataOpt = attr(element, 'data-'+ NS +'-option');
            dataOpt = dataOpt && dataOpt.charAt(0) === '{' ? (new Function("return " + dataOpt))() : {};
            themeOpt = themes[ options.theme || dataOpt.theme || defaults.theme ];

            // themeOpt = {
            //     formClass:"n-default",
            //     msgClass:"n-right"
            // };
            opt = me.options = $.extend({}, defaults, themeOpt, me.options, options, dataOpt);

            me.rules = new Rules(opt.rules, true);
            me.messages = new Messages(opt.messages, true);
            me.elements = me.elements || {};
            me.deferred = {};
            me.errors = {};
            me.fields = {};

            // Initialization fields
            me._initFields(opt.fields);

            // Initialization message parameters
            me.msgOpt = {
                type: 'error',
                pos: _getPos(opt.msgClass),
                wrapper: opt.msgWrapper,
                cls: opt.msgClass,
                style: opt.msgStyle,
                arrow: opt.msgArrow,
                icon: opt.msgIcon,
                show: opt.msgShow,
                hide: opt.msgHide
            };
            //console.log(me.msgOpt)

            if ( isString(opt.target) ) {
                me.$el.find(opt.target).addClass('msg-container');
            }
            //console.log(opt.formClass)
            // Initialization events and make a cache
            if ( !me.$el.data(NS) ) {
                me.$el.data(NS, me).addClass(CLS_WRAPPER +' '+ opt.formClass)
                      .on('submit'+ CLS_NS +' validate'+ CLS_NS, proxy(me, '_submit'))
                      .on('reset'+ CLS_NS, proxy(me, '_reset'))
                      .on('showmsg'+ CLS_NS, proxy(me, '_showmsg'))
                      .on('hidemsg'+ CLS_NS, proxy(me, '_hidemsg'))
                      .on('focusin'+ CLS_NS + ' click'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusin'))
                      .on('focusout'+ CLS_NS +' validate'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusout'));

                if ( opt.timely ) {
                    me.$el.on('keyup'+ CLS_NS +' input'+ CLS_NS + ' compositionstart compositionend', INPUT_SELECTOR, proxy(me, '_focusout'))
                          .on('click'+ CLS_NS, ':radio,:checkbox', 'click', proxy(me, '_focusout'))
                          .on('change'+ CLS_NS, 'select,input[type="file"]', 'change', proxy(me, '_focusout'));
                }

                // cache the novalidate attribute value
                me._novalidate = attr(element, NOVALIDATE);
                // Initialization is complete, stop off default HTML5 form validation
                // If use "jQuery.attr('novalidate')" in IE7 will complain: "SCRIPT3: Member not found."
                attr(element, NOVALIDATE, NOVALIDATE);
            }
        },

        // Guess whether the form use ajax submit
        _guessAjax: function(form) {
            var me = this;

            if ( !(me.isAjaxSubmit = !!me.options.valid) ) {
                // if there is a "valid.form" event
                var events = ($._data || $.data)(form, "events");
                if ( events && events.valid &&
                    $.map(events.valid, function(e){
                        return ~e.namespace.indexOf('form') ? 1 : null;
                    }).length
                ) {
                    me.isAjaxSubmit = true;
                }
            }
        },

        _initFields: function(fields) {
            var me = this,
                clear = fields === null;

            // Processing field information
            if (clear) fields = me.fields;

            if ( isObject(fields) ) {
                $.each(fields, function(k, v) {
                    // delete a field from settings
                    if ( v === null || clear ) {
                        var el = me.elements[k];
                        if (el) me._resetElement(el, true);
                        delete me.fields[k];
                    } else {
                        me.fields[k] = isString(v) ? {
                            rule: v
                        } : v;
                    }
                });
            }

            // Parsing DOM rules
            me.$el.find(INPUT_SELECTOR).each(function() {
                me._parse(this);
            });
        },

        // Parsing a field
        _parse: function(el) {
            var me = this,
                opt = me.options,
                field,
                key = el.name,
                timely,
                dataRule = attr(el, DATA_RULE);

            dataRule && attr(el, DATA_RULE, null);

            // If the field has passed the key as id mode, or it doesn't has a name
            if ( el.id && ('#' + el.id in me.fields) ||
                 !key ||
                 // If dataRule and element are diffrent from old's, we use ID mode.
                 (dataRule !== null && (field = me.fields[key]) && dataRule !== field.rule && field.key !== el.id)
            ) {
                key = '#' + el.id;
            }
            // doesn't verify a field that has neither id nor name
            if (!key) return;

            field = me.fields[key] || {};
            field.key = key;
            // The priority of passing parameter by DOM is higher than by JS.
            field.rule = dataRule || field.rule || '';

            if (!field.display) {
                if ( !(field.display = attr(el, DATA_DISPLAY)) && opt.display ) {
                    field.display = opt.display;
                }
            }
            if (field.rule) {
                if ( attr(el, DATA_MUST) !== null || /match\(|checked/.test(field.rule) ) {
                    field.must = true;
                }
                if ( ~field.rule.indexOf('required') ) {
                    field.required = true;
                    attr(el, ARIA_REQUIRED, true);
                }
                if ( !('showOk' in field) ) {
                    field.showOk = opt.showOk;
                }

                timely = attr(el, DATA_TIMELY);
                if (!timely) {
                    if ('timely' in field) attr(el, DATA_TIMELY, +field.timely);
                } else {
                    field.timely = +timely;
                }
                field = me._parseRule(field);
                field.old = {};
            }
            if ( isString(field.target) ) {
                attr(el, DATA_TARGET, field.target);
            }
            if ( isString(field.tip) ) {
                attr(el, DATA_TIP, field.tip);
            }

            return me.fields[key] = field;
        },

        // Parsing field rules
        _parseRule: function(field) {
            var arr = rDisplay.exec(field.rule);

            if (!arr) return;
            // current rule index
            field._i = 0;
            if (arr[1]) {
                field.display = arr[1];
            }
            if (arr[2]) {
                field.rules = [];
                arr[2].replace(rRules, function(){
                    var args = arguments;
                    args[4] = args[4] || args[5];
                    field.rules.push({
                        and: args[1] === "&",
                        not: args[2] === "!",
                        or: args[6] === "|",
                        method: args[3],
                        params: args[4] ?
                            $.map( args[4].split(', '), function(i){return trim(i)} ) :
                            undefined
                    });
                });
            }

            return field;
        },

        // Verify a zone
        _multiValidate: function($inputs, doneCallback){
            var me = this,
                opt = me.options;

            me.hasError = false;
            if (opt.ignore) {
                $inputs = $inputs.not(opt.ignore);
            }

            $inputs.each(function() {
                me._validate(this);
                if (me.hasError && opt.stopOnError) {
                    // stop the validation
                    return false;
                }
            });

            // Need to wait for all fields validation complete, especially asynchronous validation
            if (doneCallback) {
                me.validating = true;
                $.when.apply(
                    null,
                    $.map(me.deferred, function(v){return v;})
                ).done(function(){
                    doneCallback.call(me, !me.hasError);
                    me.validating = false;
                });
            }

            // If the form does not contain asynchronous validation, the return value is correct.
            // Otherwise, you should detect form validation result through "doneCallback".
            return !$.isEmptyObject(me.deferred) ? undefined : !me.hasError;
        },

        // Validate the whole form
        _submit: function(e) {
            var me = this,
                opt = me.options,
                form = e.target,
                canSubmit = e.type === 'submit' && !e.isDefaultPrevented();

            e.preventDefault();

            if (
                novalidateonce && ~(novalidateonce = false) ||
                // Prevent duplicate submission
                me.submiting ||
                // Receive the "validate" event only from the form.
                e.type === 'validate' && me.$el[0] !== form ||
                // trigger the beforeSubmit callback.
                opt.beforeSubmit.call(me, form) === false
            ) {
                return;
            }

            if (me.isAjaxSubmit === undefined) {
                me._guessAjax(form);
            }

            opt.debug && debug.log("\n<<< event: " + e.type);

            me._reset();
            me.submiting = true;

            me._multiValidate(
                me.$el.find(INPUT_SELECTOR),
                function(isValid){
                    var ret = (isValid || opt.debug === 2) ? 'valid' : 'invalid',
                        errors;

                    if (!isValid) {
                        if (opt.focusInvalid) {
                            // navigate to the error element
                            me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                        }
                        errors = $.map(me.errors, function(err){
                            return err;
                        });
                    }

                    // releasing submit
                    me.submiting = false;
                    me.isValid = isValid;

                    // trigger callback and event
                    isFunction(opt[ret]) && opt[ret].call(me, form, errors);
                    me.$el.trigger(ret + CLS_NS_FORM, [form, errors]);

                    opt.debug && debug.log('>>> ' + ret);

                    if (isValid && canSubmit && !me.isAjaxSubmit) {
                        submitForm();
                    }
                }
            );

            function submitForm() {
                var name, submit;

                novalidateonce = true;
                if (submitButton && (name = submitButton.name)) {
                    // If name="submit", we have to set the name empty to get the form.submit method
                    submitButton.name = "";
                    submit = form.submit;
                    // For asp.NET controls
                    me.$el.append('<input type="hidden" name="'+ name +'" value="'+ submitButton.value +'">');
                    // call native submit
                    submit.call(form);
                } else {
                    form.submit();
                }
            }
        },

        _reset: function(e) {
            var me = this;

            me.errors = {};
            if (e) {
                me.reseting = true;
                me.$el.find(INPUT_SELECTOR).each( function(i, el){
                    me._resetElement(el);
                });
                delete me.reseting;
            }
        },

        _resetElement: function(el, all) {
            this._setClass(el, null);
            this.hideMsg(el);
            if (all) {
                attr(el, ARIA_REQUIRED, null);
            }
        },

        _getTimely: function(el, opt) {
            var timely = attr(el, DATA_TIMELY);
            return timely !== null ? +timely : +opt.timely;
        },

        // Handle events: "focusin/click"
        _focusin: function(e) {
            var me = this,
                opt = me.options,
                el = e.target,
                timely,
                msg;

            if ( me.validating || ( e.type==='click' && document.activeElement === el ) ) {
                return;
            }

            if (opt.focusCleanup) {
                if ( attr(el, ARIA_INVALID) === 'true' ) {
                    me._setClass(el, null);
                    me.hideMsg(el);
                }
            }

            msg = attr(el, DATA_TIP);

            if (msg) {
                me.showMsg(el, {
                    type: 'tip',
                    msg: msg
                });
            } else {
                if (attr(el, DATA_RULE)) {
                    me._parse(el);
                }
                timely = me._getTimely(el, opt);
                if ( timely === 8 || timely === 9 ) {
                    me._focusout(e);
                }
            }
        },

        // Handle events: "focusout/validate/keyup/click/change/input/compositionstart/compositionend"
        _focusout: function(e, elem) {
            var me = this,
                opt = me.options,
                el = e.target,
                etype = e.type,
                focusin = etype === 'focusin',
                special = etype === 'validate',
                field,
                old,
                value,
                timestamp,
                key, specialKey,
                timely,
                timer = 0;

            if (etype === 'compositionstart') {
                me.pauseValidate = true;
            }
            if (etype === 'compositionend') {
                me.pauseValidate = false;
            }
            if (me.pauseValidate || !(field = me.getField(el))) {
                return;
            }
            field._e = etype;
            old = field.old;
            value = elementValue(el);

            // Just for checkbox and radio
            if (!elem && _checkable(el)) {
                elem = me.$el.find('input[name="'+ el.name +'"]').get(0);
            }
            timely = me._getTimely(elem || el, opt);

            if (!special) {
                if (!timely) return;

                // not validate field unless fill a value
                if ( opt.ignoreBlank && !value && !focusin ) {
                    me.hideMsg(el);
                    return;
                }

                if ( etype === 'focusout' ) {
                    if ( timely === 2 || timely === 8 ) {
                        if (value) {
                            if (field.isValid && !old.showOk) {
                                me.hideMsg(el);
                            } else {
                                me._makeMsg(el, field, old);
                            }
                        } else {
                            return;
                        }
                    }
                }
                else {
                    if ( timely < 2 && !e.data ) {
                        return;
                    }

                    // mark timestamp to reduce the frequency of the received event
                    timestamp = +new Date();
                    if ( timestamp - (el._ts || 0) < 100 || (etype === 'keyup' && el._et === 'input') ) {
                        return;
                    }
                    el._ts = timestamp;
                    el._et = etype;

                    // handle keyup
                    if ( etype === 'keyup' ) {
                        key = e.keyCode;
                        specialKey = {
                            8: 1,  // Backspace
                            9: 1,  // Tab
                            16: 1, // Shift
                            32: 1, // Space
                            46: 1  // Delete
                        };

                        // only gets focus, no validation
                        if ( key === 9 && !value ) {
                            return;
                        }

                        // do not validate, if triggered by these keys
                        if ( key < 48 && !specialKey[key] ) {
                            return;
                        }
                    }
                    if ( !focusin ) {
                        // keyboard events, reducing the frequency of validation
                        timer = timely >=100 ? timely : 400;
                    }
                }
            }

            // if the current field is ignored
            if ( opt.ignore && $(el).is(opt.ignore) ) {
                return;
            }

            clearTimeout(field._t);

            field.value = value;
            if (timely !== undefined) field.timely = timely;
            if (timer) {
                field._t = setTimeout(function() {
                    me._validate(el, field);
                }, timer);
            } else {
                if (special) field.old = {};
                me._validate(el, field);
            }
        },

        _setClass: function(el, isValid) {
            var $el = $(el), opt = this.options;
            if (opt.bindClassTo) {
                $el = $el.closest(opt.bindClassTo);
            }
            $el.removeClass( opt.invalidClass + ' ' + opt.validClass );
            if (isValid !== null) {
                $el.addClass( isValid ? opt.validClass : opt.invalidClass );
            }
        },

        _showmsg: function(e, type, msg) {
            var me = this,
                el = e.target;

            if ( $(el).is(':input') ) {
                me.showMsg(el, {type: type, msg: msg});
            }
            else if ( type === 'tip' ) {
                me.$el.find(INPUT_SELECTOR +"["+ DATA_TIP +"]", el).each(function(){
                    me.showMsg(this, {type: type, msg: msg});
                });
            }
        },

        _hidemsg: function(e) {
            var $el = $(e.target);

            if ( $el.is(':input') ) {
                this.hideMsg($el);
            }
        },

        // Validated a field
        _validatedField: function(el, field, ret) {
            var me = this,
                opt = me.options,
                isValid = field.isValid = ret.isValid = !!ret.isValid,
                callback = isValid ? 'valid' : 'invalid';

            ret.key = field.key;
            ret.ruleName = field._r;
            ret.id = el.id;
            ret.value = elementValue(el);

            if (isValid) {
                ret.type = 'ok';
            } else {
                if (me.submiting) {
                    me.errors[field.key] = ret.msg;
                }
                me.isValid = false;
                me.hasError = true;
            }
            me.elements[field.key] = ret.element = el;
            me.$el[0].isValid = isValid ? me.isFormValid() : isValid;

            // cache result
            field.old = ret;

            // trigger callback
            isFunction(field[callback]) && field[callback].call(me, el, ret);
            isFunction(opt.validation) && opt.validation.call(me, el, ret);

            // trigger event
            $(el).attr( ARIA_INVALID, isValid ? null : true )
                 .trigger( callback + CLS_NS_FIELD, [ret, me] );
            me.$el.triggerHandler('validation', [ret, me]);

            if (me.checkOnly) return;
            // set className
            me._setClass(el, ret.skip || ret.type === 'tip' ? null : isValid);
            me._makeMsg.apply(me, arguments);
        },

        _makeMsg: function(el, field, ret) {
            // show or hide the message
            if ( field.msgMaker || this.options.msgMaker ) {
                ret = $.extend({}, ret);
                if (field._e === 'focusin') {
                    ret.type = 'tip';
                }
                this[ ret.showOk || ret.msg || ret.type === 'tip' ? 'showMsg' : 'hideMsg' ](el, ret, field);
            }
        },

        // Validated a rule
        _validatedRule: function(el, field, ret, msgOpt) {
            field = field || me.getField(el);
            msgOpt = msgOpt || {};

            var me = this,
                opt = me.options,
                msg,
                rule,
                method = field._r,
                timely = field.timely || opt.timely,
                special = timely === 9 || timely === 8,
                transfer,
                temp,
                isValid = false;

            // use null to break validation from a field
            if (ret === null) {
                me._validatedField(el, field, {isValid: true, skip: true});
                return;
            }
            else if (ret === undefined) {
                transfer = true;
            }
            else if (ret === true || ret === '') {
                isValid = true;
            }
            else if (isString(ret)) {
                msg = ret;
            }
            else if (isObject(ret)) {
                if (ret.error) {
                    msg = ret.error;
                } else {
                    msg = ret.ok;
                    isValid = true;
                }
            }

            rule = field.rules[field._i];
            if (rule.not) {
                msg = undefined;
                isValid = method === "required" || !isValid;
            }
            if (rule.or) {
                if (isValid) {
                    while ( field._i < field.rules.length && field.rules[field._i].or ) {
                        field._i++;
                    }
                } else {
                    transfer = true;
                }
            } else if (rule.and) {
                if (!field.isValid) transfer = true;
            }

            if (transfer) {
                isValid = true;
            }
            // message analysis, and throw rule level event
            else {
                if (isValid) {
                    if (field.showOk !== false) {
                        temp = attr(el, DATA_OK);
                        msg = temp === null ? isString(field.ok) ? field.ok : msg : temp;
                        if (!isString(msg) && isString(field.showOk)) {
                            msg = field.showOk;
                        }
                        if (isString(msg)) {
                            msgOpt.showOk = isValid;
                        }
                    }
                }
                if (!isValid || special) {
                    /* rule message priority:
                        1. custom DOM message
                        2. custom field message;
                        3. global defined message;
                        4. rule returned message;
                        5. default message;
                    */
                    msg = (_getDataMsg(el, field, msg || rule.msg || me.messages[method]) || me.messages.fallback).replace(/\{0\|?([^\}]*)\}/, function(){
                        return me._getDisplay(el, field.display) || arguments[1] || me.messages[0];
                    });
                }
                if (!isValid) field.isValid = isValid;
                msgOpt.msg = msg;
                $(el).trigger( (isValid ? 'valid' : 'invalid') + CLS_NS_RULE, [method, msg]);
            }

            if (special && (!transfer || rule.and)) {
                if (!isValid && !field._m) field._m = msg;
                field._v = field._v || [];
                field._v.push({
                    type: isValid ? !transfer ? 'ok' : 'tip' : 'error',
                    msg: msg || rule.msg
                });
            }

            // output the debug message
            if (opt.debug) {
                debug.log('   ' + field._i + ': ' + method + ' => ' + (isValid || msg));
            }

            // the current rule has passed, continue to validate
            if ( (isValid || special) && field._i < field.rules.length - 1) {
                field._i++;
                me._checkRule(el, field);
            }
            // field was invalid, or all fields was valid
            else {
                field._i = 0;

                if (special) {
                    msgOpt.isValid = field.isValid;
                    msgOpt.result = field._v;
                    msgOpt.msg = field._m || '';
                    if (!field.value && (field._e === 'focusin')) {
                        msgOpt.type = 'tip';
                    }
                } else {
                    msgOpt.isValid = isValid;
                }

                me._validatedField(el, field, msgOpt);
                delete field._m;
                delete field._v;
            }
        },

        // Verify a rule form a field
        _checkRule: function(el, field) {
            var me = this,
                ret,
                fn,
                old,
                key = field.key,
                rule = field.rules[field._i],
                method = rule.method,
                value = elementValue(el),
                params = rule.params;

            // request has been sent, wait it
            if (me.submiting && me.deferred[key]) {
                return;
            }
            old = field.old;
            field._r = method;

            if (old && !field.must && !rule.must && rule.result !== undefined &&
                 old.ruleName === method && old.id === el.id &&
                value && old.value === value )
            {
                // get result from cache
                ret = rule.result;
            }
            else {
                // get result from current rule
                fn = _getDataRule(el, method) || me.rules[method] || noop;
                ret = fn.call(me, el, params, field);
                if (fn.msg) rule.msg = fn.msg;
            }

            // asynchronous validation
            if (isObject(ret) && isFunction(ret.then)) {
                me.deferred[key] = ret;

                // whether the field valid is unknown
                field.isValid = undefined;

                // show loading message
                !me.checkOnly && me.showMsg(el, {
                    type: 'loading',
                    msg: me.messages.loading
                }, field);

                // waiting to parse the response data
                ret.then(
                    function(d, textStatus, jqXHR) {
                        var data = jqXHR.responseText,
                            result,
                            dataFilter = field.dataFilter || me.options.dataFilter || _dataFilter;

                        // detect if data is json or jsonp format
                        if (/jsonp?/.test(this.dataType)) {
                            data = d;
                        } else if (trim(data).charAt(0) === '{') {
                            data = $.parseJSON(data);
                        }

                        // filter data
                        result = dataFilter.call(this, data, field);
                        if (result === undefined) result = dataFilter.call(this, data.data, field);

                        rule.data = this.data;
                        rule.result = field.old ? result : undefined;
                        me._validatedRule(el, field, result);
                    },
                    function(jqXHR, textStatus){
                        me._validatedRule(el, field, me.messages[textStatus] || textStatus);
                    }
                ).always(function(){
                    delete me.deferred[key];
                });
            }
            // other result
            else {
                me._validatedRule(el, field, ret);
            }
        },

        // Processing the validation
        _validate: function(el, field) {
            var me = this;

            // doesn't validate the element that has "disabled" or "novalidate" attribute
            if ( el.disabled || attr(el, NOVALIDATE) !== null ) {
                return;
            }

            field = field || me.getField(el);
            if (!field) return;
            if (!field.rules) me._parse(el);
            if (!field.rules) return;

            if (me.options.debug) debug.info(field.key);

            field.isValid = true;

            // if the field is not required, and that has a blank value
            if (!field.required && !field.must && !elementValue(el)) {
                if (!_checkable(el)) {
                    me._validatedField(el, field, {isValid: true});
                    return true;
                }
            }

            me._checkRule(el, field);
            return field.isValid;
        },

        /**
         * Detecting whether the value of an element that matches a rule
         *
         * @method test
         * @param {Element} el - input element
         * @param {String} rule - rule name
         */
        test: function(el, rule) {
            var me = this,
                ret,
                parts = rRule.exec(rule),
                method,
                params;

            if (parts) {
                method = parts[1];
                if (method in me.rules) {
                    params = parts[2] || parts[3];
                    params = params ? params.split(', ') : undefined;
                    ret = me.rules[method].call(me, el, params);
                }
            }

            return ret === true || ret === undefined || ret === null;
        },

        // Get a range of validation messages
        getRangeMsg: function(value, params, field, suffix) {
            if (!params) return;

            var me = this,
                rule = field.rules[field._i],
                msg = me.messages[rule.method] || '',
                result,
                p = params[0].split('~'),
                e = params[1] === 'false',
                a = p[0],
                b = p[1],
                c = 'rg',
                args = [''],
                isNumber = trim(value) && +value === +value;

            function compare(large, small) {
                return !e ? large >= small : large > small;
            }

            if (p.length === 2) {
                if (a && b) {
                    if (isNumber && compare(value, +a) && compare(+b, value)) {
                        result = true;
                    }
                    args = args.concat(p);
                    c = e ? 'gtlt' : 'rg';
                }
                else if (a && !b) {
                    if (isNumber && compare(value, +a)) {
                        result = true;
                    }
                    args.push(a);
                    c = e ? 'gt' : 'gte';
                }
                else if (!a && b) {
                    if (isNumber && compare(+b, value)) {
                        result = true;
                    }
                    args.push(b);
                    c = e ? 'lt' : 'lte';
                }
            }
            else {
                if (value === +a) {
                    result = true;
                }
                args.push(a);
                c = 'eq';
            }

            if (msg) {
                if (suffix && msg[c + suffix]) {
                    c += suffix;
                }
                args[0] = msg[c];
            }

            return result || ( rule.msg = me.renderMsg.apply(null, args) );
        },

        /**
         * Render message template
         *
         * @method renderMsg
         * @return {String}
         */
        renderMsg: function() {
            var args = arguments,
                tpl = args[0],
                i = args.length;

            if (!tpl) return;

            while (--i) {
                tpl = tpl.replace('{' + i + '}', args[i]);
            }

            return tpl;
        },

        _getDisplay: function(el, str) {
            return !isString(str) ? isFunction(str) ? str.call(this, el) : '' : str;
        },

        _getMsgOpt: function(obj) {
            return $.extend({}, this.msgOpt, isString(obj) ? {msg: obj} : obj);
        },

        _getMsgDOM: function(el, msgOpt) {
            var $el = $(el), $msgbox, datafor, tgt, container;

            if ( $el.is(':input') ) {
                tgt = msgOpt.target || attr(el, DATA_TARGET);
                if (tgt) {
                    tgt = isFunction(tgt) ? tgt.call(this, el) : this.$el.find(tgt);
                    if (tgt.length) {
                        if ( tgt.is(':input') ) {
                            el = tgt.get(0);
                        } else if ( tgt.hasClass(CLS_MSG_BOX) ) {
                            $msgbox = tgt;
                        } else {
                            container = tgt;
                        }
                    }
                }
                if (!$msgbox) {
                    datafor = (!_checkable(el) || !el.name) && el.id ? el.id : el.name;
                    $msgbox = this.$el.find(msgOpt.wrapper + '.' + CLS_MSG_BOX + '[for="' + datafor + '"]');
                }
            } else {
                $msgbox = $el;
            }

            if (!$msgbox.length) {
                $el = this.$el.find(tgt || el);

                $msgbox = $('<'+ msgOpt.wrapper + '>').attr({
                    'class': CLS_MSG_BOX + (msgOpt.cls ? ' ' + msgOpt.cls : ''),
                    'style': msgOpt.style || '',
                    'for': datafor
                });

                if ( _checkable(el) ) {
                    var $parent = $el.parent();
                    $msgbox.appendTo( $parent.is('label') ? $parent.parent() : $parent );
                } else {
                    if (container) {
                        $msgbox.appendTo(container);
                    } else {
                        $msgbox[!msgOpt.pos || msgOpt.pos === 'right' ? 'insertAfter' : 'insertBefore']($el);
                    }
                }
            }

            return $msgbox;
        },

        /**
         * Show validation message
         *
         * @method showMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt
         */
        showMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            if (!el) return;
            var me = this,
                opt = me.options,
                msgMaker,
                temp,
                $msgbox;

            if (isObject(el) && !el.jquery && !msgOpt) {
                $.each(el, function(key, msg) {
                    var el = me.elements[key] || me.$el.find(_key2selector(key))[0];
                    me.showMsg(el, msg);
                });
                return;
            }

            msgOpt = me._getMsgOpt(msgOpt);
            el = $(el).get(0);

            // ok or tip
            if (!msgOpt.msg && msgOpt.type !== 'error') {
                temp = attr(el, 'data-' + msgOpt.type);
                if (temp !== null) msgOpt.msg = temp;
            }

            if ( !isString(msgOpt.msg) ) {
                return;
            }

            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
                if (field) {
                    msgOpt.style = field.msgStyle || msgOpt.style;
                    msgOpt.cls = field.msgClass || msgOpt.cls;
                    msgOpt.wrapper = field.msgWrapper || msgOpt.wrapper;
                    msgOpt.target = field.target || opt.target;
                }
            }
            if (!(msgMaker = (field || {}).msgMaker || opt.msgMaker)) {
                return;
            }

            $msgbox = me._getMsgDOM(el, msgOpt);

            !rPos.test($msgbox[0].className) && $msgbox.addClass(msgOpt.cls);
            if ( isIE === 6 && msgOpt.pos === 'bottom' ) {
                $msgbox[0].style.marginTop = $(el).outerHeight() + 'px';
            }
            $msgbox.html( msgMaker.call(me, msgOpt) )[0].style.display = '';

            isFunction(msgOpt.show) && msgOpt.show.call(me, $msgbox, msgOpt.type);
        },

        /**
         * Hide validation message
         *
         * @method hideMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt optional
         */
        hideMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            var me = this,
                opt = me.options,
                $msgbox;

            el = $(el).get(0);
            msgOpt = me._getMsgOpt(msgOpt);

            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
                if (field) {
                    if (field.isValid || me.reseting) attr(el, ARIA_INVALID, null);
                    msgOpt.wrapper = field.msgWrapper || msgOpt.wrapper;
                    msgOpt.target = field.target || opt.target;
                }
            }

            $msgbox = me._getMsgDOM(el, msgOpt);
            if (!$msgbox.length) return;

            if ( isFunction(msgOpt.hide) ) {
                msgOpt.hide.call(me, $msgbox, msgOpt.type);
            } else {
                $msgbox[0].style.display = 'none';
                $msgbox[0].innerHTML = null;
            }
        },

        /**
         * Get field information
         *
         * @method getField
         * @param {Element} - input element
         * @return {Object} field
         */
        getField: function(el) {
            var me = this,
                key;

            if (isString(el)) {
                key = el;
            } else {
                if (attr(el, DATA_RULE)) {
                    return me._parse(el);
                }
                if (el.id && '#' + el.id in me.fields || !el.name) {
                    key = '#' + el.id;
                } else {
                    key = el.name;
                }
            }

            return me.fields[key];
        },

        /**
         * Config a field
         *
         * @method: setField
         * @param {String} key
         * @param {Object} obj
         */
        setField: function(key, obj) {
            var fields = {};

            if (!key) return;

            // update this field
            if (isString(key)) {
                fields[key] = obj;
            }
            // update fields
            else {
                fields = key;
            }

            this._initFields(fields);
        },

        /**
         * Detecting whether the form is valid
         *
         * @method isFormValid
         * @return {Boolean}
         */
        isFormValid: function() {
            var fields = this.fields, k, field;
            for (k in fields) {
                field = fields[k];
                if (!field.rules || !field.required && !field.must && !elementValue(_key2selector(k))) continue;
                if (!field.isValid) {
                    return field.isValid;
                }
            }
            return true;
        },

        /**
         * Prevent submission form
         *
         * @method holdSubmit
         * @param {Boolean} hold - If set to false, will release the hold
         */
        holdSubmit: function(hold) {
            this.submiting = hold === undefined || hold;
        },

        /**
         * Clean validation messages
         *
         * @method cleanUp
         */
        cleanUp: function() {
            this._reset(1);
        },

        /**
         * Destroy the validation
         *
         * @method destroy
         */
        destroy: function() {
            this._reset(1);
            this.$el.off(CLS_NS).removeData(NS);
            attr(this.$el[0], NOVALIDATE, this._novalidate);
        }
    };


    /**
     * Create Rules
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Rules(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Rules.prototype;

        for (k in obj) {
            if (_checkRuleName(k))
                that[k] = _getRule(obj[k]);
        }
    }

    /**
     * Create Messages
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Messages(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Messages.prototype;

        for (k in obj) {
            that[k] = obj[k];
        }
    }

    // Rule converted factory
    function _getRule(fn) {
        switch ($.type(fn)) {
            case 'function':
                return fn;
            case 'array':
                var f = function(el) {
                    fn.msg = fn[1];
                    return fn[0].test(elementValue(el)) || fn[1] || false;
                };
                f.msg = fn[1];
                return f;
            case 'regexp':
                return function(el) {
                    return fn.test(elementValue(el));
                };
        }
    }

    // Get instance by an element
    function _getInstance(el) {
        var wrap, k, options;

        if (!el || !el.tagName) return;

        switch (el.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
            case 'BUTTON':
            case 'FIELDSET':
                wrap = el.form || $(el).closest('.' + CLS_WRAPPER);
                break;
            case 'FORM':
                wrap = el;
                break;
            default:
                wrap = $(el).closest('.' + CLS_WRAPPER);
        }

        for (k in preinitialized) {
            if ($(wrap).is(k)) {
                options = preinitialized[k];
                break;
            }
        }

        return $(wrap).data(NS) || $(wrap)[NS](options).data(NS);
    }

    // Get custom rules on the node
    function _getDataRule(el, method) {
        var fn = trim(attr(el, DATA_RULE + '-' + method));

        if (!fn) return;
        fn = (new Function("return " + fn))();
        if (fn) return _getRule(fn);
    }

    // Get custom messages on the node
    function _getDataMsg(el, field, m) {
        var msg = field.msg,
            item = field._r;

        if ( isObject(msg) ) msg = msg[item];
        if ( !isString(msg) ) {
            msg = attr(el, DATA_MSG + '-' + item) || attr(el, DATA_MSG) || ( m ? isString(m) ? m : m[item] : '');
        }

        return msg;
    }

    // Get message position
    function _getPos(str) {
        var pos;

        if (str) pos = rPos.exec(str);
        return pos && pos[0];
    }

    // Translate ajax response to validation result
    function _dataFilter(data) {
        if ( isString(data) || ( isObject(data) && ('error' in data || 'ok' in data) ) ) {
            return data;
        }
    }

    // Check whether the element is checkbox or radio
    function _checkable(el) {
        return el.tagName === 'INPUT' && el.type === 'checkbox' || el.type === 'radio';
    }

    // Parse date string to timestamp
    function _parseDate(str) {
        return Date.parse(str.replace(/\.|\-/g, '/'));
    }

    // Rule name only allows alphanumeric characters and underscores
    function _checkRuleName(name) {
        return /^\w+$/.test(name);
    }

    // Translate field key to jQuery selector.
    function _key2selector(key) {
        return key.charAt(0) === "#" ? key.replace(/(:|\.|\[|\])/g, "\\$1") : '[name="'+ key +'"]:input';
    }


    // Fixed a issue cause by refresh page in IE.
    $(window).on('beforeunload', function(){
        this.focus();
    });

    $(document)
    .on('click', ':submit', function(){
        var input = this, attrNode;
        if (!input.form) return;
        // Remember the submit button which is clicked
        submitButton = input;
        // Shim for "formnovalidate"
        attrNode = input.getAttributeNode('formnovalidate');
        if (attrNode && attrNode.nodeValue !== null || attr(input, NOVALIDATE)!== null) {
            novalidateonce = true;
        }
    })
    // Automatic initializing form validation
    .on('focusin submit validate', 'form,.'+CLS_WRAPPER, function(e) {
        if ( attr(this, NOVALIDATE) !== null ) return;
        var $form = $(this), me;

        if ( !$form.data(NS) ) {
            me = _getInstance(this);
            if ( !$.isEmptyObject(me.fields) ) {
                // Execute event handler
                if (e.type === 'focusin') {
                    me._focusin(e);
                } else {
                    me._submit(e);
                }
            } else {
                attr(this, NOVALIDATE, NOVALIDATE);
                $form.off(CLS_NS).removeData(NS);
            }
        }
    });

    new Messages({
        fallback: "不能为空",
        loading: '正在加载...'
    });


    // Built-in rules (global)
    new Rules({

        /**
         * required
         *
         * @example:
            required
            required(anotherRule)
            required(not, -1)
            required(from, .contact)
         */
        required: function(element, params, field) {
            var me = this,
                val = trim(elementValue(element)),
                isValid = true;

            if (params) {
                if ( params.length === 1 ) {
                    if ( !_checkRuleName(params[0]) ) {
                        if (!val && !$(params[0], me.$el).length ) {
                            return null;
                        }
                    }
                    else if ( me.rules[params[0]] ) {
                        if ( !val && !me.test(element, params[0]) ) {
                            attr(element, ARIA_REQUIRED, null);
                            return null;
                        } else {
                            attr(element, ARIA_REQUIRED, true);
                        }
                    }
                }
                else if ( params[0] === 'not' ) {
                    $.each(params.slice(1), function() {
                        return (isValid = val !== trim(this));
                    });
                }
                else if ( params[0] === 'from' ) {
                    var $elements = me.$el.find(params[1]),
                        VALIDATED = '_validated_',
                        ret;

                    isValid = $elements.filter(function(){
                        return !!trim(elementValue(this));
                    }).length >= (params[2] || 1);

                    if (isValid) {
                        if (!val) ret = null;
                    } else {
                        ret = _getDataMsg($elements[0], field) || false;
                    }

                    if ( !$(element).data(VALIDATED) ) {
                        $elements.data(VALIDATED, 1).each(function(){
                            if (element !== this) {
                                me._checkRule(this, me.getField(this));
                            }
                        }).removeData(VALIDATED);
                    }

                    return ret;
                }
            }

            return isValid && !!val;
        },

        /**
         * integer
         *
         * @example:
            integer
            integer[+]
            integer[+0]
            integer[-]
            integer[-0]
         */
        integer: function(element, params) {
            var re, z = '0|',
                p = '[1-9]\\d*',
                key = params ? params[0] : '*';

            switch (key) {
                case '+':
                    re = p;
                    break;
                case '-':
                    re = '-' + p;
                    break;
                case '+0':
                    re = z + p;
                    break;
                case '-0':
                    re = z + '-' + p;
                    break;
                default:
                    re = z + '-?' + p;
            }
            re = '^(?:' + re + ')$';

            return new RegExp(re).test(elementValue(element)) || this.messages.integer[key];
        },

        /**
         * match another field
         *
         * @example:
            match[password]    Match the password field (two values ​​must be the same)
            match[eq, password]  Ditto
            match[neq, count]  The value must be not equal to the value of the count field
            match[lt, count]   The value must be less than the value of the count field
            match[lte, count]  The value must be less than or equal to the value of the count field
            match[gt, count]   The value must be greater than the value of the count field
            match[gte, count]  The value must be greater than or equal to the value of the count field
            match[gte, startDate, date]
            match[gte, startTime, time]
         **/
        match: function(element, params, field) {
            if (!params) return;

            var me = this,
                a, b,
                key, msg, type = 'eq', parser,
                selector2, elem2, field2;

            if (params.length === 1) {
                key = params[0];
            } else {
                type = params[0];
                key = params[1];
            }

            selector2 = _key2selector(key);
            elem2 = me.$el.find(selector2)[0];
            // If the compared field is not exist
            if (!elem2) return;
            field2 = me.getField(elem2);
            a = elementValue(element);
            b = elementValue(elem2);

            if (!field._match) {
                me.$el.on('valid'+CLS_NS_FIELD+CLS_NS, selector2, function(){
                    $(element).trigger('validate');
                });
                field._match = field2._match = 1;
            }

            // If both fields are blank
            if (!field.required && a === "" && b === "") {
                return null;
            }

            parser = params[2];
            if (parser) {
                if (/^date(time)?$/i.test(parser)) {
                    a = _parseDate(a);
                    b = _parseDate(b);
                } else if (parser === 'time') {
                    a = +a.replace(/:/g, '');
                    b = +b.replace(/:/g, '');
                }
            }

            // If the compared field is incorrect, we only ensure that this field is correct.
            if (type !== "eq" && !isNaN(+a) && isNaN(+b)) {
                return true;
            }

            msg = me.messages.match[type].replace( '{1}', me._getDisplay( element, field2.display || key ) );

            switch (type) {
                case 'lt':
                    return (+a < +b) || msg;
                case 'lte':
                    return (+a <= +b) || msg;
                case 'gte':
                    return (+a >= +b) || msg;
                case 'gt':
                    return (+a > +b) || msg;
                case 'neq':
                    return (a !== b) || msg;
                default:
                    return (a === b) || msg;
            }
        },

        /**
         * range numbers
         *
         * @example:
            range[0~99]    Number 0-99
            range[0~]      Number greater than or equal to 0
            range[~100]    Number less than or equal to 100
         **/
        range: function(element, params, field) {
            return this.getRangeMsg(elementValue(element), params, field);
        },

        /**
         * how many checkbox or radio inputs that checked
         *
         * @example:
            checked;       no empty, same to required
            checked[1~3]   1-3 items
            checked[1~]    greater than 1 item
            checked[~3]    less than 3 items
            checked[3]     3 items
         **/
        checked: function(element, params, field) {
            if ( !_checkable(element) ) return;

            var me = this,
                elem, count;

            if (element.name) {
                count = me.$el.find('input[name="' + element.name + '"]').filter(function() {
                    var el = this;
                    if (!elem && _checkable(el)) elem = el;
                    return !el.disabled && el.checked;
                }).length;
            } else {
                elem = element;
                count = elem.checked;
            }

            if (params) {
                return me.getRangeMsg(count, params, field);
            } else {
                return !!count || _getDataMsg(elem, field, '') || me.messages.required;
            }
        },

        /**
         * length of a characters (You can pass the second parameter "true", will calculate the length in bytes)
         *
         * @example:
            length[6~16]        6-16 characters
            length[6~]          Greater than 6 characters
            length[~16]         Less than 16 characters
            length[~16, true]   Less than 16 characters, non-ASCII characters calculating two-character
         **/
        length: function(element, params, field) {
            var value = elementValue(element),
                len = (params[1] === 'true' ? value.replace(rDoubleBytes, 'xx') : value).length;

            return this.getRangeMsg(len, params, field, (params[1] ? '_2' : ''));
        },

        /**
         * remote validation
         *
         * @description
         *  remote([get:]url [, name1, [name2 ...]]);
         *  Adaptation three kinds of results (Front for the successful, followed by a failure):
                1. text:
                    ''  'Error Message'
                2. json:
                    {"ok": ""}  {"error": "Error Message"}
                3. json wrapper:
                    {"status": 1, "data": {"ok": ""}}  {"status": 1, "data": {"error": "Error Message"}}
         * @example
            The simplest:       remote(path/to/server);
            With parameters:    remote(path/to/server, name1, name2, ...);
            By GET:             remote(get:path/to/server, name1, name2, ...);
            Name proxy:         remote(path/to/server, name1, proxyname2:name2, proxyname3:#id3, ...)
            Query String        remote(path/to/server, foo=1&bar=2, name1, name2, ...)
         */
        remote: function(element, params, field) {
            if (!params) return;

            var me = this,
                arr = rAjaxType.exec(params[0]),
                rule = field.rules[field._i],
                data = {},
                queryString = '',
                url = arr[3],
                type = arr[2] || 'POST',            // GET / POST
                rType = (arr[1]||'').toLowerCase(), // CORS / JSONP
                dataType;

            rule.must = true;
            data[element.name] = elementValue(element);

            // There are extra fields
            if (params[1]) {
                $.map(params.slice(1), function(name) {
                    var arr, key;
                    if (~name.indexOf('=')) {
                        queryString += '&' + name;
                    } else {
                        arr = name.split(':');
                        name = trim(arr[0]);
                        key = trim(arr[1]) || name;
                        data[ name ] = me.$el.find( _key2selector(key) ).val();
                    }
                });
            }

            data = $.param(data) + queryString;
            if (!field.must && rule.data && rule.data === data) {
                return rule.result;
            }

            // Cross-domain request, force jsonp dataType
            if (rType !== 'cors' && /^https?:/.test(url) && !~url.indexOf(location.host)) {
                dataType = 'jsonp';
            }

            // Asynchronous validation need return jqXHR objects
            return $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: dataType
            });
        },

        /**
         * validate other fields
         *
         * @example
         *  validate(name1, #id2)
         */
        validate: function(element, params) {
            var VALIDATED = '_validated_';
            if(!params || $(element).data(VALIDATED)) return;

            this.$el.find(
                $.map(params, function(key){
                    return _key2selector(key);
                }).join(',')
            ).data(VALIDATED, 1).trigger('validate').removeData(VALIDATED);
        },

        /**
         * filter characters, direct filtration without prompting error (support custom regular expressions)
         *
         * @example
         *  filter          filtering unsafe characters
         *  filter(regexp)  filtering the "regexp" matched characters
         */
        filter: function(element, params) {
            var value = elementValue(element), temp;

            temp = value.replace( params ? (new RegExp("[" + params[0] + "]", "gm")) : rUnsafe, '' );
            if (temp !== value) element.value = temp;
        }
    });


    /**
     * Config global options
     *
     * @static  config
     * @param {Object} options
     */
    Validator.config = function(options) {
        $.each(options, function(k, o) {
            if (k === 'rules') {
                new Rules(o);
            }
            else if (k === 'messages') {
                new Messages(o);
            }
            else {
                defaults[k] = o;
            }
        });
    };

    /**
     * Config themes
     *
     * @static setTheme
     * @param {String|Object} name
     * @param {Object} obj
     * @example
        .setTheme( themeName, themeOptions )
        .setTheme( multiThemes )
     */
    Validator.setTheme = function(name, obj) {
        if ( isObject(name) ) {
            $.extend(true, themes, name);
        }
        else if ( isString(name) && isObject(obj) ) {
            themes[name] = $.extend(themes[name], obj);
        }
    };

    $[NS] = Validator;

    // Resource loader
    (function(URI){
        var arr, node, i, re, dir, el,
            doc = document,
            scripts = doc.getElementsByTagName('script');

        if (URI) {
            node = scripts[0];
            arr = URI.match(/(.*(?:\/|\?))local(?:\/|=)([\w\-]{2,5})(?=\.js)?/);
        } else {
            i = scripts.length;
            re = /(.*validator(?:\.min)?.js)\?.*local=([\w\-]*)/;
            while (i-- && !arr) {
                node = scripts[i];
                arr = (node.hasAttribute ? node.src : node.getAttribute('src',4)||'').match(re);
            }
        }

        if (arr) {
            dir = arr[1].split('/').slice(0, -1).join('/')+'/';
            el = doc.createElement('link');
            el.rel = 'stylesheet';
            el.href = dir + 'jquery.validator.css';
            node.parentNode.insertBefore(el, node);
            if (!URI) {
                Validator.loading = 1;
                el = doc.createElement('script');
                el.src = dir + 'local/' + (arr[2] || doc.documentElement.lang || 'en').replace('_','-') + '.js';
                i = 'onload' in el ? 'onload' : 'onreadystatechange';
                el[i] = function() {
                    if (!el.readyState || /loaded|complete/.test(el.readyState)) {
                        $(window).trigger('validatorready');
                        delete Validator.loading;
                        el = el[i] = null;
                    }
                };
                node.parentNode.insertBefore(el, node);
            }
        }
    })($._VALIDATOR_URI);
    /*基本信息 end*/















    /*配置文件*/
    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        // Custom rules
        rules: {
            digits: [/^\d+$/, "请填写数字"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            }

        },

        // Default error messages
        messages: {
            0: "此处",
            fallback: "{0}格式不正确",
            loading: "正在验证...",
            error: "网络异常",
            timeout: "请求超时",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请填写整数",
                '+': "请填写正整数",
                '+0': "请填写正整数或0",
                '-': "请填写负整数",
                '-0': "请填写负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}不能大于{1}",
                gte: "{0}不能小于{1}"
            },
            range: {
                rg: "请填写{1}到{2}的数",
                gte: "请填写不小于{1}的数",
                lte: "请填写最大{1}的数",
                gtlt: "请填写{1}到{2}之间的数",
                gt: "请填写大于{1}的数",
                lt: "请填写小于{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "请填写{1}个字符",
                rg: "请填写{1}到{2}个字符",
                gte: "请至少填写{1}个字符",
                lte: "请最多填写{1}个字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"></span>';
    $.validator.setTheme({
        // 'simple_right': {
        //     formClass: 'n-simple',
        //     msgClass: 'n-right',
        //     msgArrow: TPL_ARROW
        // },
        // 'simple_bottom': {
        //     formClass: 'n-simple',
        //     msgClass: 'n-bottom',
        //     msgArrow: TPL_ARROW
        // },
        //统一主题样式调用的用法
        //没有设置验证提示出现在表单元素左边的用法和主题
        'yellow_bottom': {
            formClass: 'n-yellow',
            msgClass: 'n-bottom',
            msgArrow: TPL_ARROW
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
    /*配置文件 end*/
})(jQuery);