/*! 
*  BrickPlus v1.2.0
*  by fronui team
*  updated on 2016-11-30
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?exports.placeholder=o(require("jquery")):e.placeholder=o(e.jQuery)}(this,function(e){return function(e){function o(r){if(t[r])return t[r].exports;var l=t[r]={exports:{},id:r,loaded:!1};return e[r].call(l.exports,l,l.exports,o),l.loaded=!0,l.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}({0:function(e,o,t){e.exports=t(18)},2:function(o,t){o.exports=e},18:function(e,o,t){"use strict";function r(){return l(this).each(function(){var e=l(this),o=e.data("bp.placeholder");o||e.data("bp.placeholder",o=new n(this))})}var l=t(2),c=document.createElement("input"),i="placeholder"in c,n=function(e){var o=this;o.$el=l(e),this.init()};n.VERSION="1.2.0",n.prototype.init=function(){if(!i){var e=this;if(this.$placeholder=e.$el.data("placeholder"),!i&&!this.$placeholder){var o=e.$el.attr("placeholder");e.$placeholder=l('<label class="form-control-placeholder" />').html(o),e.$el.data("placeholder",e.$placeholder).before(e.$placeholder)}e.$el.on("focus",l.proxy(this.focus,this)),e.$el.on("blur",l.proxy(this.blur,this)),e.$placeholder.on("click",l.proxy(this.focus,this)),this.blur()}},n.prototype.focus=function(){this.$placeholder.hide()},n.prototype.blur=function(){this.$placeholder[""===this.$el.val()?"show":"hide"]()},l.fn.placeholder=r,l.fn.placeholder.Constructor=n,l(function(){l("input[placeholder]").placeholder()}),e.exports=n}})});