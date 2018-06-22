/*
* name;
*/
var Main = (function (_super) {
    var _proto;
    function Main() {
        Main.super(this);
        this.init();
    }
    Laya.class(Main, "Main", _super);
    _proto = Main.prototype;
    _proto.init = function () {
        /*
            this.modelPig    背景模特图
            this.colourWrap  花色包围层 ui中定义
            this.fsBtn       选择花色按钮
            this.mlBtn       选择面料按钮
            this.modelBtn    选择模特图片按钮
        */
        this.colour = new Laya.Sprite();//花色块 
        this.colour_texture = new Laya.Sprite();//花色块纹理层，用于纹理的移到效果 
        this.msk = new Laya.Sprite();//遮罩层
        this.blend = new Laya.Sprite();//最终溶合效果层

        this.colour.addChildren(this.colour_texture);
        this.colourWrap.addChildren(this.colour, this.blend);

        this.colourWrap.width = 750;
        this.colourWrap.height = 1334;
        this.modelPig.pos(0, 201);
        this.msk.pos(0, 201);
        this.blend.pos(0, 201);
        
        //this.colourWrap.zOrder = 2;

        this.loadSource();
        this.addEvents();
    };
    _proto.initTexturePos=function() {
        this.mmp = { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, mp: { x: 0, y: 0 } };//记录花色位置信息
        this.colour_texture.pos(0, 0);
    }

    _proto.loadSource = function () {
        this.loadModel("comp/model1.jpg");
        this.setTexture("comp/fs1.jpg");       
    };
    _proto.loadModel = function (imgUrl) {
        this.modelPig.graphics.clear();
        this.modelPig.loadImage(imgUrl);
        this.msk.graphics.clear();
        this.blend.graphics.clear();
        this.msk.loadImage(imgUrl.replace(".jpg", "_msk.png"));
        this.colour.mask = this.msk;
        //this.colourWrap.mask = this.msk;
        this.initTexturePos();
    }

    _proto.addEvents = function () {
        this.modelPig.on("mousedown", this, this.onMouseDown);
        this.fsBtn.on("click", this, this.onFsBtnClick);
        this.mlBtn.on("click", this, this.onMlBtnClick);
        this.modelBtn.on("click", this, this.onModelBtnClick)
    };

    _proto.onMouseDown = function (e) {
        this.mmp.p1 = { x: e.stageX, y: e.stageY };
        this.mmp.mp = { x: this.colour_texture.x, y: this.colour_texture.y };
        this.blend.visible=false;
        //this.colour_texture.alpha=0.9;
        this.modelPig.on("mousemove", this, this.onMouseMove);
        this.modelPig.on("mouseup", this, this.onMouseUp);
    };
    _proto.onMouseMove = function (e) {
        this.mmp.p2 = { x: e.stageX, y: e.stageY };
        this.colour_texture.pos(this.mmp.mp.x + this.mmp.p2.x - this.mmp.p1.x, this.mmp.mp.y + this.mmp.p2.y - this.mmp.p1.y);
    };
    _proto.onMouseUp = function (e) {
        this.modelPig.off("mousemove", this, this.onMouseMove);
        this.modelPig.off("mouseup", this, this.onMouseUp);
        //this.colour_texture.alpha = 1;
        this.multiply();
    };

    _proto.onFsBtnClick = function (e) {
        wx&&wx.showModal&&wx.showModal({ content: "点击花色按钮" });
        new FsDialogList().popup();
    };
    _proto.onModelBtnClick = function (e) {
        new ModelDialogList().popup();
    };
    _proto.onMlBtnClick = function (e) {
        console.log("面料click");
    };
    _proto.multiply = function () {
        /*
            public function drawToCanvas(canvasWidth:Number, canvasHeight:Number, offsetX:Number, offsetY:Number):HTMLCanvas
            绘制 当前Sprite 到 Canvas 上，并返回一个HtmlCanvas。

            绘制的结果可以当作图片源，再次绘制到其他Sprite里面，示例：
            var htmlCanvas:HTMLCanvas = sprite.drawToCanvas(100, 100, 0, 0);//把精灵绘制到canvas上面 
            var texture:Texture = new Texture(htmlCanvas);//使用htmlCanvas创建Texture 
            var sp:Sprite = new Sprite().pos(0, 200);//创建精灵并把它放倒200位置 
            sp.graphics.drawTexture(texture);//把截图绘制到精灵上 
            Laya.stage.addChild(sp);//把精灵显示到舞台

            也可以获取原始图片数据，分享到网上，从而实现截图效果，示例：
            var htmlCanvas:HTMLCanvas = sprite.drawToCanvas(100, 100, 0, 0);//把精灵绘制到canvas上面 
            var canvas:= htmlCanvas.getCanvas();//获取原生的canvas对象 
            trace(canvas.toDataURL("image/png"));//打印图片base64信息，可以发给服务器或者保存为图片 
        */
        var canvas_model = this.msk.drawToCanvas(750, 784, 0, 0);
        var model_ctx = canvas_model.getContext("2d");
        var model_imgData = model_ctx.getImageData(0, 0, canvas_model.width, canvas_model.height);
        var canvas_texture = this.colour.drawToCanvas(750, 784, 0, -201);
        var texture_ctx = canvas_texture.getContext("2d");
        var texture_imgData = texture_ctx.getImageData(0, 0, canvas_texture.width, canvas_texture.height);
        /*
            var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
            var data = imageData.data;
                
            var invert = function() {
                for (var i = 0; i < data.length; i += 4) {
                    data[i]     = 225 - data[i];     // red
                    data[i + 1] = 225 - data[i + 1]; // green
                    data[i + 2] = 225 - data[i + 2]; // blue
                }
                ctx.putImageData(imageData, 0, 0);
            };
        */
        // 正片叠底
        var model_data = model_imgData.data;
        var texture_data = texture_imgData.data;
        // if(some){
        //     document.body.appendChild(canvas_model.getCanvas());
        //     document.body.appendChild(canvas_texture.getCanvas());
        //     return;
        // }
        for (var i = 0, len = texture_data.length; i < len; i += 4) {
            if (texture_data[i + 3] === 0) {
                // texture_imgData[i]     = 0;     // red
                // texture_imgData[i + 1] = 0; // green
                // texture_imgData[i + 2] = 0; // blue
                continue;
            }
            model_data[i] = model_data[i] * texture_data[i] / 255;     // red
            model_data[i + 1] = model_data[i + 1] * texture_data[i + 1] / 255; // green
            model_data[i + 2] = model_data[i + 2] * texture_data[i + 2] / 255; // blue
            //model_data[i + 3] = 255 * 0.75; // alpha
        }

        model_ctx.putImageData(model_imgData, 0, 0);
        
        
        this.blend.visible=true;
        this.blend.graphics.drawTexture(new Laya.Texture(canvas_model));
        //document.body.appendChild(canvas_model.getCanvas());
        // document.body.appendChild(canvas_texture.getCanvas());
    };
    _proto.setTexture = function (imgUrl) {
        this.colour_texture.graphics.fillTexture(Laya.loader.getRes(imgUrl), 0, 0, 750, 1334);
        this.multiply();
    };
    _proto.setModel = function (imgUrl) {
        var that=this;
        this.loadModel(imgUrl);
        //setTimeout(function(){
            that.multiply();
        //},200)
    }

    return Main;
})(ui.mainViewUI);