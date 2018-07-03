(function () {
	var Sprite = Laya.Sprite;
	var Stage = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL = Laya.WebGL;
	var Stat = Laya.Stat;

	(function () {
		//初始化微信小游戏
		Laya.MiniAdpter.init();
		//程序入口
		// 不支持WebGL时自动切换至Canvas
		Laya.init(750, 1334);

		// Stat.show(0, 0);

		//Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#fff";

		Laya.loader.load([
			{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
			{ url: "res/atlas/template/ButtonTab.atlas", type: Laya.Loader.ATLAS },
			{ url: "res/atlas/template/List.atlas", type: Laya.Loader.ATLAS },
			{ url: "res/atlas/template/ScrollBar.atlas", type: Laya.Loader.ATLAS },
			{ url: "res/atlas/template/Tab.atlas", type: Laya.Loader.ATLAS },
			{ url: "comp/model1.jpg", type: Laya.Loader.IMAGE },
			{ url: "comp/model1_msk.png", type: Laya.Loader.IMAGE },
			{ url: "comp/model2.jpg", type: Laya.Loader.IMAGE },
			{ url: "comp/model2_msk.png", type: Laya.Loader.IMAGE },
			{ url: "comp/model3.jpg", type: Laya.Loader.IMAGE },
			{ url: "comp/model3_msk.png", type: Laya.Loader.IMAGE },
			{ url: "comp/model4.jpg", type: Laya.Loader.IMAGE },
			{ url: "comp/model4_msk.png", type: Laya.Loader.IMAGE },
			{ url: "comp/main_bg.png", type: Laya.Loader.IMAGE }
		], Handler.create(this, showMain));

	})();

	function showMain() {
		var mainUI = new Main();
		mainUI.name = "mainUI";
		// var dialogUI=new DialogList();
		// dialogUI.name="dialogUI";
		Laya.stage.addChildren(mainUI);
	}

})();
