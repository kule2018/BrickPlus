/*! 
*  BrickPlus v1.0.13
*  by fronui team
*  updated on 2016-10-13
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?exports.dataTable=e(require("jquery")):t.dataTable=e(t.jQuery)}(this,function(t){return function(t){function e(i){if(a[i])return a[i].exports;var n=a[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}({0:function(t,e,a){t.exports=a(29)},2:function(e,a){e.exports=t},10:function(t,e,a){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),s=a(2),r='[data-toggle="checkAll"]',o=function(){function t(e){i(this,t),this.$el=s(e),this.$target=s(this.$el.data("target")),this.isReverse=Boolean(this.$el.data("reverse")),this.isNoCheckAll=Boolean(this.$el.data("nocheckall")),this.VERSION="1.0.13",this.initEvents()}return n(t,[{key:"initEvents",value:function(){this.$el.on("click",s.proxy(this.toggle,this)),!this.isReverse&&this.$target.on("change.status",s.proxy(this.targetToggle,this))}},{key:"toggle",value:function(){this.isReverse?this.reverse():this.activate()}},{key:"targetToggle",value:function(){if(this.isReverse)return!1;var t=!0;this.isNoCheckAll?(t=!1,this.$target.map(function(){if(s(this).prop("checked"))return t=!0,!1})):this.$target.map(function(){if(!s(this).prop("checked"))return t=!1,!1}),this.$el.prop("checked",t).trigger("change.status")}},{key:"activate",value:function(t){var e=[t||t===!1?t:this.$el.is(":checked"),s.Event("checked.bp.checkAll",{relatedTarget:this.$el})],a=e[0],i=e[1];this.$el.prop("checked",a),this.isNoCheckAll?!a&&this.$target.prop("checked",a):this.$target.prop("checked",a),this.$el.trigger(i)}},{key:"reverse",value:function(){var t=s.Event("reversed.bp.checkAll",{relatedTarget:this.$el});this.$target.map(function(){return s(this).prop("checked",function(){return!s(this).prop("checked")}).trigger("change.status")}),this.$el.trigger(t)}}]),t}(),l=function(t){for(var e=this,a=arguments.length,i=Array(a>1?a-1:0),n=1;n<a;n++)i[n-1]=arguments[n];return s(this).each(function(){var a,n=[s(e),s(e).data("bp.checkAll")],r=n[0],l=n[1];l||(r.data("bp.checkAll",l=new o(e)),"toggle"===t&&l.toggle()),"string"==typeof t&&"toggle"!==t&&(a=l)[t].apply(a,i)})};s.fn.checkAll=l,s.fn.checkAll.Constructor=o,s(function(){s(document).on("click.checkAll",":checkbox",function(t){s(r).map(function(){s(this).data("isCheckAllInited")||(t.target==this?s(this).checkAll("toggle"):s(this).checkAll(),s(this).data("isCheckAllInited",!0))})})}),t.exports=o},17:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){for(var e=arguments.length,a=Array(e>1?e-1:0),i=1;i<e;i++)a[i-1]=arguments[i];return(0,l["default"])(this).each(function(){var e=(0,l["default"])(this);if(!e.hasClass("no-js")){var i=e.data("bp.pagination");i||e.data("bp.pagination",i=new h(e,l["default"].extend({},e.data(),t))),"string"==typeof t&&i[t].apply(i,a)}})}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),o=a(2),l=i(o),u='.paginations,[data-toggle="pagination"]',d='<p class="p-add-ons fn-mr-15">{$items}&nbsp;条记录，共&nbsp;{$totalPages}&nbsp;页</p>',h=function(){function t(e,a){n(this,t),this.el=(0,l["default"])(e),this.__init(a)}return r(t,[{key:"__init",value:function(t,e){this.__setProps(t);var a=this.props,i=a.itemsOnPage,n=a.items,s=a.currentPage,r=a.totalPages,o=a.visiblePages;this.totalPages=r&&!n?r:Math.ceil(n/i)?Math.ceil(n/i):1,this.items=n?n:this.totalPages*i,this.currentPage=s-1,this.halfVisible=o/2,this.__render(),!e&&this.__initEvent(),this.go(s)}},{key:"__setProps",value:function(e){this.props=l["default"].extend({},t.DEFAULTS,e)}},{key:"__initEvent",value:function(){var t=this;this.el.on("click.bp.pagination","a[data-page]",function(e){e.preventDefault(),t.selectPage((0,l["default"])(e.target).data("page"))})}},{key:"__getInterval",value:function(){return{start:Math.ceil(this.currentPage>this.halfVisible?Math.max(Math.min(this.currentPage-this.halfVisible,this.totalPages-this.props.visiblePages),0):0),end:Math.ceil(this.currentPage>this.halfVisible?Math.min(this.currentPage+this.halfVisible,this.totalPages):Math.min(this.props.visiblePages,this.totalPages))}}},{key:"__append",value:function(t,e,a){var i=void 0,n=void 0,s=void 0;t=t<0?0:t<this.totalPages?t:this.totalPages-1,n=l["default"].extend({text:t+1},e),s=a?"":'class="active"',i=t===this.currentPage?"<li "+s+"><span>"+n.text+"</span></li>":l["default"].inArray(t+1,this.props.disabledPages)>-1?'<li class="disabled"><span>'+n.text+"</span></li>":'<li><a href="#page-'+(t+1)+'" data-page="'+(t+1)+'">'+n.text+"</a></li>",this.el.append(i)}},{key:"__render",value:function(){var t=this.props,e=this.__getInterval(),a=0;if(this.el.empty(),t.first&&this.__append(0,{text:t.first},!0),t.prev&&this.currentPage-1>=0&&this.__append(this.currentPage-1,{text:t.prev},!0),e.start>=0&&t.edges>0){for(var i=Math.min(t.edges,e.start),n=0;n<i;n++)this.__append(n);t.edges<e.start&&e.start-t.edges!=1?this.el.append("<li><span>...</span><li>"):e.start-t.edges===1&&this.__append(t.edges)}for(a=e.start;a<e.end;a++)this.__append(a);if(e.end<this.totalPages&&t.edges>0){this.totalPages-t.edges>e.end&&this.totalPages-t.edges-e.end!==1?this.el.append("<li><span>...</span></li>"):this.totalPages-t.edges-e.end===1&&this.__append(e.end++);var s=Math.max(this.totalPages-t.edges,e.end);for(a=s;a<this.totalPages;a++)this.__append(a)}t.next&&this.currentPage<this.totalPages-1&&this.__append(this.currentPage+1,{text:t.next},!0),t.last&&this.__append(this.totalPages,{text:t.last},!0),this.__renderPageStr()}},{key:"selectPage",value:function(t,e){this.currentPage=t-1,this.render(e),this.props.onSelectPage(t,this),this.el.trigger("select.bp.pagination",[t,this])}},{key:"render",value:function(t){this.totalPages=t?t:this.totalPages,this.__render()}},{key:"go",value:function(t){this.selectPage(t)}},{key:"__renderPageStr",value:function(){var t=this;if(this.props.pageStr&&this.props.pageStr.show){var e=this.el.prevAll(),a=this.props.pageStr.template||d;a=a.replace(/{\$(\w*)}/gi,function(e,a,i){return t[a]?t[a]:0}),e.length&&e.empty().remove(),this.el.before((0,l["default"])(a))}}},{key:"destory",value:function(t){return this.el.empty(),this.el.removeData("bp.pagination"),this}},{key:"reset",value:function(t){t=l["default"].extend({},this.props,t),this.destory().__init(t,!0),this.el.data("bp.pagination")||this.el.data("bp.pagination",this)}}]),t}();e["default"]=h;var p={items:0,itemsOnPage:5,totalPages:0,visiblePages:5,edges:1,currentPage:1,pageStr:{show:!1,template:""},disabledPages:[],prev:"&lsaquo;",next:"&rsaquo;",first:"&laquo;",last:"&raquo;",onSelectPage:l["default"].noop};h.DEFAULTS=p,l["default"].fn.pagination=s,l["default"].fn.pagination.Constructor=h,(0,l["default"])(function(){(0,l["default"])(u).pagination()})},29:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){return(0,l["default"])(this).each(function(){var a=(0,l["default"])(this);if(!a.hasClass("no-js")){var i=a.data("bp.dataTable");i||a.data("bp.dataTable",i=new d(a,l["default"].extend({},a.data(),t))),"string"==typeof t&&i[t].apply(i,e)}})}var r=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),o=a(2),l=i(o),u=a(17);i(u);a(10);var d=function(){function t(e,a){n(this,t),this.model={titles:[],url:null,requestData:{},method:"get",dataType:"json",toolbars:[]},this.dom={$tbody:null,$el:e,$pageNumber:null},this.pagination=null,this.option=a,this._init()}return r(t,[{key:"_getToolbarData",value:function(){for(var t={},e=0;e<this.model.toolbars.length;e++){var a=this.model.toolbars[e];t[(0,l["default"])(a).attr("name")]=(0,l["default"])(a).val()}return t}},{key:"_getData",value:function(){l["default"].ajax({type:this.model.method,url:this.model.url,data:this.model.requestData,dataType:this.model.dataType,success:function(t){this._clear(),this._render(t),this._setPagination(t)}.bind(this),error:function(){}})}},{key:"_setPagination",value:function(t){var e=t.total;this.getPager.props.pageStr.show=!0,this.getPager.items=e,this.getPager.totalPages=e/(0,l["default"])(this.dom.$pageNumber).val(),this.getPager.render()}},{key:"_clear",value:function(){this.dom.$tbody&&(0,l["default"])(this.dom.$tbody).remove()}},{key:"_render",value:function(t){for(var e=(0,l["default"])("<tbody></tbody>"),a=t.rows,i=0;i<a.length;i++){var n=a[i],s=(0,l["default"])("<tr></tr>");e.append(s);for(var r=0;r<this.model.titles.length;r++){var o=this.model.titles[r],u=(0,l["default"])("<td></td>");u.html(this._getContByTitle(o,n)),s.append(u)}}this.dom.$tbody=e,this.dom.$el.append(e)}},{key:"_init",value:function(){this._setTitle(this.dom.$el),this._build(),this.option.hasOwnProperty("url")&&(this.url=this.option.url),this.option.hasOwnProperty("toolBar")&&(this.model.toolbars=this.option.toolBar)}},{key:"_build",value:function(){var t=(0,l["default"])('<nav class="pagination-box text-align-right fn-mt-30"></nav>'),e=(0,l["default"])('<ul class="paginations" id="j-page-deom1"></ul>'),a=(0,l["default"])('<div class="p-add-ons fn-ml-15"><div class="form-group form-gs form-no-label"><div class="form-gs-box"><div class="form-control-wrap"><input type="text" class="form-control" placeholder="跳转" id="j-page-input-ff"></div><div class="form-addon child-right">页</div><div class="form-addon-com"> <button type="button" class="btn default" id="j-page-btnff">GO</button></div></div></div>'),i="j-page-itempage-"+(new Date).getTime(),n=(0,l["default"])('<div class="p-add-ons fn-ml-15"><div class="form-group form-gs form-no-label"><div class="form-gs-box"><div class="form-addon">每页</div><div class="form-control-wrap"><select class="form-control" id="'+i+'"><option>10</option><option>20</option><option>60</option><option>100</option></select> </div><div class="form-addon">条</div></div></div></div>');t.append(e),t.append(a),t.append(n),this.dom.$el.after(t),this.dom.$pageNumber=n.find("select"),this.pagination=e;var s=this;(0,l["default"])(e).on("select.bp.pagination",function(t,e){s.model.requestData={page:e,number:(0,l["default"])(s.dom.$pageNumber).val()},s.model.toolbars.length>0&&(s.model.requestData=l["default"].extend({},s.model.requestData,s._getToolbarData())),s._getData()})}},{key:"_setTitle",value:function(t){for(var e=t.find("th"),a=0;a<e.length;a++){var i=e[a],n=(0,l["default"])(i).data("options");this.model.titles.push(n)}}},{key:"_getContByTitle",value:function(t,e){for(var a in e)if(a==t)return e[a];return""}},{key:"method",set:function(t){this.model.method=t}},{key:"url",set:function(t){this.model.url=t}},{key:"titles",get:function(){return this.model.titles}},{key:"data",set:function(t){}},{key:"getPager",get:function(){return(0,l["default"])(this.pagination).data("bp.pagination")}}]),t}();l["default"].fn.dataTable=s,l["default"].fn.dataTable.Constructor=d}})});