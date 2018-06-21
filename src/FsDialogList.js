/**
* name 
*/
var FsDialogList = (function (_super) {
    var _proto;
    function FsDialogList() {
        FsDialogList.super(this);
        this.init();
    };
    Laya.class(FsDialogList, "FsDialogList", _super);
    _proto = FsDialogList.prototype;
    _proto.init = function () {
        var ary = [];
        for (var i = 1; i < 7; i++){
            ary.push({ img: { skin:"comp/fs"+i+".jpg"} });
        }
        this.list.array = ary;
        
        this.list.selectHandler = new Laya.Handler(this, function (index) {
            var img=this.list.array[index].img.skin;
            Laya.stage.getChildByName("mainUI").setTexture(img);
            this.close();
        });
        this.list.scrollBar.changeHandler=new Laya.Handler(this,function(e){
            console.log("change:",e)
        });
    }
    return FsDialogList;
})(ui.fsListDialogUI);