var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var fsListDialogUI=(function(_super){
		function fsListDialogUI(){
			
		    this.list=null;

			fsListDialogUI.__super.call(this);
		}

		CLASS$(fsListDialogUI,'ui.fsListDialogUI',_super);
		var __proto__=fsListDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(fsListDialogUI.uiView);

		}

		fsListDialogUI.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":580,"height":650},"child":[{"type":"Image","props":{"y":0,"x":0,"width":580,"skin":"comp/bg.png","sizeGrid":"22,2,2,2","height":650}},{"type":"Button","props":{"y":5,"x":513,"width":60,"skin":"comp/btn_close.png","name":"close","height":50}},{"type":"List","props":{"y":68,"x":10,"width":558,"var":"list","vScrollBarSkin":"template/List/vscroll.png","spaceY":10,"spaceX":12,"selectEnable":true,"repeatY":10,"repeatX":4,"height":548},"child":[{"type":"Box","props":{"y":9,"x":9,"name":"render"},"child":[{"type":"Image","props":{"width":120,"skin":"comp/fs1.jpg","name":"img","height":93}}]}]}]};
		return fsListDialogUI;
	})(Dialog);
var mainViewUI=(function(_super){
		function mainViewUI(){
			
		    this.modelPig=null;
		    this.texture=null;
		    this.bgImage=null;
		    this.modelBtn=null;
		    this.fsBtn=null;
		    this.mlBtn=null;

			mainViewUI.__super.call(this);
		}

		CLASS$(mainViewUI,'ui.mainViewUI',_super);
		var __proto__=mainViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(mainViewUI.uiView);

		}

		mainViewUI.uiView={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Sprite","props":{"y":204,"x":0,"width":754,"var":"modelPig","height":770}},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"var":"texture","height":1334}},{"type":"Image","props":{"y":0,"x":0,"var":"bgImage","skin":"comp/main_bg.png"}},{"type":"HSlider","props":{"y":1003,"x":66,"width":616,"value":50,"skin":"template/ScrollBar/BackProgressBar.png","sizeGrid":"7,3,8,2","height":60}},{"type":"Tab","props":{"y":121,"x":497,"width":229,"selectedIndex":0,"height":64},"child":[{"type":"Button","props":{"y":4,"x":1,"width":99,"skin":"template/ButtonTab/btn_LargeTabButton_Left.png","name":"item0","labelSize":26,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"面料","height":49}},{"type":"Button","props":{"y":4,"x":99,"width":99,"skin":"template/ButtonTab/btn_LargeTabButton_Right.png","name":"item1","labelSize":26,"labelColors":"#007AFF,#007AFF,#FFFFFF","label":"裁片","height":49}}]},{"type":"Tab","props":{"y":1084,"width":600,"stateNum":0,"space":40,"selectedIndex":1,"left":65,"labelStrokeColor":"#cd1b18","height":120,"direction":"horizontal"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":120,"stateNum":1,"skin":"comp/icon1.png","name":"item0","labelPadding":"30","labelColors":"#929292,#0079ff","height":120}},{"type":"Button","props":{"y":0,"width":120,"var":"modelBtn","stateNum":1,"skin":"comp/icon2.png","name":"item1","left":150,"labelPadding":"30","labelColors":"#929292,#0079ff","height":120}},{"type":"Button","props":{"y":0,"x":300,"width":120,"stateNum":1,"skin":"comp/icon3.png","name":"item2","labelPadding":"30","labelColors":"#929292,#0079ff","height":120}},{"type":"Button","props":{"y":-4,"x":546,"width":120,"stateNum":1,"skin":"comp/icon4.png","name":"item3","labelPadding":"30","labelColors":"#929292,#0079ff","height":120}}]},{"type":"Button","props":{"y":1251,"x":55,"width":150,"var":"fsBtn","skin":"comp/button.png","labelSize":24,"label":"选花型","height":50}},{"type":"Button","props":{"y":1251,"x":573,"width":150,"var":"mlBtn","skin":"comp/button.png","labelSize":24,"label":"选面料","height":50}}]};
		return mainViewUI;
	})(View);
var modelListDialogUI=(function(_super){
		function modelListDialogUI(){
			
		    this.list=null;

			modelListDialogUI.__super.call(this);
		}

		CLASS$(modelListDialogUI,'ui.modelListDialogUI',_super);
		var __proto__=modelListDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(modelListDialogUI.uiView);

		}

		modelListDialogUI.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":580,"height":650},"child":[{"type":"Image","props":{"y":0,"x":0,"width":580,"skin":"comp/bg.png","sizeGrid":"22,2,2,2","height":650}},{"type":"Button","props":{"y":5,"x":513,"width":60,"skin":"comp/btn_close.png","name":"close","height":50}},{"type":"List","props":{"y":68,"x":10,"width":558,"var":"list","vScrollBarSkin":"template/List/vscroll.png","spaceY":10,"spaceX":12,"selectEnable":true,"repeatY":10,"repeatX":2,"height":548},"child":[{"type":"Box","props":{"y":9,"x":9,"name":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":256,"skin":"comp/model1.jpg","name":"img","height":297}}]}]}]};
		return modelListDialogUI;
	})(Dialog);