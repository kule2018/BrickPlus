/*! 
*  BrickPlus v1.0.3
*  by fronui team
*  updated on 2016-09-28
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof exports?exports.panel=n(require("jquery")):t.panel=n(t.jQuery)}(this,function(t){return function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}({0:function(t,n,e){t.exports=e(29)},2:function(n,e){n.exports=t},3:function(t,n,e){"use strict";function i(){var t=document.createElement("ui"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var e in n)if(void 0!==t.style[e])return{end:n[e]};return!1}var o=e(2);o.fn.emulateTransitionEnd=function(t){var n=!1,e=this;o(this).one("uiTransitionEnd",function(){n=!0});var i=function(){n||o(e).trigger(o.support.transition.end)};return setTimeout(i,t),this},o(function(){o.support.transition=i(),o.support.transition&&(o.event.special.uiTransitionEnd={bindType:o.support.transition.end,delegateType:o.support.transition.end,handle:function(t){return o(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})}),t.exports=i},29:function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}(),a=e(2),s=i(a);e(3);var u=function(){function t(n,e,i){o(this,t),this.el=(0,s["default"])(n),this.container=(0,s["default"])(e),this.props=s["default"].extend({},t.DEFAULTS,i),this.opened=this.props.opened,this.toggleCls=this.el.attr("data-active"),this.containerCls=this.el.attr("data-container-active"),this.props.autoHide&&this.autoBindEvent(),this.props.btn&&this.btnBindEvent()}return r(t,[{key:"autoBindEvent",value:function(){this.el.on("click",function(t){return t.stopPropagation()}),(0,s["default"])(document).on("click.close.rightPanel",s["default"].proxy(this.hide,this))}},{key:"btnBindEvent",value:function(){var t=this;(0,s["default"])(this.props.btn).on("click",function(n){n.preventDefault(),n.stopPropagation(),t.toggle()})}},{key:"show",value:function(){this.toggle(!0)}},{key:"hide",value:function(){this.toggle(!1)}},{key:"toggle",value:function(n){var e=this;this.opened=void 0===n?!this.opened:n;var i=function(){e.el.toggleClass(e.toggleCls,e.opened),e.container.toggleClass(e.containerCls,e.opened),e.props.callback(e.opened)};s["default"].support.transition?(this.container[0].offsetWidth,this.container.one("uiTransitionEnd",i).emulateTransitionEnd(t.TRANSITION_DURATION)):"function"==typeof this.props.polyfill?this.props.polyfill(this.el,this.container,i):i()}}]),t}();n["default"]=u,u.DEFAULTS={autoHide:!1,opened:!1,btn:"",callback:s["default"].noop,polyfill:null},u.TRANSITION_DURATION=150}})});