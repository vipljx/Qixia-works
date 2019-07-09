<template>
    <div>
        <Header2 title="个体信息类型" to="/c"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">请选择具体个体类别</div>
                    <div class="ul1-li-div2">
                        <select name="" v-model="param.orgKind">
                            <option>个体工商户</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">请选择组织形式</div>
                    <div class="ul1-li-div2">
                        <select name="" v-model="param.orgDaType">
                            <option>个人经营</option>
                            <option>家庭经营</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center" >
                    <div class="ul1-li-div1">申请执照副本</div>
                    <div class="ul1-li-div7">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioA" id="radioA1" type="radio" value="1" v-model="param.yyzzNumber"><label for="radioA1" class="main0">1</label>
                            <input name="radioA" id="radioA2" type="radio" value="2" v-model="param.yyzzNumber" checked><label for="radioA2">2</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Cate name="注册资金" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">币种</div>
                    <div class="ul1-li-div2">
                        <select name="" >
                            <option>人民币</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">金额</div>
                    <div class="ul1-li-div2">
                        <input type="number"  placeholder="" v-model="param.zcMoney">
                    </div>
                    <span class="ul1-li-span">万元</span>
                </li>
               
               
            </ul>
            
        </div>
        
        <div class="btnA" @click="next" v-show="!isTrue"><mt-button type="primary" size="large" >下一步</mt-button></div>
        <div class="btnA" @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA" @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>

        <div class="heigth20"></div>
    </div>
</template>
<script>
import Cate from '../components/cate.vue'
export default {
    data() {
        return {
            isShow:true,
            isTrue:false,
            param:{
                bId:"",
                fId:"",
                orgKind:"个体工商户",//个体类别
                orgDaType:"个人经营",//组织形式
                yyzzNumber:"1",//营业执照数量
                zcMoney:"",//注册金额(万)
                status:1
            },
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
        this.history();
    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryIndiviType",{
                bId:this.param.bId
            },false).then((res)=>{
                console.log(res)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    this.param.orgType=res.data.orgType;

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
                if(!keyVal.trim()){
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
            //console.log( this.$validator.errors.first('email') )
            this.saveIndiviType((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/f")
                }
            });
        },
        //暂存
        stag(){
            if(!this.isFinished()){
                return
            }
            this.saveIndiviType((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        //保存数据
        saveIndiviType(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/saveIndiviType",this.param,false,false).then((res)=>{
                console.log(res);
                this.$storage.set("orgDaType",this.param.orgDaType);
                callBack(res);
            
            }).catch(function(msg){
                console.log(msg);
            });
        }
    },
    components:{
        'Cate':Cate
    }
    
}
</script>