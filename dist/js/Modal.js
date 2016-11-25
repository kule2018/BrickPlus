/*! 
*  BrickPlus v1.1.7
*  by fronui team
*  updated on 2016-11-25
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.Modal=e(require("jquery")):t.Modal=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];if(!(0,d["default"])(this).length&&t&&/^#(\w*)/gi.test((0,d["default"])(this).selector)){var o=void 0,s=void 0;"string"==typeof t&&(s=t,t={title:"标题",content:""}),t.mid=(0,d["default"])(this).selector.replace(/^#/g,"");var a=u.render(t);return a.data("bp.modal",o=new u(a,t)),"string"==typeof s&&"function"==typeof o[s]&&o[s].apply(o,i),"function"==typeof t.callback&&t.callback.call(a),o.show(),a}return(0,d["default"])(this).each(function(){var e=(0,d["default"])(this),n=e.data("bp.modal"),o=d["default"].extend({},u.DEFAULTS,e.data(),d["default"].isPlainObject(t)?t:{});n||e.data("bp.modal",n=new u(e,o)),"string"==typeof t?"function"==typeof n[t]&&n[t].apply(n,i):d["default"].isPlainObject(t)&&(t.title&&n.setTitle(t.title),t.content&&n.setContent(t.content),n.show(i))})}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),l=i(2),d=n(l);i(3);var r='[data-toggle="modal"]',u=function(){function t(e,i){o(this,t),this.el=(0,d["default"])(e),this.props=d["default"].extend({},t.DEFAULTS,i),this.$body=(0,d["default"])(document.body),this.$dialog=this.el.find(".modal-wrap"),this.$backdrop=null,this.isShown=!1,this.originalBodyPad=null,this.scrollbarWidth=0,this.size=this.props.size,this.isHideRemove=this.props.isHideRemove||!1,this.setSize(this.size,!0),this.props.remote&&this.el.find(".modal-body").load(this.props.remote,d["default"].proxy(function(){this.el.trigger("loaded.bp.modal")},this))}return a(t,[{key:"toggle",value:function(t){return this.isShown?this.hide():this.show(t)}},{key:"show",value:function(e){var i=this,n=d["default"].Event("show.pb.modal",{reletedTarget:e});if(!this.isShown&&!n.isDefaultPrevented()){this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.el.on("click.dismiss.pb.modal",'[data-dismiss="modal"], .modal-close',d["default"].proxy(this.hide,this));var o=d["default"].support.transition;this.el.addClass("in").scrollTop(0).attr("tabindex",-1),this.$dialog.addClass("bounceInDown"),this.adjustDialog(),o&&this.el[0].offsetWidth,this.enforceFocus(),o?this.el.attr("aria-hidden",!1).one("uiTransitionEnd",function(){return i.el.trigger("focus").trigger(n)}).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.attr("aria-hidden",!0).fadeIn(t.TRANSITION_DURATION,function(){return i.el.trigger("focus").trigger(n)})}}},{key:"hide",value:function(e){var i=this;e&&e.preventDefault(),(this.el.is(":visible")||this.isShown)&&(this.isShown=!1,this.escape(),(0,d["default"])(document).off("focusin.pb.modal").off("keydown.bp.modal"),this.el.attr("aria-hidden",!0).off("click.dismiss.pb.modal").off("mouseup.dismiss.pb.modal"),this.$dialog.off("mousedown.dismiss.bp.modal"),d["default"].support.transition?this.el.one("uiTransitionEnd",d["default"].proxy(this.hideModal,this)).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.fadeOut(t.TRANSITION_DURATION,function(){return i.hideModal()}))}},{key:"escape",value:function(){var t=this;this.isShown&&this.props.keyboard?this.el.on("keydown.dismiss.bp.modal",function(e){27===e.which&&t.hide()}):this.isShown||this.el.off("keydown.dismiss.bp.modal")}},{key:"hideModal",value:function(){var t=d["default"].Event("hide.bp.modal",{reletedTarget:this.el});this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$dialog.removeClass("bounceInDown"),this.el.removeClass("in").trigger(t),this.isHideRemove&&this.el.remove()}},{key:"handleUpdate",value:function(){this.ajustDialog()}},{key:"adjustDialog",value:function(){var t=this.el[0].scrollHeight>document.documentElement.clientHeight;this.el.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})}},{key:"resetAdjustments",value:function(){this.el.css({paddingLeft:"",paddingRight:""})}},{key:"enforceFocus",value:function(){var t=this;(0,d["default"])(document).off("focusin.bp.modal").on("focusin.bp.modal",function(e){t.el[0]===e.target||t.el.has(e.target).length||t.$dialog.trigger("focus")})}},{key:"checkScrollbar",value:function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()}},{key:"setScrollbar",value:function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)}},{key:"resetScrollbar",value:function(){this.$body.css("padding-right",this.originalBodyPad)}},{key:"measureScrollbar",value:function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body[0].appendChild(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e}},{key:"setContent",value:function(t){var e=this.el.find(".modal-body");e.length&&e.html(t||"")}},{key:"setTitle",value:function(t){var e=this.el.find(".modal-title");e.length&&e.html(t||"")}},{key:"setSize",value:function(t,e){if(this.size!==t||e){for(var i=this.el.attr("class").split(" "),n=0,o=[];n<i.length;n++)i[n].indexOf("-modal")===-1&&o.push(i[n]);t&&o.push(t+"-modal"),this.el.attr("class",o.join(" "))}}}]),t}();e["default"]=u,u.TRANSITION_DURATION=150,u.DEFAULTS={backdrop:!0,keyboard:!0,show:!0,size:!1},u.TEMPLATE='\n    <div class="modal-background fade" id="{{mid}}">\n        <div class="modal-layer">\n            <div class="modal-position">\n            <div class="modal-wrap animated bounceInDown">\n                <div class="modal-head">\n                    <span class="modal-title">{{title}}</span>\n                    <i class="modal-close"></i>\n                </div>\n                <div class="modal-body">\n                {{content}}\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n',u.render=function(t){var e=(0,d["default"])(document.body),i=void 0;return d["default"].isPlainObject(t)&&(i=u.TEMPLATE.replace(/{{(\w*)}}/gi,function(e,i){var n=t[i];return n&&"string"==typeof n?/^(\.|#)\w*/gi.test(n)?(0,d["default"])(n).html():n:n&&n instanceof d["default"]&&n.length>0?n.html():void 0}),i=(0,d["default"])(i).appendTo(e)),i},d["default"].fn.modal=s,d["default"].fn.modal.Constructor=u,d["default"].closeModal=function(t){(0,d["default"])(t).modal("hide")};var h=function(t){var e=(0,d["default"])(this),i=e.attr("href"),n=(0,d["default"])(e.attr("data-target"))||i&&i.replace(/.*(?=#[^\s]+$)/,"");s.call(n,"show",this)};(0,d["default"])(function(){(0,d["default"])(document).on("click.bp.modal",r,function(t){h.call(t.target,t)})})},function(e,i){e.exports=t},function(t,e,i){"use strict";function n(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}var o=i(2);o.fn.emulateTransitionEnd=function(t){var e=!1,i=this;o(this).one("uiTransitionEnd",function(){e=!0});var n=function(){e||o(i).trigger(o.support.transition.end)};return setTimeout(n,t),this},o(function(){o.support.transition=n(),o.support.transition&&(o.event.special.uiTransitionEnd={bindType:o.support.transition.end,delegateType:o.support.transition.end,handle:function(t){if(o(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})}),t.exports=n}])});