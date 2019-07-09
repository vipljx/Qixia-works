<template>
    <div>
        <Header2 title="经营场所地址" to="/c"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">所在区域</div>
                    
                    <div class="ul1-li-div2">
                        <div>南京市栖霞区</div>
                        <select name="" v-model="street">
                            <option v-for="tmp in areaList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">详细地址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="" v-model="detailZsAddr">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经营面积</div>
                    <div class="ul1-li-div2">
                        <input type="number" placeholder="" v-model="param.roomArea">
                    </div>
                    <span class="ul1-li-span">平米</span>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">房屋性质</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl"  v-model="param.roomType">
                            <option v-for="(item,index) in roomTypeList" :key="index">{{item}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">房屋权属</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl"   v-model="param.roomOwner">
                            <option v-for="(item,index) in roomOwnerList" :key="index">{{item}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">邮政编码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder=""  v-validate="'code'" data-vv-name="code" v-model="param.roomCode">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">联系电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder=""  v-validate="'mobile'" data-vv-name="mobile" v-model="param.roomPhone">
                    </div>
                </li>
                <li>
                    <div class="cate-m">经营场所证明确定方式</div>
                    <div class="height10"></div>
                    <div class="ul1-li-div8">
                        <p v-for="(item) in xieyiTypeList" :key="item.value" class="ul1-li-div8-p">
                            <input type="radio" name="radioB"  v-model="param.xieyiType" :value="item.value" :id="item.id" />
                            <label :for="item.id" class="flex align-items-center">{{item.name}}</label>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <Cate name="登记机关" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1 flex1">
                        <select name="" v-model="param.orgName">
                            <option>南京市栖霞区市场监督管理局</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">固定电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="" v-validate="'tel'" data-vv-name="tel" v-model="param.orgPhone" readonly>
                    </div>
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
    created(){
    
    },
    data() {
        return {
            isShow:true,
            isTrue:false,
            street:"请选择",
            detailZsAddr:"",
            areaList:["请选择","尧化街道","马群街道","迈皋桥街道","燕子矶街道","栖霞街道","龙潭街道","仙林街道","八卦洲街道","西岗街道"],
            xieyiTypeList: [
                {
                    value: "1",
                    name: "《租赁协议》已在不动产部门备案",
                    id: "y"
                },
                {
                    value: "2",
                    name: " 在线签署",
                    id: "z"
                },
                {
                    value: "3",
                    name: " 柜台确认",
                    id: "g"
                }
            ],
            roomTypeList: [
                "商业与其他非住宅",
                "城镇住宅",
                "农村住宅",
			],
            roomOwnerList: [
                "租赁使用权",
                "自有产权",
                "无偿使用权",
                "其他",
            ],
            param:{
                bId:"",
                fId:"",
                zsCity: "南京市",//市
                zsRegion: "栖霞区",//区
                detailZsAddr: "",//详细地址
                roomArea:"",//经营面积
                roomType: "商业与其他非住宅",// 房屋性质
                roomOwner: "租赁使用权",//产权归属
                roomCode:"",//邮政编码
                roomPhone:"",//联系电话
                xieyiType: "3",//经营场所确定方式
                orgName: "南京市栖霞区市场监督管理局",//登记机关名称
                orgPhone:"025-85562318",//登记机关电话
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
    mounted(){

    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryAddress",{
                bId:this.param.bId
            },false).then((res)=>{
                console.log(res.data)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    var index=res.data.detailZsAddr.indexOf("街道");
                    if(index!=-1){
                        this.street=res.data.detailZsAddr.slice(0,index+2).trim();
                        this.detailZsAddr=res.data.detailZsAddr.slice(index+2).trim();
                    }else{
                        this.detailZsAddr=res.data.detailZsAddr
                    }
                    this.param.addressId=res.data.addressId;

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            this.param.detailZsAddr="";
            if(this.street!="请选择"){
                this.param.detailZsAddr=this.street+this.detailZsAddr;
            }else{
                this.param.detailZsAddr=this.detailZsAddr;
            }
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
            }
            if(this.$validator.errors.has('code')){
                 this.$toast({
                    message: this.$validator.errors.first('code'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }
            if(this.$validator.errors.has('mobile')){
                 this.$toast({
                    message: this.$validator.errors.first('mobile'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }
            if(this.$validator.errors.has('tel')){

                 this.$toast({
                    message: this.$validator.errors.first('tel'),
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
            
            this.saveAddress((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/h")
                }
            });
            
        },
        //暂存
        stag(){
            if(!this.isFinished()){
                return
            }
            this.saveAddress((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        //保存数据
        saveAddress(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/saveAddress",this.param,false,false).then((res)=>{
                //console.log(res)
                callBack(res)
            
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