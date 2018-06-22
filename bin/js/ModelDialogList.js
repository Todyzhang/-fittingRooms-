/**
* name 
*/
var ModelDialogList = (function (_super) {
    var _proto;
    function ModelDialogList() {
        ModelDialogList.super(this);
        this.init();
    };
    Laya.class(ModelDialogList, "ModelDialogList", _super);
    _proto = ModelDialogList.prototype;
    _proto.init = function () {
        var ary = [];
        for (var i = 1; i < 5; i++){
            ary.push({ img: { skin:"comp/model"+i+".jpg"} });
        }
        this.list.array = ary;
        //点击选择项目时
        this.list.selectHandler = new Laya.Handler(this, function (index) {
            var img=this.list.array[index].img.skin;
            Laya.stage.getChildByName("mainUI").setModel(img);
            this.close();
        });
        this.list.scrollBar.changeHandler=new Laya.Handler(this,function(e){
            console.log("change:",e)
        });
    }
    return ModelDialogList;
})(ui.modelListDialogUI);