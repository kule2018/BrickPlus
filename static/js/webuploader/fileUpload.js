/*! 
*  frontui v1.0.2
*  by frontpay FE Team
*  (c) 2016-07-01 www.frontpay.cn
*  Licensed under Apache License
*/
!function(root,factory){"function"==typeof define&&define.amd?define(["jquery","webuploader/webuploader"],factory):"object"==typeof exports?module.exports=factory(require("jquery"),require("webuploader/webuploader")):factory(root.jQuery,WebUploader)}(this,function($,WebUploader){"use strict";function Plugin(options){var args=[].slice.call(arguments,1);return $(this).each(function(){var that=$(this),data=that.data("ui.fileUpload");data||(data=new Uploader(that,options),that.data("ui.fileUpload",data)),"string"==typeof options&&data[options]&&data[options](args)})}var percentages={},isSupportBase64=function(){var data=new Image,support=!0;return data.onload=data.onerror=function(){(1!=this.width||1!=this.height)&&(support=!1)},data.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",support}(),flashVersion=function(){var version;try{version=navigator.plugins["Shockwave Flash"],version=version.description}catch(ex){try{version=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(ex2){version="0.0"}}return version=version.match(/\d+/g),parseFloat(version[0]+"."+version[1],10)}(),supportTransition=function(){var s=document.createElement("p").style,r="transition"in s||"WebkitTransition"in s||"MozTransition"in s||"msTransition"in s||"OTransition"in s;return s=null,r}(),Uploader=function(el,options){this.$el=$(el),this.options=$.extend({},Uploader.DEFAULTS,options),this.uploader=null,this.init()};return Uploader.DEFAULTS={tpl:'<div class="img-editor">   <div class="queueList"></div>   <div class="statusBar">       <div class="info"></div>       <div class="btns">           <div class="uploadBtn">开始上传</div>       </div>   </div></div>',auto:!1,multiple:!1,water:!1,thumbnail:!1,sendurl:null,fileVal:"File",toolbar:!0,filetypes:"jpg,jpeg,bmp,png,gif,pdf,doc,docx,xls,xlsx",filesize:"204800",btntext:"点击上传",swf:null,thumbnailWidth:400,thumbnailHeight:400,success:$.noop,debug:function(msg){alert(msg)}},Uploader.prototype={constructor:Uploader,init:function(){var opts=this.options;if(!WebUploader.Uploader.support("flash")&&WebUploader.browser.ie){var swfUrl=this.options.swf;return void(flashVersion?!function(container){window.expressinstallcallback=function(state){switch(state){case"Download.Cancelled":opts.debug("您取消了更新！");break;case"Download.Failed":opts.debug("安装失败");break;default:opts.debug("安装已成功，请刷新！")}delete window.expressinstallcallback};var path=swfUrl.split("/"),rootPath=path.slice(0,path.length-1).join("/"),swf=rootPath+"/expressInstall.swf",html='<object type="application/x-shockwave-flash" data="'+swf+'" ';WebUploader.browser.ie&&(html+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),html+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+swf+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',container.html(html)}(this.$el.parent()):this.$el.parent().html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="获取最新的flash插件" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>'))}return WebUploader.Uploader.support()?(this.$editor=$(this.options.tpl),this.$el.after(this.$editor),this.$uploadBtn=this.$editor.find(".uploadBtn"),this.$queueContainer=this.$editor.find(".queueList"),this.$info=this.$editor.find(".info"),this.$container=null,this.$queue=$('<ul class="filelist"></ul>').appendTo(this.$queueContainer),this.rotation=0,this.uploading=!1,this.$toolbar=null,void this.__initUploader()):void opts.debug("很抱歉您的浏览器不支持上传控件！")},__initUploader:function(){var opt=this.options,sendUrl=this.options.sendurl;sendUrl+="?action=UploadFile",opt.water&&(sendUrl+="&IsWater=1"),opt.thumbnail&&(sendUrl+="&IsThumbnail=1"),opt.multiple&&(sendUrl+="&DelFilePath="+this.$el.siblings(".upload-path").val()),this.uploader=WebUploader.create({auto:opt.auto,swf:opt.swf,server:sendUrl,pick:{id:this.$el[0],multiple:opt.multiple},accept:{extensions:opt.filetypes},formData:{DelFilePath:""},fileVal:opt.fileVal,fileSingleSizeLimit:1024*opt.filesize,compress:{quality:75}}),this.__listenUploader()},__listenUploader:function(){var self=this,p=this.options,parentObj=this.$el,opts=this.options,uploader=this.uploader;uploader.on("error",function(type){switch(type){case"Q_EXCEED_NUM_LIMIT":opts.debug("错误：上传文件数量过多！");break;case"Q_EXCEED_SIZE_LIMIT":opts.debug("错误：文件总大小超出限制！");break;case"F_EXCEED_SIZE":opts.debug("错误：文件大小超出限制！");break;case"Q_TYPE_DENIED":opts.debug("错误：禁止上传该类型文件！");break;case"F_DUPLICATE":opts.debug("错误：请勿重复上传该文件！");break;default:opts.debug("错误代码："+type)}}),uploader.on("fileQueued",function(file){p.multiple||(uploader.options.formData.DelFilePath=parentObj.siblings(".upload-path").val()),self.__addFile(file)}),uploader.on("uploadBeforeSend",function(file,data){data.rotation=self.rotation}),uploader.on("uploadProgress",function(file,percentage){var $percent=self.$progress.find("span");$percent.css("width",100*percentage+"%"),self.$info.find(".wu-percent-text").html(",已上传"+100*percentage+"%")}),uploader.on("uploadError",function(file,reason){uploader.removeFile(file),opts.debug(file.name+"上传失败，错误代码："+reason),self.$container.off().remove(),self.$editor.hide()}),uploader.on("uploadSuccess",function(file,data){function success(){p.success(parentObj,file,data),self.$editor.hide(),self.$container.off().remove(),self.$info.html("")}self.$container.append('<span class="success"></span>'),uploader.removeFile(file),setTimeout(success,500)}),uploader.on("uploadComplete",function(file){self.$uploadBtn.removeClass("disabled"),self.$progress.hide(),self.$toolbar.show(),self.uploading=!1})},__addFile:function(file){var self=this,$queue=this.$queue,opt=this.options,text="",uploader=this.uploader;this.$editor.show();var $li=$('<li id="'+file.id+'"><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),$btns=$('<div class="file-panel"><span class="cancel">删除</span><span class="rotateRight">向右旋转</span><span class="rotateLeft">向左旋转</span></div>').appendTo($li),$wrap=$li.find("p.imgWrap"),$info=$('<p class="error"></p>'),$img=null,showError=function(code){switch(code){case"exceed_size":text="文件大小超出";break;case"interrupt":text="上传暂停";break;default:text="上传失败，请重试"}$info.text(text).appendTo($li)},removeFile=function(){$li.off().remove(),self.$editor.hide()};this.$progress=$li.find("p.progress"),"invalid"===file.getStatus()?showError(file.statusText):($wrap.text("预览中"),/jpg|jpeg|png|webp|gif|bmp/g.test(file.ext)?uploader.makeThumb(file,function(error,src){return error?void $wrap.text("不能预览"):void(isSupportBase64&&($img=$('<img src="'+src+'">'),$wrap.empty().append($img)))},opt.thumbnailWidth,opt.thumbnailHeight):($img='<div class="file-placeholder"></div>',$wrap.empty().append($img)),percentages[file.id]=[file.size,0],file.rotation=0),$btns.on("click","span",function(){var deg,index=$(this).index();switch(index){case 0:return uploader.removeFile(file),void removeFile();case 1:file.rotation+=90;break;case 2:file.rotation-=90}supportTransition?(deg="rotate("+file.rotation+"deg)",$img.css({"-webkit-transform":deg,"-mos-transform":deg,"-o-transform":deg,transform:deg})):$img.css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+~~(file.rotation/90%4+4)%4+")"),self.rotation=file.rotation}),!opt.toolbar&&$btns.hide(),$li.appendTo($queue),this.$container=$li,this.$toolbar=$btns,this.$info.html(WebUploader.formatSize(percentages[file.id][0])+'<span class="wu-percent-text"></span>'),this.$uploadBtn.on("click",function(){self.uploading||(self.uploading=!0,self.$progress.show(),$btns.hide(),uploader.upload(),$(this).addClass("disabled"))})}},$.fn.fileUpload=Plugin,Uploader});