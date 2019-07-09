<template>
    <div>
        <Header2 title="店招标牌登记" :hasMargin="false" to="/c"></Header2>
        <ul class="ul1 main">
            <li class="flex align-items-center noBottomBorder justify-content-flex-end">
                <div class="t-guide"><img src="../assets/images/z-ico.png" alt=""><span class="t-guide-bt" @click="open3">店招指南</span></div>
            </li>
        </ul>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">店招名称</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.signName" :readonly="this.isDone==0">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">设置地址</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.signAddr" :readonly="this.isDone==0">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">使用材质</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.signMaterial">
                    </div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <div class="ul1-li-div1">规则数量</div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <textarea name="" id="" class="border"  v-model="param.signNum"></textarea>
                </li>
            </ul>
        </div>
        <div class="main">
            <div class="t-title">店招标牌设置要求</div>
            <p class="t-p">该单位申请设置的店招标牌，应符合《南京市店招标牌设置规范》并承诺做到：</p>
            <p class="t-p">
            (1)严格遵守《南京市店招标牌设置管理办法 》<br>
            (2)必须按照区、街统一规划制作店招标牌<br>
            (3)如因规划、建设、城市管理需要（调整、拆除等）店招应无条件服从
            </p>
        </div>
        <div class="btnA"  @click="next" v-show="!isTrue"><mt-button type="primary" size="large">下一步</mt-button></div>
        <div class="btnA"  @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA"  @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>
        <div class="heigth20"></div>

        <!-- 指南 -->
        <div id="popup3" class="weui-popup-container">
            <div class="heigth10"></div>
            <div class="cont">
                <ul class="y-ul popup-ul popup-ul2">
                    <li class="y-li">
                        <div class="y-cate">
                            1、备案须知
                        </div>
                        <p class="y-p">
                        任何单位和个人设置店招必须到城市管理部门申报办理备案手续，未经备案擅自设置店招店牌，将依据《江苏省城市市容和环境卫生管理条例》、《南京市
城市治理条例》、《南京市店招标牌设置管理办法》等法律法规依法处 </p>
                    
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            2、所需材料：
                        </div>
                        <p class="y-p">
                        a. 营业执照或者其他证明主体资格合法有效的文件；<br>
                        b. 房屋所有权或者使用权证明；<br>
                        c. 店招设置前后对比远景效果图一份，以及夜间亮化效果图一份，尺寸说明（需含相邻两家门面店招设置情况）；

                        </p>
                        
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        3、备案申请
                        </div>
                        <p class="y-p">
                        携带以上材料至街道城管科填写办理栖霞区店招标牌设置登记表<a href="http://source.tanyangnet.com/certs/shopSign/shopSign.doc" download="shopSign.doc">（表格下载）</a>经查验资料及现场勘察后，符合标准要求的给予办理登记备案手续
                        </p>
                        <p class="y-note">备注：此表一式三份，需区城市管理局、街道城管科、申请单位或业主盖章后各执一份</p>
                    </li>
                    <li class="y-li">
                        <p class="y-p">
                        店招指南电话 :  025-85580299
                        </p>
                    </li>
                  
                </ul>
                <div class="popup-button2">
                   <div class="btnA" @click="close3"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow:true,
            isTrue:false,
            param:{
                bId:"",
                fId:"",
                signName:"",//店铺名称
                signAddr:"",//设置地址
                signMaterial:"",//使用材质
                signNum:"",//规则数量
            }
        }
    },
    props: ['isDone'],
    created(){
        this.param.bId=this.$storage.get("bId");
        this.param.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        // if(this.isDone==0){
        //     this.history();
        // }
        this.queryBusiness();
        this.queryAddress();
        this.history();
    },
    mounted() {
        var height2=$(".weui-popup-container").height()-$(".popup-button2").height();
        $(".popup-ul2").css({
            height:height2
        });
    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryShopSign",{
                bId:this.param.bId
            },false).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    this.param.signId=res.data.signId;
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryBusiness(){
            this.$get("/individual/queryBusiness",{
                bId:this.param.bId
            },false).then((res)=>{
                //console.log(res.data)
                if(res.resultCode==200){
                    switch(res.data.jyfwMczh)
                    {
                        case "行政区域+字号+行业+组织形式":
                            this.param.signName=res.data.jyfwXzqy+""+res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+行政区域+组织形式":
                            this.param.signName=res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwXzqy+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+(行政区域)+组织形式":
                            this.param.signName=res.data.jyfwMainName+""+res.data.jyfwTradeCode+"("+res.data.jyfwXzqy+")"+res.data.jyfwOrgType;
                            break;
                        case "字号+(行政区域)+行业+组织形式":
                            this.param.signName=res.data.jyfwMainName+"("+res.data.jyfwXzqy+")"+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        default:
                            this.param.signName=res.data.jyfwMainName+""+res.data.jyfwXzqy+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                    }
                    //console.log(this.param.signName)
                    
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryAddress(){
            this.$get("/individual/queryAddress",{
                bId:this.param.bId
            },false).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                    this.param.signAddr=res.data.zsCity+res.data.zsRegion+res.data.detailZsAddr

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            Object.keys(this.param).forEach(function(key){
                var keyVal=String(that.param[key])
                //console.log(key+":"+keyVal)
                if(!keyVal.trim() && key!="signMaterial" && key!="signNum"){
                    isFinish=true;
                }

            });
            if(isFinish){
                this.$toast({
                    message: '请完善信息',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }else{
                return true
            }
        },
        next(){
            if(!this.isFinished()){
                return
            }
            //console.log(this.param);
            this.saveShopSign((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/r")
                }
            });
        },
        //暂存
        stag(){
            if(!this.isFinished()){
                return
            }
            this.saveShopSign((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
         //保存数据
        saveShopSign(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/saveShopSign",this.param,false,false).then((res)=>{
                //console.log(res)
                callBack(res)
            
            }).catch(function(msg){
                console.log(msg);
            });
        },
        open3(){
            
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:0
            });

        },
        close3(){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:"-100%"
            });
        }
    }
}
</script>