/*! 
*  BrickPlus v1.0.12
*  by fronui team
*  updated on 2016-10-13
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.alert=e(require("jquery")):t.alert=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(5)},,function(e,r){e.exports=t},function(t,e,r){"use strict";function n(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var r in e)if(void 0!==t.style[r])return{end:e[r]};return!1}var i=r(2);i.fn.emulateTransitionEnd=function(t){var e=!1,r=this;i(this).one("uiTransitionEnd",function(){e=!0});var n=function(){e||i(r).trigger(i.support.transition.end)};return setTimeout(n,t),this},i(function(){i.support.transition=n(),i.support.transition&&(i.event.special.uiTransitionEnd={bindType:i.support.transition.end,delegateType:i.support.transition.end,handle:function(t){if(i(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})}),t.exports=n},,function(t,e,r){"use strict";function n(t){var e=[].slice.call(arguments,1);return i(this).each(function(){var r=i(this),n=r.data("bp.alert");n||r.data("bp.alert",n=new a(r,t)),"string"==typeof t&&n[t].apply(n,e)})}var i=r(2),s=(r(3),r(6)),o='[data-dismiss="alert"]',a=function(t,e){this&&(this.$el=i(t),this.iScroller=null,this.$el.is(".alert")&&this.scroller())};a.VERSION="1.0.12",a.TRANSITION_DURATION=300,a.prototype.close=function(t,e){function r(){var t=n.data("bp.alert"),e=i.Event("closed.bp.alert",{relatedTarget:n});t&&t.iScroller&&t.iScroller.destroy(),n.trigger(e).detach().remove()}t&&t.preventDefault();var n=this.$el;!e&&n.trigger(t=i.Event("close.bp.alert")),t.isDefaultPrevented()&&!e||(n.addClass("out"),i.support.transition?n.one("uiTransitionEnd",r).emulateTransitionEnd(a.TRANSITION_DURATION):n.fadeOut(a.TRANSITION_DURATION,r))},a.prototype._getParent=function(t){var e=i(t),r=e.attr("data-target");r||(r=e.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));var n=i(r);return n.length||(n=e.closest(".alert")),n},a.prototype.scroller=function(){var t=this.$el.find("ul");!!t.length&&(this.iScroller=new s(t))},i.fn.alert=n,i.fn.alert.Constructor=a,i(function(){i(".alert").alert(),i(document).on("click.bp.alert",o,function(t){var e=a.prototype._getParent(t.target);i(e).length&&i(e).alert("close",t)})}),t.exports=a},function(t,e,r){"use strict";function n(t){return i(this).each(function(){var e=i(this),r=e.data("bp.scroller");r||e.data("bp.scroller",r=new s(e,t)),"string"==typeof t&&r[t]()})}var i=r(2),s=function o(t,e){this.$el=i(t),this.options=i.extend({},o.DEFUALTS,e),this.init()};s.prototype={constructor:s,init:function(){this.$items=this.$el.find(this.options.item),this.max=this.$items.length,this.max<=1||(this.$el.addClass("scroller"+(this.options.dir?"":" reverse")),this.$items.slice(1,this.max).addClass("ready"),this.controller=null,this.current=0,this.run())},run:function(){this.start(),this.$el.on("mouseenter",i.proxy(this.stop,this)),this.$el.on("mouseleave",i.proxy(this.start,this))},start:function(){this.controller=setInterval(i.proxy(this.interval,this),this.options.interval)},stop:function(){clearInterval(this.controller)},interval:function(){this.current=this.current>=this.max-1?0:++this.current;var t=this.getActiveIndexs();this.$items.eq(t[0]).removeClass("enter").addClass("leave").one("uiTransitionEnd",function(){i(this).removeClass("leave").addClass("ready")}).emulateTransitionEnd(this.options.timer),this.$items.eq(t[1]).addClass("enter")},getActiveIndexs:function(){return[this.current-1<0?this.max-1:this.current-1,this.current]},destroy:function(){return this.stop(),this.$el.detach().remove(),null}},s.DEFUALTS={timer:300,item:"li",interval:3e3,dir:1},i.fn.Scroller=n,i.fn.Scroller.constructor=s,t.exports=s}])});