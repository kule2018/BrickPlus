/*! 
*  BrickPlus v1.1.4
*  by fronui team
*  updated on 2016-11-22
*  created by generator-frontman
*  (c) 2014-2016 www.frontpay.cn
*  Licensed under MIT
*/
 !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.dataTable=t(require("jquery")):e.dataTable=t(e.jQuery)}(this,function(__WEBPACK_EXTERNAL_MODULE_2__){return function(e){function t(i){if(a[i])return a[i].exports;var n=a[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}({0:function(e,t,a){e.exports=a(29)},2:function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE_2__},10:function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),r=a(2),s='[data-toggle="checkAll"]',o=function(){function e(t){i(this,e),this.$el=r(t),this.$target=r(this.$el.data("target")),this.isReverse=Boolean(this.$el.data("reverse")),this.isNoCheckAll=Boolean(this.$el.data("nocheckall")),this.VERSION="1.1.4",this.initEvents()}return n(e,[{key:"initEvents",value:function(){this.$el.on("click",r.proxy(this.toggle,this)),!this.isReverse&&this.$target.on("change.status",r.proxy(this.targetToggle,this))}},{key:"toggle",value:function(){this.isReverse?this.reverse():this.activate()}},{key:"targetToggle",value:function(){if(this.isReverse)return!1;var e=!0;this.isNoCheckAll?(e=!1,this.$target.map(function(){return r(this).prop("checked")?(e=!0,!1):void 0})):this.$target.map(function(){return r(this).prop("checked")?void 0:(e=!1,!1)}),this.$el.prop("checked",e).trigger("change.status")}},{key:"activate",value:function(e){var t=e||e===!1?e:this.$el.is(":checked"),a=r.Event("checked.bp.checkAll",{relatedTarget:this.$el});this.$el.prop("checked",t),this.isNoCheckAll?!t&&this.$target.prop("checked",t):this.$target.prop("checked",t),this.$el.trigger(a)}},{key:"reverse",value:function(){var e=r.Event("reversed.bp.checkAll",{relatedTarget:this.$el});this.$target.map(function(){return r(this).prop("checked",function(){return!r(this).prop("checked")}).trigger("change.status")}),this.$el.trigger(e)}}]),e}(),l=function(e){for(var t=this,a=arguments.length,i=Array(a>1?a-1:0),n=1;a>n;n++)i[n-1]=arguments[n];return r(this).each(function(){var a,n=r(t),s=r(t).data("bp.checkAll");s||(n.data("bp.checkAll",s=new o(t)),"toggle"===e&&s.toggle()),"string"==typeof e&&"toggle"!==e&&(a=s)[e].apply(a,i)})};r.fn.checkAll=l,r.fn.checkAll.Constructor=o,r(function(){r(document).on("click.checkAll",":checkbox",function(e){r(s).map(function(){r(this).data("isCheckAllInited")||(e.target==this?r(this).checkAll("toggle"):r(this).checkAll(),r(this).data("isCheckAllInited",!0))})})}),e.exports=o},17:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){for(var t=arguments.length,a=Array(t>1?t-1:0),i=1;t>i;i++)a[i-1]=arguments[i];return(0,l["default"])(this).each(function(){var t=(0,l["default"])(this);if(!t.hasClass("no-js")){var i=t.data("bp.pagination");i||t.data("bp.pagination",i=new h(t,l["default"].extend({},t.data(),e))),"string"==typeof e&&i[e].apply(i,a)}})}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),o=a(2),l=i(o),u='.paginations,[data-toggle="pagination"]',d='<p class="p-add-ons fn-mr-15">{$items}&nbsp;条记录，共&nbsp;{$totalPages}&nbsp;页</p>',h=function(){function e(t,a){n(this,e),this.el=(0,l["default"])(t),this.__init(a)}return s(e,[{key:"__init",value:function(e,t){this.__setProps(e);var a=this.props,i=a.itemsOnPage,n=a.items,r=a.currentPage,s=a.totalPages,o=a.visiblePages;this.totalPages=s&&!n?s:Math.ceil(n/i)?Math.ceil(n/i):1,this.items=n?n:this.totalPages*i,this.currentPage=r-1,this.halfVisible=o/2,this.__render(),!t&&this.__initEvent(),this.go(r)}},{key:"__setProps",value:function(t){this.props=l["default"].extend({},e.DEFAULTS,t)}},{key:"__initEvent",value:function(){var e=this;this.el.on("click.bp.pagination","a[data-page]",function(t){t.preventDefault(),e.selectPage((0,l["default"])(t.target).data("page"))})}},{key:"__getInterval",value:function(){return{start:Math.ceil(this.currentPage>this.halfVisible?Math.max(Math.min(this.currentPage-this.halfVisible,this.totalPages-this.props.visiblePages),0):0),end:Math.ceil(this.currentPage>this.halfVisible?Math.min(this.currentPage+this.halfVisible,this.totalPages):Math.min(this.props.visiblePages,this.totalPages))}}},{key:"__append",value:function(e,t,a){var i=void 0,n=void 0,r=void 0;e=0>e?0:e<this.totalPages?e:this.totalPages-1,n=l["default"].extend({text:e+1},t),r=a?"":'class="active"',i=e===this.currentPage?"<li "+r+"><span>"+n.text+"</span></li>":l["default"].inArray(e+1,this.props.disabledPages)>-1?'<li class="disabled"><span>'+n.text+"</span></li>":'<li><a href="#page-'+(e+1)+'" data-page="'+(e+1)+'">'+n.text+"</a></li>",this.el.append(i)}},{key:"__render",value:function(){var e=this.props,t=this.__getInterval(),a=0;if(this.el.empty(),e.first&&this.__append(0,{text:e.first},!0),e.prev&&this.currentPage-1>=0&&this.__append(this.currentPage-1,{text:e.prev},!0),t.start>=0&&e.edges>0){for(var i=Math.min(e.edges,t.start),n=0;i>n;n++)this.__append(n);e.edges<t.start&&t.start-e.edges!=1?this.el.append("<li><span>...</span><li>"):t.start-e.edges===1&&this.__append(e.edges)}for(a=t.start;a<t.end;a++)this.__append(a);if(t.end<this.totalPages&&e.edges>0){this.totalPages-e.edges>t.end&&this.totalPages-e.edges-t.end!==1?this.el.append("<li><span>...</span></li>"):this.totalPages-e.edges-t.end===1&&this.__append(t.end++);var r=Math.max(this.totalPages-e.edges,t.end);for(a=r;a<this.totalPages;a++)this.__append(a)}e.next&&this.currentPage<this.totalPages-1&&this.__append(this.currentPage+1,{text:e.next},!0),e.last&&this.__append(this.totalPages,{text:e.last},!0),this.__renderPageStr()}},{key:"selectPage",value:function(e,t){this.currentPage=e-1,this.render(t),this.props.onSelectPage(e,this),this.el.trigger("select.bp.pagination",[e,this])}},{key:"render",value:function(e){this.totalPages=e?e:this.totalPages,this.__render()}},{key:"go",value:function(e){this.selectPage(e)}},{key:"__renderPageStr",value:function(){var e=this;if(this.props.pageStr&&this.props.pageStr.show){var t=this.el.prevAll(),a=this.props.pageStr.template||d;a=a.replace(/{\$(\w*)}/gi,function(t,a,i){return e[a]?e[a]:0}),t.length&&t.empty().remove(),this.el.before((0,l["default"])(a))}}},{key:"destory",value:function(e){return this.el.empty(),this.el.removeData("bp.pagination"),this}},{key:"reset",value:function(e){e=l["default"].extend({},this.props,e),this.destory().__init(e,!0),this.el.data("bp.pagination")||this.el.data("bp.pagination",this)}}]),e}();t["default"]=h;var p={items:0,itemsOnPage:5,totalPages:0,visiblePages:5,edges:1,currentPage:1,pageStr:{show:!1,template:""},disabledPages:[],prev:"&lsaquo;",next:"&rsaquo;",first:"&laquo;",last:"&raquo;",onSelectPage:l["default"].noop};h.DEFAULTS=p,l["default"].fn.pagination=r,l["default"].fn.pagination.Constructor=h,(0,l["default"])(function(){(0,l["default"])(u).pagination()})},29:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Plugin(e,t){if("undefined"==typeof e){var a=(0,_jquery2["default"])(this).data("bp.dataTable");return a||(0,_jquery2["default"])(this).data("bp.dataTable",a=new DataTable((0,_jquery2["default"])(this),_jquery2["default"].extend({},(0,_jquery2["default"])(this).data(),e))),a}if("string"==typeof e&&"undefined"==typeof t){var a=(0,_jquery2["default"])(this).data("bp.dataTable");if(a||(0,_jquery2["default"])(this).data("bp.dataTable",a=new DataTable((0,_jquery2["default"])(this),_jquery2["default"].extend({},(0,_jquery2["default"])(this).data(),e))),"string"==typeof e)return a[e].call(a,t)}return(0,_jquery2["default"])(this).each(function(){var a=(0,_jquery2["default"])(this);if(!a.hasClass("no-js")){var i=a.data("bp.dataTable");i||a.data("bp.dataTable",i=new DataTable(a,_jquery2["default"].extend({},a.data(),e))),"string"==typeof e&&i[e].call(i,t)}})}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),_jquery=__webpack_require__(2),_jquery2=_interopRequireDefault(_jquery),_pagination=__webpack_require__(17),_pagination2=_interopRequireDefault(_pagination);__webpack_require__(10);var DataTable=function(){function DataTable(e,t){_classCallCheck(this,DataTable),this.model={rows:[],columns:[],fields:[],formatters:[],styles:[],url:null,requestData:{page:1,number:10},method:"get",dataType:"json",toolbars:[],queryParams:null},this.dom={$tbody:null,$el:e,$loading:null,$pageNumber:null,pageJumpButtonId:null,pageJSelectId:null,pageInputId:null},this.pagination=null,this.option=t,this._init()}return _createClass(DataTable,[{key:"_init",value:function(){this.option.hasOwnProperty("url")&&(this.url=this.option.url),this.option.hasOwnProperty("toolbar")&&(this.model.toolbars=this.option.toolbar),this.option.hasOwnProperty("queryParams")&&(this.model.queryParams=this.option.queryParams),this.option.hasOwnProperty("columns")&&(this.model.columns=this.option.columns),this._setTitleByDom(this.dom.$el),this.model.columns.length>0&&(this._buildTableHead(),this._setTitleByColumns(this.model.columns)),this._buildLoading(),this._build()}},{key:"_getToolbarData",value:function(){for(var e={},t=0;t<this.model.toolbars.length;t++){var a=this.model.toolbars[t];e[(0,_jquery2["default"])(a).attr("name")]=(0,_jquery2["default"])(a).val()}return e}},{key:"_getData",value:function(){this.dom.$el.find(".btn-spinner").css({display:"block"}),this.model.queryParams&&_jquery2["default"].extend(this.model.requestData,this.model.queryParams()),_jquery2["default"].extend(this.model.requestData,{t:(new Date).getTime().toString()}),_jquery2["default"].ajax({type:this.model.method,url:this.model.url,data:this.model.requestData,dataType:this.model.dataType,success:function(e){this.model.rows=e.rows,this._clear(),this._render(e),this._setPagination(e),this.dom.$el.find(".btn-spinner").css({display:"none"})}.bind(this),error:function(){}})}},{key:"_setPagination",value:function(e){var t=e.total;this.getPager.props.pageStr.show=!0,this.getPager.items=t,this.getPager.totalPages=Math.ceil(t/(0,_jquery2["default"])(this.dom.$pageNumber).val()),this.getPager.render()}},{key:"_clear",value:function(){this.dom.$tbody&&(0,_jquery2["default"])(this.dom.$tbody).remove()}},{key:"_render",value:function _render(json){for(var $tbody=(0,_jquery2["default"])("<tbody></tbody>"),rows=json.rows,i=0;i<rows.length;i++){var row=rows[i],$tr=(0,_jquery2["default"])("<tr></tr>");$tbody.append($tr);for(var j=0;j<this.model.fields.length;j++){var title=this.model.fields[j],formatter=this.model.formatters[j],style=this.model.styles[j],$td=(0,_jquery2["default"])("<td></td>"),obj=eval("("+style+")");style&&$td.css(obj),$td.html(this._getContByTitle(title,row,formatter,i)),$tr.append($td)}}this.dom.$tbody=$tbody,this.dom.$el.append($tbody)}},{key:"_buildLoading",value:function(){this.dom.$loading=(0,_jquery2["default"])('<div class="btn btn-spinner" disabled="">Loading...</div>'),this.dom.$el.append(this.dom.$loading)}},{key:"_buildTableHead",value:function(){this.dom.$el.empty();var e=(0,_jquery2["default"])("<colgroup></colgroup>"),t=(0,_jquery2["default"])("<thead></thead>"),a=(0,_jquery2["default"])("<tr></tr>");t.append(a);for(var i=0;i<this.model.columns.length;i++){var n=this.model.columns[i],r=(0,_jquery2["default"])("<col></col>");n.hasOwnProperty("width")&&r.width(n.width),e.append(r);var s=(0,_jquery2["default"])("<th></th>");n.hasOwnProperty("title")&&s.html(n.title),a.append(s)}this.dom.$el.append(e),this.dom.$el.append(t)}},{key:"_build",value:function(){var e="j_paginations_"+(new Date).getTime().toString();this.model.paginationId=e;var t=(0,_jquery2["default"])('<nav class="pagination-box text-align-right fn-mt-30"></nav>'),a=(0,_jquery2["default"])('<ul class="paginations" id="'+e+'"></ul>'),i="j-page-itempage-"+(new Date).getTime(),n="j-page-input-"+(new Date).getTime();this.dom.pageJumpButtonId=i,this.dom.pageInputId=n;var r=(0,_jquery2["default"])('<div class="p-add-ons fn-ml-15 "><div class="form-group form-gs form-no-label"><div class="form-gs-box"><div class="form-control-wrap"><input type="text" class="form-control" placeholder="跳转" id="'+n+'"></div><div class="form-addon child-right">页</div><div class="form-addon-com"> <button type="button" class="btn default" id="'+i+'">GO</button></div></div></div>'),s="s-page-itempage-"+(new Date).getTime();this.dom.pageJSelectId=s;var o=(0,_jquery2["default"])('<div class="p-add-ons fn-ml-15"><div class="form-group form-gs form-no-label"><div class="form-gs-box"><div class="form-addon">每页</div><div class="form-control-wrap"><select class="form-control" id="'+s+'"><option>10</option><option>20</option><option>60</option><option>100</option></select> </div><div class="form-addon">条</div></div></div></div>');t.append(a),t.append(r),t.append(o),this.dom.$el.after(t),this.dom.$pageNumber=o.find("select"),this.pagination=a,this._addPageListener()}},{key:"_addPageListener",value:function(){var e=this;(0,_jquery2["default"])(this.pagination).on("select.bp.pagination",function(t,a){e.model.requestData={page:a,number:(0,_jquery2["default"])(e.dom.$pageNumber).val()},e.model.toolbars.length>0&&_jquery2["default"].extend(e.model.requestData,e._getToolbarData()),e._getData()}),(0,_jquery2["default"])("#"+this.dom.pageJumpButtonId).on("click",function(){var t=_jquery2["default"].trim((0,_jquery2["default"])("#"+e.dom.pageInputId).val());""!==t&&t>0&&t<=e.getPager.totalPages&&(e.model.requestData={page:t,number:(0,_jquery2["default"])(e.dom.$pageNumber).val()},(0,_jquery2["default"])("#"+e.model.paginationId).pagination("go",parseInt(t)),(0,_jquery2["default"])("#"+e.dom.pageInputId).val(" "))}),(0,_jquery2["default"])("#"+this.dom.pageJSelectId).on("change",function(){e.model.requestData={page:1,number:(0,_jquery2["default"])(e.dom.$pageNumber).val()},(0,_jquery2["default"])("#"+e.model.paginationId).pagination("go",1)})}},{key:"_setTitleByDom",value:function(e){for(var t=e.find("th"),a=0;a<t.length;a++){var i=t[a];this.model.fields.push((0,_jquery2["default"])(i).data("options")),this.model.formatters.push((0,_jquery2["default"])(i).data("formatter")),this.model.styles.push((0,_jquery2["default"])(i).data("style"))}}},{key:"_setTitleByColumns",value:function(e){for(var t=0;t<e.length;t++){var a=e[t];this.model.fields.push(a.field||null),this.model.formatters.push(a.formatter||null),this.model.styles.push(a.style||null)}}},{key:"_getContByTitle",value:function(e,t,a,i){for(var n in t)if(n===e){if(a){var r=this._getFormatter(a,t[n],t,i);return r}return t[n]}if(a){var s=this._getFormatter(a,t[n],t,i);return s}return""}},{key:"_getFormatter",value:function(e,t,a,i){if("function"==typeof e){var n=e(t,a,i);return n}if("string"==typeof e){var n=window[e](t,a,i);return n}return null}},{key:"draw",value:function(){this._getData()}},{key:"setting",value:function(e){for(var t in e)this.model[t]=e[t]}},{key:"getPagination",value:function(){return{page:this.model.requestData.page,number:this.model.requestData.number}}},{key:"method",set:function(e){this.model.method=e}},{key:"url",set:function(e){this.model.url=e}},{key:"fields",get:function(){return this.model.fields}},{key:"data",set:function(e){}},{key:"getPager",get:function(){return(0,_jquery2["default"])(this.pagination).data("bp.pagination")}}]),DataTable}();_jquery2["default"].fn.dataTable=Plugin,_jquery2["default"].fn.dataTable.Constructor=DataTable}})});