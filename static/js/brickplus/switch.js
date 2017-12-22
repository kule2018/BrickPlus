/*! 
*  BrickPlus v1.2.1
*  by fronui team
*  updated on 2017-12-22
*  created by generator-frontman
*  (c) 2014-2017 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports["switch"]=e(require("jquery")):t["switch"]=e(t.jQuery)}(this,function(t){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}({0:function(t,e,i){t.exports=i(22)},1:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;e>n;n++)i[n-1]=arguments[n];if(!(0,r["default"])(this).length&&t&&/^#(\w*)/gi.test((0,r["default"])(this).selector)){var o=void 0,a=void 0;"string"==typeof t&&(a=t,t={title:"标题",content:""}),t.mid=(0,r["default"])(this).selector.replace(/^#/g,"");var s=c.render(t);return s.data("bp.modal",o=new c(s,t)),"string"==typeof a&&"function"==typeof o[a]&&o[a].apply(o,i),"function"==typeof t.callback&&t.callback.call(s),o.show(),s}return(0,r["default"])(this).each(function(){var e=(0,r["default"])(this),n=e.data("bp.modal"),o=r["default"].extend({},c.DEFAULTS,e.data(),r["default"].isPlainObject(t)?t:{});n||e.data("bp.modal",n=new c(e,o)),"string"==typeof t?"function"==typeof n[t]&&n[t].apply(n,i):r["default"].isPlainObject(t)&&(t.title&&n.setTitle(t.title),t.content&&n.setContent(t.content),n.show(i))})}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),l=i(2),r=n(l);i(3);var d='[data-toggle="modal"]',c=function(){function t(e,i){o(this,t),this.el=(0,r["default"])(e),this.props=r["default"].extend({},t.DEFAULTS,i),this.$body=(0,r["default"])(document.body),this.$dialog=this.el.find(".modal-wrap"),this.$backdrop=null,this.isShown=!1,this.originalBodyPad=null,this.scrollbarWidth=0,this.size=this.props.size,this.isHideRemove=this.props.isHideRemove||!1,this.setSize(this.size,!0),this.props.remote&&this.el.find(".modal-body").load(this.props.remote,r["default"].proxy(function(){this.el.trigger("loaded.bp.modal")},this))}return s(t,[{key:"toggle",value:function(t){return this.isShown?this.hide():this.show(t)}},{key:"show",value:function(e){var i=this,n=r["default"].Event("show.pb.modal",{reletedTarget:e});if(!this.isShown&&!n.isDefaultPrevented()){this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.el.on("click.dismiss.pb.modal",'[data-dismiss="modal"], .modal-close',r["default"].proxy(this.hide,this));var o=r["default"].support.transition;this.el.addClass("in").scrollTop(0).attr("tabindex",-1),this.$dialog.addClass("bounceInDown"),this.adjustDialog(),o&&this.el[0].offsetWidth,this.enforceFocus(),o?this.el.attr("aria-hidden",!1).one("uiTransitionEnd",function(){return i.el.trigger("focus").trigger(n)}).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.attr("aria-hidden",!0).fadeIn(t.TRANSITION_DURATION,function(){return i.el.trigger("focus").trigger(n)})}}},{key:"hide",value:function(e){var i=this;e&&e.preventDefault(),(this.el.is(":visible")||this.isShown)&&(this.isShown=!1,this.escape(),(0,r["default"])(document).off("focusin.pb.modal").off("keydown.bp.modal"),this.el.attr("aria-hidden",!0).off("click.dismiss.pb.modal").off("mouseup.dismiss.pb.modal"),this.$dialog.off("mousedown.dismiss.bp.modal"),r["default"].support.transition?this.el.one("uiTransitionEnd",r["default"].proxy(this.hideModal,this)).emulateTransitionEnd(t.TRANSITION_DURATION):this.el.fadeOut(t.TRANSITION_DURATION,function(){return i.hideModal()}))}},{key:"escape",value:function(){var t=this;this.isShown&&this.props.keyboard?this.el.on("keydown.dismiss.bp.modal",function(e){27===e.which&&t.hide()}):this.isShown||this.el.off("keydown.dismiss.bp.modal")}},{key:"hideModal",value:function(){var t=r["default"].Event("hide.bp.modal",{reletedTarget:this.el});this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$dialog.removeClass("bounceInDown"),this.el.removeClass("in").trigger(t),this.isHideRemove&&this.el.remove()}},{key:"handleUpdate",value:function(){this.ajustDialog()}},{key:"adjustDialog",value:function(){var t=this.el[0].scrollHeight>document.documentElement.clientHeight;this.el.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})}},{key:"resetAdjustments",value:function(){this.el.css({paddingLeft:"",paddingRight:""})}},{key:"enforceFocus",value:function(){var t=this;(0,r["default"])(document).off("focusin.bp.modal").on("focusin.bp.modal",function(e){t.el[0]===e.target||t.el.has(e.target).length||t.$dialog.trigger("focus")})}},{key:"checkScrollbar",value:function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()}},{key:"setScrollbar",value:function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)}},{key:"resetScrollbar",value:function(){this.$body.css("padding-right",this.originalBodyPad)}},{key:"measureScrollbar",value:function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body[0].appendChild(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e}},{key:"setContent",value:function(t){var e=this.el.find(".modal-body");e.length&&e.html(t||"")}},{key:"setTitle",value:function(t){var e=this.el.find(".modal-title");e.length&&e.html(t||"")}},{key:"setSize",value:function(t,e){if(this.size!==t||e){for(var i=this.el.attr("class").split(" "),n=0,o=[];n<i.length;n++)-1===i[n].indexOf("-modal")&&o.push(i[n]);t&&o.push(t+"-modal"),this.el.attr("class",o.join(" "))}}}]),t}();e["default"]=c,c.TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0,size:!1},c.TEMPLATE='\n    <div class="modal-background fade" id="{{mid}}">\n        <div class="modal-layer">\n            <div class="modal-position">\n            <div class="modal-wrap animated bounceInDown">\n                <div class="modal-head">\n                    <span class="modal-title">{{title}}</span>\n                    <i class="modal-close"></i>\n                </div>\n                <div class="modal-body">\n                {{content}}\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n',c.render=function(t){var e=(0,r["default"])(document.body),i=void 0;return r["default"].isPlainObject(t)&&(i=c.TEMPLATE.replace(/{{(\w*)}}/gi,function(e,i){var n=t[i];return n&&"string"==typeof n?/^(\.|#)\w*/gi.test(n)?(0,r["default"])(n).html():n:n&&n instanceof r["default"]&&n.length>0?n.html():void 0}),i=(0,r["default"])(i).appendTo(e)),i},r["default"].fn.modal=a,r["default"].fn.modal.Constructor=c,r["default"].closeModal=function(t){(0,r["default"])(t).modal("hide")};var u=function(t){var e=(0,r["default"])(this),i=e.attr("href"),n=(0,r["default"])(e.attr("data-target"))||i&&i.replace(/.*(?=#[^\s]+$)/,"");a.call(n,"show",this)};(0,r["default"])(function(){(0,r["default"])(document).on("click.bp.modal",d,function(t){u.call(t.target,t)})})},2:function(e,i){e.exports=t},3:function(t,e,i){"use strict";function n(){var t=document.createElement("ui"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}var o=i(2);o.fn.emulateTransitionEnd=function(t){var e=!1,i=this;o(this).one("uiTransitionEnd",function(){e=!0});var n=function(){e||o(i).trigger(o.support.transition.end)};return setTimeout(n,t),this},o(function(){o.support.transition=n(),o.support.transition&&(o.event.special.uiTransitionEnd={bindType:o.support.transition.end,delegateType:o.support.transition.end,handle:function(t){return o(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})}),t.exports=n},22:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;e>n;n++)i[n-1]=arguments[n];return(0,r["default"])(this).each(function(){var e,n=(0,r["default"])(this),o=n.data("bp.switch");o||n.data("bp.switch",o=new c(n,t)),t.type&&"string"==typeof t.type&&"function"==typeof o[t.type]&&(e=o)[t.type].apply(e,i)})}var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),l=i(2),r=n(l),d=i(23),c=(n(d),function(){function t(e,i){o(this,t),this.el=(0,r["default"])(e),this.props=i,this.isChecked=this.el.hasClass("checked"),i.docClick||this.el.on("click",r["default"].proxy(this.toggle,this))}return s(t,[{key:"toggle",value:function(t){t&&t.preventDefault()&&t.stopPropagation(),this.el.hasClass("disabled")||(this.props.isSecondCheck?r["default"].confirmModalLayer({title:this.props.secondCheckOption.title||"提示",content:r["default"].proxy(this._getConfirmContent,this)(),callback:r["default"].proxy(this._confirmModalLayerCallBack,this),isHideRemove:!0}):this._toggleClass())}},{key:"_getConfirmContent",value:function(){var t=this.props.secondCheckOption.getContent(this.isChecked);return t}},{key:"_confirmModalLayerCallBack",value:function(){this.props.secondCheckOption.secondCheckCallBack(this.el,this.isChecked),this._toggleClass()}},{key:"_toggleClass",value:function(){this.el.toggleClass("checked",!this.isChecked).trigger("checked.bp.switch",!this.isChecked),this.isChecked=!this.isChecked}}]),t}());r["default"].fn["switch"]=a,r["default"].fn["switch"].constructor=c},23:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t){function e(){var t=(0,d["default"])(this);(0,d["default"])(this).on("click.btnEvents",".bp-modallayer-btns .btn",function(){var e=(0,d["default"])(this).data("index"),i=!0;a.length&&a[e]&&a[e].callback&&"function"==typeof a[e].callback&&(i=a[e].callback.call(a[e].callbackPointer,(0,d["default"])(this),e)!==!1),i&&t.modal("hide")})}var i=void 0,n=void 0,o=[],a=t.buttons;n=d["default"].extend({},f.DEFAULTS,t);for(var s=0;s<a.length;s++)a[s].href?o.push('<a href="'+a[s].href+'" '+(a[s].target?'target="'+a[s].target+'"':"")+' class="'+(a[s].style||"btn primary")+'" data-index="'+s+'">'+a[s].text+"</a>"):o.push('<button type="button" class="'+(a[s].style||"btn primary w-150")+'" data-index="'+s+'">'+a[s].text+"</button>");n.content=f.render({status:n.icon?"result-"+n.icon:"",title:n.title,contentTitle:t.contentTitle||"",content:t.content||"",buttons:o.join("")}),n.callback=e,i=(0,d["default"])(this).modal({title:n.title,content:n.content,callback:n.callback,size:n.size,isHideRemove:n.isHideRemove})}Object.defineProperty(e,"__esModule",{value:!0});var r=i(2),d=n(r),c=i(1),u=n(c),f=function(t){function e(t,i){return o(this,e),a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i))}return s(e,t),e}(u["default"]);e["default"]=f,f.DEFAULTS={icon:"info",title:"提示",contentTitle:"",content:"",close:!0,size:!1,buttons:[{text:"确定",href:!1,style:"btn primary",target:!1,callback:d["default"].noop}]},f.TEMPLATE='\n    <div class="result-wrap result-s result-vertical {{status}}">\n      <div class="result-box">\n        <div class="result-icon"></div>\n        <div class="result-content">\n          <div class="result-inner">\n            <h1>\n              {{contentTitle}}\n            </h1>\n            <p class="bp-modallayer-content text-align-center fn-pt-5">\n              {{content}}\n            </p>\n            <div class="bp-modallayer-btns text-align-center fn-pb-40 fn-pt-20">\n              {{buttons}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n',f.render=function(t){var e=void 0;return e=f.TEMPLATE.replace(/{{(\w*)}}/gi,function(e,i){var n=t[i];return n})},d["default"].fn.modalLayer=l,d["default"].fn.modalLayer.constructor=f,d["default"].successModalLayer=function(t){if(d["default"].isPlainObject(t)){var e=t.id?t.id:"#bp-successModalLayer";return(0,d["default"])(e).modalLayer({icon:"success",size:t.size,title:t.title,contentTitle:t.contentTitle,content:t.content,buttons:[{style:"btn secondary w-150 "+t.buttonClassName,text:t.okText,callback:t.callback}],isHideRemove:t.isHideRemove||!1})}},d["default"].confirmModalLayer=function(t){if(d["default"].isPlainObject(t)){var e=t.id?t.id:"#bp-confirmModalLayer";return(0,d["default"])(e).modalLayer({icon:"info",size:t.size,title:t.title,contentTitle:t.contentTitle,content:t.content||"",buttons:[{text:"确定",callback:t.callback}],isHideRemove:t.isHideRemove||!1})}},d["default"].alertModalLayer=function(t){if(d["default"].isPlainObject(t)){var e=t.id?t.id:"#bp-alertModalLayer";return(0,d["default"])(e).modalLayer({icon:"info",size:t.size,title:t.title,contentTitle:t.contentTitle,content:t.content,buttons:[{text:"确定",callback:t.callback}],isHideRemove:t.isHideRemove||!1})}},d["default"].errorModalLayer=function(t){if(d["default"].isPlainObject(t)){var e=t.id?t.id:"#bp-infoModalLayer";return(0,d["default"])(e).modalLayer({icon:"fail",size:t.size,title:t.title,contentTitle:t.contentTitle,content:t.content,buttons:[{text:"确定",style:"btn thirdly w-150",callback:t.callback}],isHideRemove:t.isHideRemove||!1})}}}})});