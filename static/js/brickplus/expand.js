/*! 
*  BrickPlus v1.1.3
*  by fronui team
*  updated on 2016-11-22
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.expand=t(require("jquery")):e.expand=t(e.jQuery)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(41)},2:function(t,n){t.exports=e},41:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),u=r(i),l=function(){function e(t,n){a(this,e),this.el=(0,u["default"])(t),this.props=u["default"].extend({},e.DEFAULTS,n),this.originalText=this.el.html(),this.expand=this.props.expand,this._initEvent()}return o(e,[{key:"_initEvent",value:function(){var e=this;this.el.on("click",function(t){t.preventDefault();var n=(0,u["default"])(t.target),r=n.attr("data-text"),a=n.attr("data-active"),o=n.attr("data-target-active"),i=(0,u["default"])(n.attr("data-target"));e.expand=!e.expand,e.expand?(n.addClass(a).html(r),i.length&&i.addClass(o)):(n.removeClass(a).html(e.originalText),i.length&&i.removeClass(o)),e.props.callback()})}}]),e}();t["default"]=l,l.DEFAULTS={target:"",expand:!1,callback:u["default"].noop}}})});