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
        this.clothes = new Laya.Sprite();//有色衣服层-置换参照图

        this.colour.addChildren(this.colour_texture);
        this.colourWrap.addChildren(this.colour, this.blend);

        this.colour.width = 750;
        this.colour.height = 784;
        this.colour.pos(0, 201);
        this.colour_texture.width = 750;
        this.colour_texture.height = 1334;
        this.colour_texture.pos(0, -201);

        this.modelPig.pos(0, 201);
        this.msk.pos(0, 201);
        this.blend.pos(0, 201);

        //this.colourWrap.zOrder = 2;

        this.loadSource();
        this.addEvents();
    };
    _proto.initTexturePos = function () {
        this.mmp = { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, mp: { x: 0, y: 0 } };//记录花色位置信息
        this.colour_texture.pos(0, 0);
    }

    _proto.loadSource = function () {
        this.loadModel("comp/model2.jpg");
        this.setTexture("comp/fs1.jpg");
    };
    _proto.loadModel = function (imgUrl) {
        this.modelPig.graphics.clear();
        this.modelPig.loadImage(imgUrl);
        this.msk.graphics.clear();
        this.blend.graphics.clear();
        this.msk.loadImage(imgUrl.replace(".jpg", "_msk.png"));
        this.clothes.graphics.clear();
        this.clothes.loadImage(imgUrl.replace(".jpg", "_s_msk.png"));
        this.colourWrap.mask = this.msk;

        this.initTexturePos();

        // console.log(this.colorBlend([{ "rgbNum": { "r": 122, "g": 122, "b": 122 }, "percent": 0.3599999999999996 }, { "rgbNum": { "r": 122, "g": 122, "b": 122 }, "percent": 0.24000000000000007 }, { "rgbNum": { "r": 102, "g": 102, "b": 102 }, "percent": 0.24000000000000007 }, { "rgbNum": { "r": 102, "g": 102, "b": 102 }, "percent": 0.16000000000000028 }]));
        // console.log(this.colorBlend2([{ "rgbNum": { "r": 122, "g": 122, "b": 122 }, "percent": 0.3599999999999996 }, { "rgbNum": { "r": 122, "g": 122, "b": 122 }, "percent": 0.24000000000000007 }, { "rgbNum": { "r": 102, "g": 102, "b": 102 }, "percent": 0.24000000000000007 }, { "rgbNum": { "r": 102, "g": 102, "b": 102 }, "percent": 0.16000000000000028 }]))
    }

    _proto.addEvents = function () {
        this.modelPig.on("mousedown", this, this.onMouseDown);
        this.fsBtn.on("click", this, this.onFsBtnClick);
        this.mlBtn.on("click", this, this.onMlBtnClick);
        this.modelBtn.on("click", this, this.onModelBtnClick)
    };

    _proto.onMouseDown = function (e) {
        window.wx && wx.showModal && wx.showModal({ content: "点击花色按钮" });
        this.mmp.p1 = { x: e.stageX, y: e.stageY };
        this.mmp.mp = { x: this.colour_texture.x, y: this.colour_texture.y };
        this.blend.visible = false;
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
        //wx&&wx.showModal&&wx.showModal({ content: "点击花色按钮" });
        new FsDialogList().popup();
    };
    _proto.onModelBtnClick = function (e) {
        new ModelDialogList().popup();
    };
    _proto.onMlBtnClick = function (e) {
        console.log("面料click");
    };
    _proto.checkRow = function (row) {
        if (row < 0) row = 0;
        if (row > 784) row = 784;
        return row;
    };
    _proto.checkCol = function (col) {
        if (col < 0) col = 0;
        if (col > 750) col = 750;
        return col;
    };
    //红色通道的下标
    _proto.getRedIndex = function (row, col) {
        return (row * 750 + col) * 4;
    };
    _proto.caluRowCol = function (row, col, red, green) {
        /*
            horizontal 水平
            vertical   垂直
            diagonal   对角
            direction  方向
        */
        var x, y, decimal_x, decimal_y, direction_x, direction_y, reback = {};
        //移动的位置距离
        var colNum = (red - 128) * 0.05;//水平的褶皱一般是通过红色通道来处理,0-128向右，128-255向左
        var rowNum = (green - 128) * 0.05;//垂直的褶皱一般是通过绿色通道来处理,0-128向下，128-255向上

        direction_x = rowNum > 0;//方向
        direction_y = colNum > 0;
        colNum = Math.abs(colNum);
        rowNum = Math.abs(rowNum);

        y = ~~colNum;//取整
        x = ~~rowNum;
        decimal_x = rowNum - x;//取小数
        decimal_y = colNum - y;

        reback.x = x;
        reback.y = y;

        reback.target = {};
        reback.target.row = this.checkRow(direction_x ? (row - x) : (row + x));
        reback.target.col = this.checkCol(direction_y ? (col - y) : (col + y));
        reback.target.red = this.getRedIndex(reback.target.row, reback.target.col);
        reback.target.area = (1 - decimal_x) * (1 - decimal_y);

        reback.diagonal = {};
        reback.diagonal.row = this.checkRow(direction_x ? (row - x - 1) : (row + x + 1));
        reback.diagonal.col = this.checkCol(direction_y ? (col - y - 1) : (col + y + 1));
        reback.diagonal.red = this.getRedIndex(reback.diagonal.row, reback.diagonal.col);
        reback.diagonal.area = decimal_x * decimal_y;

        reback.horizontal = {};
        reback.horizontal.row = reback.diagonal.row;
        reback.horizontal.col = reback.target.col;
        reback.horizontal.red = this.getRedIndex(reback.horizontal.row, reback.horizontal.col);
        reback.horizontal.area = (1 - decimal_x) * decimal_y;

        reback.vertical = {};
        reback.vertical.row = reback.target.row;
        reback.vertical.col = reback.diagonal.col;
        reback.vertical.red = this.getRedIndex(reback.vertical.row, reback.vertical.col);
        reback.vertical.area = decimal_x * (1 - decimal_y);
        // console.log(JSON.stringify(reback), reback.vertical.area + reback.horizontal.area + reback.diagonal.area + reback.target.area)
        return reback;
    }
    /*
        photoshop 滤镜-置换
    */
    _proto.displace = function () {
        var canvas_clothes = this.clothes.drawToCanvas(750, 784, 0, 0);
        var clothes_ctx = canvas_clothes.getContext("2d");
        var clothes_imgData = clothes_ctx.getImageData(0, 0, 750, 784);
        var clothes_data = clothes_imgData.data;

        var canvas_texture = this.colour.drawToCanvas(750, 784, 0, 0);
        var texture_ctx = canvas_texture.getContext("2d");
        var texture_imgData = texture_ctx.getImageData(0, 0, 750, 784);
        var texture_data = texture_imgData.data;

        var i, j, d, len = clothes_data.length, red, red_index, green, alpha, rgbNum;
        var clone_data = this.colour.drawToCanvas(750, 784, 0, 0).getContext("2d").getImageData(0, 0, 750, 784).data;
        for (i = 0; i < 784; i++) {

            for (j = 0; j < 750; j++) {
                red_index = this.getRedIndex(i, j);
                red = clothes_data[red_index];
                green = clothes_data[red_index + 1];
                alpha = clothes_data[red_index + 3];
                if (alpha === 0) continue;

                d = this.caluRowCol(i, j, red, green);

                rgbNum = this.colorBlend([
                    { rgbNum: { r: clone_data[d.target.red], g: clone_data[d.target.red + 1], b: clone_data[d.target.red + 2]}, percent: d.target.area },
                    { rgbNum: { r: clone_data[d.horizontal.red], g: clone_data[d.horizontal.red + 1], b: clone_data[d.horizontal.red + 2] }, percent: d.horizontal.area },
                    { rgbNum: { r: clone_data[d.vertical.red], g: clone_data[d.vertical.red + 1], b: clone_data[d.vertical.red + 2] }, percent: d.vertical.area }, 
                    { rgbNum: { r: clone_data[d.diagonal.red], g: clone_data[d.diagonal.red + 1], b: clone_data[d.diagonal.red + 2] }, percent: d.diagonal.area }]);

                texture_data[red_index] = Math.round(rgbNum.r);
                texture_data[red_index + 1] = Math.round(rgbNum.g);
                texture_data[red_index + 2] = Math.round(rgbNum.b);
                texture_data[red_index + 3] = clone_data[d.target.red + 3];
            }
        }
        texture_ctx.putImageData(texture_imgData, 0, 0);
        // document.body.appendChild(canvas_clothes.getCanvas());
        // document.body.appendChild(canvas_texture.getCanvas());
        return texture_ctx;
    }
    /*
        颜色混合计算
        之前为了实现不同颜色液体混合的颜色变化效果，推敲得出一个计算公式。
        两种颜色混合后，混色的色值计算，RGB分别用这个公式计算：颜色A-(颜色A-颜色B)*(1-颜色A的百分比)
        例如：绿和白混合，绿(192, 229, 112)70%，白(255, 255, 255)30%
        R: 192-(192-255)*(1-0.7) = 210.9
        G: 229-(229-255)*(1-0.7) = 234.8
        B: 112-(112-255)*(1-0.7) = 154.9
        四舍五入后得到混合色值：(211, 235, 155)。
        经过验证，效果是靠谱的。如果要计算2个以上颜色的混色色值，先计算出其中两个的混色，再和第三个计算，递归至算完全部
    */
    // _proto.colorBlend = function (nums) {
    //     var otherNums, ary1, ary2, percent,sumPercent,r,g,b;
    //     if (nums.length < 2) {
    //         throw new Error("请传入最少2个以上的数据");
    //     } else {
    //         ary1 = nums[0];
    //         ary2 = nums[1];
    //         if (ary1.percent===1){
    //             return ary1;
    //         }else if (nums.length === 2) {
    //             sumPercent = ary1.percent + ary2.percent;
    //             ary1.percent = ary1.percent / sumPercent;
    //             percent = 1 - ary1.percent;
    //             r = ary1.rgbNum.r - (ary1.rgbNum.r - ary2.rgbNum.r) * percent;
    //             g = ary1.rgbNum.g - (ary1.rgbNum.g - ary2.rgbNum.g) * percent;
    //             b = ary1.rgbNum.b - (ary1.rgbNum.b - ary2.rgbNum.b) * percent;
    //             return { rgbNum:{r:r,g:g,b:b}, percent: sumPercent };
    //         } else {
    //             otherNums = nums.slice(2);
    //             return this.colorBlend(otherNums.concat(this.colorBlend([ary1,ary2])));
    //         }
    //     }
    // }
    _proto.colorBlend=function(nums) {
        var r=0,g=0,b=0;
        for(var i=0;i<nums.length;i++){
            r+=nums[i].rgbNum.r*nums[i].percent;
            g+=nums[i].rgbNum.g*nums[i].percent;
            b+=nums[i].rgbNum.b*nums[i].percent;
        }
        return {r:r,g:g,b:b}
    }
    /*
        photoshop 正片叠底
    */
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
        var model_imgData = model_ctx.getImageData(0, 0, 750, 784);
        //var canvas_texture = this.displace();
        var texture_ctx = this.displace();
        var texture_imgData = texture_ctx.getImageData(0, 0, 750, 784);
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


        this.blend.visible = true;
        this.blend.graphics.drawTexture(new Laya.Texture(canvas_model));
        // document.body.appendChild(canvas_model.getCanvas());
        // document.body.appendChild(canvas_texture.getCanvas());
    };
    _proto.setTexture = function (imgUrl) {
        this.colour_texture.graphics.fillTexture(Laya.loader.getRes(imgUrl), 0, 0, 750, 1334);
        this.multiply();
    };
    _proto.setModel = function (imgUrl) {
        var that = this;
        this.loadModel(imgUrl);
        //setTimeout(function(){
        that.multiply();
        //},200)
    }

    return Main;
})(ui.mainViewUI);