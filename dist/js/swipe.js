/*! 
*  BrickPlus v1.0.17
*  by fronui team
*  updated on 2016-10-19
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.swipe=t(require("jquery")):e.swipe=t(e.jQuery)}(this,function(e){return function(e){function t(s){if(i[s])return i[s].exports;var r=i[s]={exports:{},id:s,loaded:!1};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}({0:function(e,t,i){e.exports=i(8)},2:function(t,i){t.exports=e},8:function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=void 0,i=void 0,s=void 0;t=e.currentTarget.offsetWidth,i=e.currentTarget.offsetHeight,s={distX:e.distX,distY:e.distY,velocitX:e.velocitX,velocitY:e.velocitY,finger:e.finger},e.distX>e.distY?e.distX>-e.distY?(e.distX/t>l.threshold||e.velocityX*e.distX/t*l.sensitivity>1)&&(s.type="swiperight",c(e.currentTarget,s)):(-e.distY/i>l.threshold||e.velocityY*e.distY/t*l.sensitivity>1)&&(s.type="swipeup",c(e.currentTarget,s)):e.distX>-e.distY?(e.distY/i>l.threshold||e.velocityY*e.distY/t*l.sensitivity>1)&&(s.type="swipedown",c(e.currentTarget,s)):(-e.distX/t>l.threshold||e.velocityX*e.distX/t*l.sensitivity>1)&&(s.type="swipeleft",c(e.currentTarget,s))}function n(e){var t=d["default"].data(e,"event_swipe");return t||(t={count:0},d["default"].data(e,"event_swipe",t)),t}Object.defineProperty(t,"__esModule",{value:!0});var o=i(2),d=s(o),u=d["default"].event.add,f=d["default"].event.remove,c=function(e,t,i){d["default"].event.trigger(t,i,e)},l={threshold:.4,sensitivity:6};d["default"].event.special.swipe=d["default"].event.special.swipeleft=d["default"].event.special.swiperight=d["default"].event.special.swipeup=d["default"].event.special.swipedown={setup:function(e,t,i){if(e=n(this),!(e.count++>0))return u(this,"moveend",r),!0},teardown:function(){var e=n(this);if(!(--e.count>0))return f(this,"moveend",r),!0},settings:l},t["default"]=d["default"]}})});