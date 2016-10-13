/*! 
*  BrickPlus v1.0.12
*  by fronui team
*  updated on 2016-10-13
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.progress=e(require("jquery")):t.progress=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}({0:function(t,e,r){t.exports=r(19)},2:function(e,r){e.exports=t},3:function(t,e,r){"use strict";function n(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var r in e)if(void 0!==t.style[r])return{end:e[r]};return!1}var i=r(2);i.fn.emulateTransitionEnd=function(t){var e=!1,r=this;i(this).one("uiTransitionEnd",function(){e=!0});var n=function(){e||i(r).trigger(i.support.transition.end)};return setTimeout(n,t),this},i(function(){i.support.transition=n(),i.support.transition&&(i.event.special.uiTransitionEnd={bindType:i.support.transition.end,delegateType:i.support.transition.end,handle:function(t){if(i(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})}),t.exports=n},19:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return(0,u["default"])(this).each(function(){var e,n=(0,u["default"])(this),i=n.data("bp.progress");i||n.data("bp.progress",i=new d(n,u["default"].extend("string"==typeof t?{}:t,n.data()))),"string"==typeof t&&"function"==typeof i[t]&&(e=i)[t].apply(e,r)})}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),a=r(2),u=n(a),p=r(3),f=(n(p),'.progress,[data-toggle="progress"]'),d=function(){function t(e,r){i(this,t),this.el=(0,u["default"])(e),this.props=u["default"].extend({},t.DEFAULTS,r),this.striped=this.props.striped,this.barEl=this.props.bar?this.el.find(this.props.bar):this.el.find(".progress-bar"),this.props.percent>0&&this.go(this.props.percent)}return o(t,[{key:"go",value:function(t){var e=this;if(!this.barEl.hasClass("bar-disabled")){isNaN(t)?t=0:t>100&&(t=100),this.barEl.css({width:t+"%"}),this.props.txt&&this.barEl.html(t+"%");var r=function(){e.el.trigger("completed.bp.progress")};100==t&&(u["default"].support.transition?this.barEl.one("uiTransitionEnd",r).emulateTransitionEnd(this.props.speed):r)}}},{key:"setStriped",value:function(t){this.striped=t,this.barEl.toggleClass("bar-striped",t)}},{key:"change",value:function(t){t=""===t?"default":"bar-"+t;var e=this.striped?"bar-striped":"";this.barEl.attr("class",function(){return"progress-bar "+e+" "+t})}}]),t}();e["default"]=d,d.DEFAULTS={speed:2e3,percent:0,bar:"",striped:!0,txt:!1},u["default"].fn.progress=s,u["default"].fn.progress.constructor=d,(0,u["default"])(function(){(0,u["default"])(f).progress()})}})});