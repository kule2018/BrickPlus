/*! 
*  BrickPlus v1.0.7
*  by fronui team
*  updated on 2016-10-09
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.scroller=e(require("jquery")):t.scroller=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(r[i])return r[i].exports;var s=r[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(6)},,function(e,r){e.exports=t},,,,function(t,e,r){"use strict";function i(t){return s(this).each(function(){var e=s(this),r=e.data("bp.scroller");r||e.data("bp.scroller",r=new n(e,t)),"string"==typeof t&&r[t]()})}var s=r(2),n=function o(t,e){this.$el=s(t),this.options=s.extend({},o.DEFUALTS,e),this.init()};n.prototype={constructor:n,init:function(){this.$items=this.$el.find(this.options.item),this.max=this.$items.length,this.max<=1||(this.$el.addClass("scroller"+(this.options.dir?"":" reverse")),this.$items.slice(1,this.max).addClass("ready"),this.controller=null,this.current=0,this.run())},run:function(){this.start(),this.$el.on("mouseenter",s.proxy(this.stop,this)),this.$el.on("mouseleave",s.proxy(this.start,this))},start:function(){this.controller=setInterval(s.proxy(this.interval,this),this.options.interval)},stop:function(){clearInterval(this.controller)},interval:function(){this.current=this.current>=this.max-1?0:++this.current;var t=this.getActiveIndexs();this.$items.eq(t[0]).removeClass("enter").addClass("leave").one("uiTransitionEnd",function(){s(this).removeClass("leave").addClass("ready")}).emulateTransitionEnd(this.options.timer),this.$items.eq(t[1]).addClass("enter")},getActiveIndexs:function(){return[this.current-1<0?this.max-1:this.current-1,this.current]},destroy:function(){return this.stop(),this.$el.detach().remove(),null}},n.DEFUALTS={timer:300,item:"li",interval:3e3,dir:1},s.fn.Scroller=i,s.fn.Scroller.constructor=n,t.exports=n}])});