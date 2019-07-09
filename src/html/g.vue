<template>
    <div>
        <Header2 title="名称及经营范围" :hasMargin="false" to="/c"></Header2>
        <Cate name="个体名称" :isShow="!isShow"></Cate>
       <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">行政区域</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.jyfwXzqy" @change="selectCity" data-target="disabled">
                            <option value="南京市栖霞区">南京市栖霞区</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">名称组合</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.jyfwMczh" @change="echo" data-target="disabled">
                            <option :value="tmp" v-for="(tmp,index) in jyfwMczh" v-show="index<=jyfwMczhIndex" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-p">注：“行政区+字号+行业特点+组织形式”，例如“南京真功夫餐饮店”，其中：南京-行政区域，真功夫-字号，餐饮-行
业特点，店-组织形式。</div>
                </li>
                <li class="flex align-items-center" >
                    <div class="ul1-li-div1">字号</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioA" id="radioA1"  type="radio" value="1" v-model="param.isNameCode" checked><label for="radioA1" class="main0">有字号</label>
                            <input name="radioA" id="radioA2"  type="radio" value="0" v-model="param.isNameCode" ><label for="radioA2">无名称</label>
                        </div>
                    </div>
                </li>
                <li class="flex align-items-center"  v-show="isHidden">
                    <div class="ul1-li-div1">主选字号</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.jyfwMainName" @blur="echo" data-target="disabled" v-validate="'max:6'" data-vv-name="jyfwMainName">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-p">注：例如“南京真功夫餐饮店”，其中“真功夫”就是“字号”,字号必须由两个或两个以上的汉字组成，与其他企业名
称中不得相同，是独有的名称标志。</div>
                </li>
                <li class="flex align-items-center" v-show="isHidden">
                    <div class="ul1-li-div1">备选字号1</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="alternative[0]" v-validate="'max:6'" data-vv-name="alternative">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-p">注：当主选字号名称存在重名或不可用的情况下，备选字号可以备用以供选择。</div>
                </li>
                <li class="flex align-items-center" v-for="(tmp,index) in alternative"  v-show="index>0" :key="tmp">
                    <div class="ul1-li-div1">备选字号{{index+1}}</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="alternative[index]" readonly>
                    </div>
                    <div class="ul1-li-div4" @click="del(index)"><img src="../assets/images/ico0.png" alt=""></div>
                </li>
                <div v-show="isHidden">
                    <li class="flex align-items-center" v-show="alternative.length<4" >
                        <button class="ul1-li-button" @click="add">新增备选字号</button>
                    </li>
                </div>
                
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">行业</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.jyfwTradeCode" @input="onInput" data-target="disabled" placeholder="请输入行业关键字">
                    </div>
                    <div class="ul1-li-div5" @click="open1"><img src="../assets/images/ico4.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">组织形式</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.jyfwOrgType" @change="echo" data-target="disabled">
                            <option value="店">店</option>
                            <option value="厂">厂</option>
                            <option value="馆">馆</option>
                            <option value="部">部</option>
                            <option value="行">行</option>
                            <option value="中心">中心</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <div class="ul1-li-div1 red">*个体名称</div>
                    <div class="ul1-li-div2">
                        <input type="text" readonly v-model="param.shopName">
                    </div>
                </li>
            </ul>
        </div>
        <Cate name="经营范围信息" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经营范围</div>
                    <div class="ul1-li-div2">
                        <input type="text" readonly @click="open2" id="jyfwInfo">
                    </div>
                    <div class="ul1-li-div6"><img src="../assets/images/ico1.png" alt=""></div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <textarea name="" id="" v-model="param.jyfwInfo" class="border"></textarea>
                </li>
            </ul>
        </div>
        <div class="btnA" @click="next" v-show="!isTrue"><mt-button type="primary" size="large" >下一步</mt-button></div>
        <div class="btnA" @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA" @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>
        <div class="heigth20"></div>
        
        <!--行业搜索弹出层-->
        <div id="popup1" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul1">
                    <li v-for="(tmp,index) in jyfwTradeCode" :key="index"><input name="radioB" :id="'radioB'+index" type="radio" :value="index" v-model="jyfwTradeCodeIndex"><label :for="'radioB'+index">{{tmp.hyName}}</label></li>

                </ul>
                <div class="popup-button1">
                    <div class="btnA" @click="submit1"><mt-button type="primary" size="large" >确定</mt-button></div>
                   <div class="btnA" @click="close1"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

        <!--经营范围弹出层-->
        <div id="popup2" class="weui-popup-container">
            <div class="search">
                <div class="mint-search">
                    <div class="mint-searchbar">
                        <div class="mint-searchbar-inner">
                            <input type="search" placeholder="请输入关键字" v-model="hyName" class="mint-searchbar-core">
                        </div> 
                        <a class="mint-searchbar-cancel"  @click="seach">搜索</a>
                    </div>
                </div>
            </div>
            <div class="cont">
                <ul class="popup-ul popup-ul2">
                    <li v-for="(tmp,index) in jyfwOne" :key="index">
                        <input :id="'radio'+tmp.hyParent+index" type="checkbox" :value="tmp.hyName" ><label :for="'radio'+tmp.hyParent+index" >{{tmp.hyName}}</label>
                    </li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA"  @click="submit2" ><mt-button type="primary" size="large" >确定</mt-button></div>
                   <div class="btnA" @click="close2"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script>
import Cate from '../components/cate.vue'
export default {
    data() {
        return {
            isShow:true,
            isHidden:true,
            isTrue:false,
            alternative:[
                    ""
                ],//备选字号
            jyfwTradeCode:[],//行业列表
            jyfwTradeCodeIndex:"",//行业选中下标
            jyfwMczh:[
                "行政区域+字号+行业+组织形式",
                "字号+行业+行政区域+组织形式",
                "字号+行业+(行政区域)+组织形式",
                "字号+(行政区域)+行业+组织形式",
                "字号+行政区域+行业+组织形式"
            ],
            jyfwMczhIndex:5,
            param:{
                bId:"",
                fId:"",
                jyfwXzqy:"南京市栖霞区",//行政区域
                jyfwMczh:"行政区域+字号+行业+组织形式",//名称组合
                isNameCode:1,
                jyfwMainName:"",//主选字号
                jyfwNames:"",//备选字号
                jyfwTradeCode:"",//行业的中文
                hyCode:"",//行业的编码
                jyfwOrgType:"店",
                jyfwInfo:"",
                shopName:"",//公司名称
                status:1
            },
            jyfwInfo:[],
            hyName:"",
            jyfwOne:[],//经营范围列表一级
            jyfwTwo:[],//经营范围列表二级
            scrollTop:0
        }
    },
    props: ['isDone'],
    components:{
        'Cate':Cate
    },
    created(){
        this.param.bId=this.$storage.get("bId");
        this.param.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        //console.log(this.isDone)
        // if(this.isDone==0 || this.isDone==2){
        //     this.history();
        // }
        this.history();
        
    },
    mounted() {
        var height1=$(".weui-popup-container").height()-$(".popup-button1").height();
        $(".popup-ul1").css({
            height:height1
        });
        var height2=$(".weui-popup-container").height()-$(".popup-button2").height()-$(".search").height();;
        $(".popup-ul2").css({
            height:height2
        });
        $("input[readonly]").focus(()=>{
            document.activeElement.blur()
        })
    },
    watch:{
        'param.isNameCode'(newVal,oldVal){
            if(newVal==oldVal){
                return
            }
            if(this.param.isNameCode==1){
                if(this.isDone==0){
                    this.isHidden=true;
                    this.history();
                }else{
                    this.isHidden=true;
                    this.param.jyfwMainName="";
                }
                
            }else if(this.param.isNameCode==0){
                this.isHidden=false;
                this.param.jyfwMainName="***";
                this.alternative=[""];
                
            }
            this.echo();
        }
    },

    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryBusiness",{
                bId:this.param.bId
            },false).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    if(res.data.jyfwNames!=null){
                        var jyfwNames = res.data.jyfwNames.split("#");
                        this.alternative = jyfwNames;
                    }
                    this.jyfwInfo = res.data.jyfwInfo.split(",");
                    this.param.jyfwId=res.data.jyfwId;
                    this.echo();

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
    
        onInput(){
            this.param.hyCode="";
        },
        selectCity(){
            if(this.param.jyfwXzqy=="南京"){
                this.jyfwMczhIndex=this.jyfwMczh.length;
            }else{
                this.param.jyfwMczh=this.jyfwMczh[0];
                this.jyfwMczhIndex=0;
            }
            this.echo();
        },
        initOne(){
            this.$get("/shareholdersBusiness/queryCodeByHyName",{
                hyName:this.param.jyfwTradeCode
            },3).then((res)=>{
                //console.log(res.append)
                if(res.result=="success"){
                    this.jyfwTradeCode=res.append;
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        initTwo(){
            this.$get("/shareholdersBusiness/queryHyCodeByHyName",{
                hyName:this.hyName
            },3).then((res)=>{
                //console.log(res)
                if (res.result == "success") {
                    this.jyfwOne=res.append;
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        //根据名称组合回显公司名称
        echo(){
            var jyfwMainName=this.param.jyfwMainName.trim();
            var jyfwTradeCode=this.param.jyfwTradeCode;
            if(jyfwMainName && jyfwTradeCode){
                switch(this.param.jyfwMczh)
                {
                    case "行政区域+字号+行业+组织形式":
                        this.param.shopName=this.param.jyfwXzqy+" "+this.param.jyfwMainName+" "+this.param.jyfwTradeCode+" "+this.param.jyfwOrgType;
                        break;
                    case "字号+行业+行政区域+组织形式":
                        this.param.shopName=this.param.jyfwMainName+" "+this.param.jyfwTradeCode+" "+this.param.jyfwXzqy+" "+this.param.jyfwOrgType;
                        break;
                    case "字号+行业+(行政区域)+组织形式":
                        this.param.shopName=this.param.jyfwMainName+" "+this.param.jyfwTradeCode+" ("+this.param.jyfwXzqy+") "+this.param.jyfwOrgType;
                        break;
                    case "字号+(行政区域)+行业+组织形式":
                        this.param.shopName=this.param.jyfwMainName+" ("+this.param.jyfwXzqy+") "+this.param.jyfwTradeCode+" "+this.param.jyfwOrgType;
                        break;
                    default:
                        this.param.shopName=this.param.jyfwMainName+" "+this.param.jyfwXzqy+" "+this.param.jyfwTradeCode+" "+this.param.jyfwOrgType;
                }
            }else{
                this.param.shopName=""
            }
        },

        submit1(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:"-100%"
            });
            if(this.jyfwTradeCodeIndex){
                this.param.jyfwTradeCode=this.jyfwTradeCode[this.jyfwTradeCodeIndex].hyName;
                this.param.hyCode=this.jyfwTradeCode[this.jyfwTradeCodeIndex].hyCode;
                this.echo()
            }
            
        
        },
        submit2(){
            var that=this;
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            });
            $("#popup3").css({
                right:"-100%"
            });
            $("input[type='checkbox']").each(function(){
                //console.log(this)
                if(this.checked == true){
                    if(that.jyfwInfo.indexOf($(this).val())==-1){
                        that.jyfwInfo.push($(this).val())
                    }
                }else{
                    if(that.jyfwInfo.indexOf($(this).val())!=-1){
                        that.jyfwInfo.splice(that.jyfwInfo.indexOf($(this).val()),1)
                    }
                }
            });
            this.param.jyfwInfo=this.jyfwInfo.join(",");
            $("#jyfwInfo").focus()
        },
        add(){
            var that=this;
            this.$messagebox({
                $type:'prompt',
                title: '提示',
                message: '请输入备选字号',
                showCancelButton: true,
                showInput:true,
                inputType:"text",
            }).then(({ value }) => {
                var len=value.split("").length;
                if(len>6){
                    this.$toast({
                        message: '备选字号不能超过6个字符',
                        position: 'middle',
                        duration: 2000
                    });
                    return
                }
                if(value){
                    this.alternative.push(value);
                }
            }).catch((err) => {
            
            })
        

        },

        del(index){
            this.alternative.splice(index,1)
        },
        open1(){
            var that=this;
            if(!this.param.jyfwTradeCode.trim()){
                this.$toast({
                    message: '请填写行业关键字',
                    position: 'middle',
                    duration: 1000
                });
                return
            }
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            // $(window).scrollTop(0);
            $("#popup1").css({
                right:0
            });
            this.initOne();

        },
        open2(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
           // $(window).scrollTop(0);
            $("#popup2").css({
                right:0
            });
        },
        seach(){
            this.initTwo();
        },
        close1(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:"-100%"
            });
  
        },
        close2(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            });
            $("#jyfwInfo").focus()
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            if(this.param.isNameCode==1){
                //console.log(this.alternative)
                //备选字号1必填
                if(!this.alternative[0].trim()){
                    isFinish=true
                }
                this.param.jyfwNames=this.alternative.join("#");
                Object.keys(this.param).forEach(function(key){
                    var keyVal=String(that.param[key])
                    
                    if(!keyVal.trim() && key!="hyCode"){
                        console.log(key+":"+keyVal)
                        isFinish=true;
                    }

                });
            }else{
                 Object.keys(this.param).forEach(function(key){
                    var keyVal=String(that.param[key])
                    if(!keyVal.trim() && key!="hyCode" && key!="jyfwNames"){
                        console.log(key+":"+keyVal)
                        isFinish=true;
                    }

                });
            }
           
            if(isFinish){
                this.$toast({
                    message: '请完善信息',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }
            //console.log(this.$validator.errors)
            if(this.$validator.errors.has('jyfwMainName')){

                this.$toast({
                    message: "首选"+this.$validator.errors.first('jyfwMainName'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }
            if(this.$validator.errors.has('alternative')){

                this.$toast({
                    message: "备选"+this.$validator.errors.first('alternative'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }

            return true;
        },
        next(){
            if(!this.isFinished()){
                return
            }
            //console.log(this.param);
            this.saveBusiness((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/e");
                }
            });
            
        },
        //暂存
        stag(){
            if(!this.isFinished()){
                return
            }
            
            this.saveBusiness((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        //保存数据
        saveBusiness(callBack){
            this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
            this.$post2("/individual/saveBusiness",this.param,false,false).then((res)=>{
                //console.log(res)
                callBack(res)
            
            }).catch(function(msg){
                console.log(msg);
            });
        }
    }
}
</script>
<style scoped>
.mint-search{
    height: 100%;
}
.ul1-li-div5{
    margin-left: 1rem
}
</style>
