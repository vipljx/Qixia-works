<template>
    <div>
        <Header2 title="食品安全管理人员" :hasMargin="false" to="/k"></Header2>
        <ul class="ul1 main">
            <li class="flex align-items-center noBottomBorder">
                <div class="cate-m"></div>
                <div class="cate-r flex align-items-center justify-content-space-between" ><img src="../assets/images/ico9.png" alt="" @click="open2" ></div>
            </li>
        </ul>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">姓名</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" v-model="param.operManName">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">人员类型</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.personType">
                            <option value="2">食品安全技术人员</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">性别</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.sex">
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">民族</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.nation">
                            <option :value="tmp.nationCode" v-for="(tmp,index) of SpxkzNationsList" :key="index">{{tmp.nationName}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">职位</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.position">
                            <option :value="tmp.positionCode" v-for="(tmp,index) of ZwDictList" :key="index">{{tmp.positionName}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">住址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请选择省/市/区(县)" v-model="addr"  @click="select(1)" readonly>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="详细地址:如乡(镇/街道)、村(路/弄)、门牌号码"  v-model="nativePlace">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件类型</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.certType">
                            <option :value="tmp.certtypeCode" v-for="(tmp,index) of CertTypeDictList" :key="index">{{tmp.certtypeName}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件号</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" v-model="param.certNo" v-validate="'idCard'" data-vv-name="idCard">
                    </div>
                </li>
                
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">移动电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入"  v-model="param.phone" v-validate="'mobile'" data-vv-name="mobile">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">任免单位</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入"  v-model="param.appointUnit">
                    </div>
                </li>
               
            </ul>
        </div>
        <Select v-if="show1" :ref="show1" @changeValue='isShow1' :province='province' :city='city' :county='county'></Select>
        <div class="btnA" @click="next"><mt-button type="primary" size="large" >确定</mt-button></div>
        <div class="heigth20"></div>


        <!--共享弹出层-->
        <div id="popup2" class="weui-popup-container2">
            <Cate name="选择人员" :isShow="!isShow"></Cate>
            <div class="bgWhite">
                <ul class="ul1 main">
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">姓名</div>
                        <div class="ul1-li-div2">
                            <select name="" dir="rtl" v-model="currentIndex">
                                <option :value="index" v-for="(tmp,index) of people" :key="index">{{tmp.operManName}}</option>
                            </select>
                        </div>
                        <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">证件类型</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请输入" value="身份证"  readonly>
                        </div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">证件号码</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请输入" :value="people[currentIndex].certNo" readonly>
                        </div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">移动电话</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请输入" :value="people[currentIndex].phone" readonly>
                        </div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">住址</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请输入" :value="people[currentIndex].nativePlace" readonly>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="popup-button1">
                <div class="btnA" @click="submit2"><mt-button type="primary" size="large" >确定</mt-button></div>
                <div class="btnA" @click="close2"><mt-button type="default" size="large">返回</mt-button></div>
                <div class="heigth20"></div>
            </div>
        </div>

    </div>
</template>
<script>
import Cate from '../components/cate.vue'
import Select from '../components/select'
export default {
    data() {
        return {
            isShow:true,
            ZwDictList:[],
            SpxkzNationsList:[],
            CertTypeDictList:[],
            show1: false,
            province: '江苏省',
            city: '南京市',
            county: '栖霞区',
            addr:"江苏省南京市栖霞区",
            nativePlace:"",
            param:{
                bId:"",
                fId:"",
                appointUnit:"",//任免单位
                certNo:"",//证件号
                certType:1,//证件类型
                nation:"01",//名族
                nativePlace:"",//户籍登记住址
                operManName:"",//姓名
                personType:2,//人员类型
                phone:"",//移动电话
                position:1,//职务
                sex:1,//性别
                state:0
            },
            obj:{
                operManName:"",
                certNo:"",
                phone:"",
                nativePlace:""
            },
            people:[{
                certNo:"",
                phone:"",
                nativePlace:""
            }],
            currentIndex:0
        }
    },
    props: ['safeId','bId','fId'],
    created(){
        this.param.bId=this.bId;
        this.param.fId=this.fId;
        this.getZwDict();
        this.getSpxkzNations();
        this.getCertTypeDict();
        this.queryBusiness();
        if(this.safeId){
            this.history();
        }
    },
    mounted() {
        
        $("input[readonly]").focus(()=>{
            document.activeElement.blur()
        })
    },
    methods: {
        history(){
            var that=this;
            this.$get("/apply/queryFoodSafePerson",{
                safeId:this.safeId
            }).then((res)=>{
                //console.log(res.data)
                if(res.resultCode==200){
                    if(res.data.nation<10){
                        res.data.nation="0"+res.data.nation
                    }
                    Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    var index1=res.data.nativePlace.indexOf("省");      
                    this.province=res.data.nativePlace.slice(0,index1+1).trim();
                    var index2=res.data.nativePlace.indexOf("市");      
                    this.city=res.data.nativePlace.slice(index1+1,index2+1).trim(); 
                    var index3=res.data.nativePlace.indexOf("区");      
                    this.county=res.data.nativePlace.slice(index2+1,index3+1).trim();
                    this.addr=res.data.nativePlace.slice(0,index3+1).trim();
                    this.nativePlace=res.data.nativePlace.slice(index3+1).trim();      
                    this.param.safeId=res.data.safeId;               
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        open2(){
            
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:0
            });
            this.queryShowDataInfo();

        },
        submit2(){
            var that=this;
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            });
            Object.keys(that.obj).forEach(function (key) {
                that.param[key] = that.people[that.currentIndex][key];
                if(key=='nativePlace'){
                    var address=that.people[that.currentIndex].nativePlace;
                    var index1=address.indexOf("省");      
                    that.province=address.slice(0,index1+1).trim();
                    var index2=address.indexOf("市");      
                    that.city=address.slice(index1+1,index2+1).trim(); 
                    var index3=address.indexOf("区");      
                    that.county=address.slice(index2+1,index3+1).trim();
                    that.addr=address.slice(0,index3+1).trim();
                    that.nativePlace=address.slice(index3+1).trim(); 
                }
                 
            });
        },
        close2(){
            $(document.body).toggleClass("html-body-overflow");
            $(window).scrollTop(0);
            $("#popup2").css({
                right:"-100%"
            });
        },
        queryBusiness(){
            this.$get("/individual/queryBusiness",{
                bId:this.param.bId
            },false).then((res)=>{
                console.log(res.data)
                if(res.resultCode==200){
                    switch(res.data.jyfwMczh)
                    {
                        case "行政区域+字号+行业+组织形式":
                            this.param.appointUnit=res.data.jyfwXzqy+""+res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+行政区域+组织形式":
                            this.param.appointUnit=res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwXzqy+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+(行政区域)+组织形式":
                            this.param.appointUnit=res.data.jyfwMainName+""+res.data.jyfwTradeCode+"("+res.data.jyfwXzqy+")"+res.data.jyfwOrgType;
                            break;
                        case "字号+(行政区域)+行业+组织形式":
                            this.param.appointUnit=res.data.jyfwMainName+"("+res.data.jyfwXzqy+")"+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        default:
                            this.param.appointUnit=res.data.jyfwMainName+""+res.data.jyfwXzqy+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                    }
                    
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryShowDataInfo(){
            this.$get("/apply/queryShowDataInfo",{
                bId:this.param.bId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode=='200'){
                    this.people=[];
                    for(var tmpA of res.data.qxzwzxOnePersonalList){
                        tmpA.operManName=tmpA.ryName;
                        tmpA.certNo=tmpA.ryCertCode;
                        tmpA.phone=tmpA.ryPhone;
                        tmpA.nativePlace=tmpA.ryAddress;
                    }
                    for(var tmpB of res.data.qxzwzxOneWorkPersonList){
                        tmpB.operManName=tmpB.personName;
                    }
                    this.people=this.people.concat(res.data.qxzwzxOnePersonalList,res.data.qxzwzxOneSafePersonList,res.data.qxzwzxOneWorkPersonList);
                    // console.log(res.data.qxzwzxOnePersonalList[0]);
                    // console.log(res.data.qxzwzxOneSafePersonList[0]);
                    // console.log(res.data.qxzwzxOneWorkPersonList[0])
                    console.log(this.people)
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },

        getZwDict(){
            this.$get("/dictController/getZwDict",{},4).then((res)=>{
                //console.log(res.append)
                if(res.result=='success'){
                    this.ZwDictList=res.append?res.append:[]
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        getSpxkzNations(){
            this.$get("/dictController/getSpxkzNations",{},4).then((res)=>{
                //console.log(res.append)
                if(res.result=='success'){
                    this.SpxkzNationsList=res.append?res.append:[]
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        getCertTypeDict(){
            this.$get("/dictController/getCertTypeDict",{},4).then((res)=>{
                //console.log(res.append)
                if(res.result=='success'){
                    this.CertTypeDictList=res.append?res.append:[]
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
            }
            if(this.$validator.errors.has('idCard')){

                 this.$toast({
                    message: this.$validator.errors.first('idCard'),
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
            return true
        },
        next(){
            this.param.nativePlace=this.addr+this.nativePlace;
            if(!this.isFinished()){
                return
            }
            this.insertFoodSafePerson((res)=>{
                if(res.resultCode==200){
                    this.$router.push("/k")
                }
            });
        
        },
        insertFoodSafePerson(callBack){
            this.$get("/apply/insertFoodSafePerson",{
                safePersonData:this.param,
                bId:this.bId,
                fId:this.fId
            }).then((res)=>{
                console.log(res);
                callBack(res)
            })
        },
        select(i){
            if(i==1){
                this.show1 = true;
            }
            
        },
        isShow1(msg){
            //console.log(msg);
            this.show1 = msg.show;
            this.addr = msg.result;
            // this.param.addrProvince = msg.province;
            // this.param.addrCity = msg.city;
            // this.param.addrCounty = msg.county;
        },
    },
    components:{
        'Cate':Cate,
        'Select':Select
    }
}
</script>