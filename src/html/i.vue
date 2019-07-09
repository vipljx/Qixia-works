<template>
    <div>
        <Header2 title="人员添加" to="/h"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center noBottomBorder">
                    <div class="cate-m">人员类型</div>
                    <div class="cate-r flex align-items-center justify-content-space-between" v-if="false"><img src="../assets/images/ico8.png" alt=""><img src="../images/ico9.png" alt="" @click="share" v-if="false"></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div9">
                        <div class="radioGroup2  flex justify-content-space-between ">
                            <div>
                                <input name="radioA" id="radioG1" type="radio" value="1" v-model="param.ryCountry"><label for="radioG1">经营者</label>
                            </div>
                            <div>                            
                                <input name="radioA" id="radioG2" type="radio" value="2" v-model="param.ryCountry"><label for="radioG2">家庭成员</label>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">姓名</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.ryName">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">性别</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioB" id="radioH1" type="radio" value="1" v-model="param.rySex"><label for="radioH1" class="main0">男</label>
                            <input name="radioB" id="radioH2" type="radio" value="2" v-model="param.rySex"><label for="radioH2">女</label>
                        </div>
                    </div>
                </li>


                <li class="flex align-items-center">
                    <div class="ul1-li-div1">民族</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ryNation">
                            <option :value="tmp.id" v-for="(tmp,index) of SpxkzNationsList" :key="index">{{tmp.name}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">职务</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.position">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件类别</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ryCertType">
                            <option :value="tmp.val" v-for="tmp in ryCertType" :key="tmp.name">{{tmp.name}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件号码</div>
                    <div class="ul1-li-div2">
                        <input type="text"  v-model="param.ryCertCode" v-validate="'idCard'" data-vv-name="idCard">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">移动电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.ryPhone" v-validate="'mobile'" data-vv-name="mobile">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">固定电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.ryTel" v-validate="'tel'" data-vv-name="tel">
                    </div>
                </li>

                <li class="flex align-items-center" >
                    <div class="ul1-li-div1">电子邮箱</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.ryEmain" v-validate="'email'" data-vv-name="email">
                    </div>
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
                        <input type="text" placeholder="详细地址:如乡(镇/街道)、村(路/弄)、门牌号码"  v-model="ryAddress">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">邮政编码</div>
                    <div class="ul1-li-div2">
                        <input type="text" v-model="param.ryCode" v-validate="'code'" data-vv-name="code">
                    </div>
                </li>

                <li class="flex align-items-center">
                    <div class="ul1-li-div1">政治面貌</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ryZzmm">
                            <option v-for="tmp in zzmmList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">文化程度</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ryWhcd">
                            <option v-for="tmp in whcdList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">职业状况</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ryZyzk">
                            <option v-for="tmp in zyzkList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <div class="ul1-li-div1">是否为海外留学生</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioF" id="radioF1" type="radio" value="0" v-model="param.isHw"><label for="radioF1" class="main0">是</label>
                            <input name="radioF" id="radioF2" type="radio" value="1" v-model="param.isHw"><label for="radioF2">否</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Select v-if="show1" :ref="show1" @changeValue='isShow1' :province='province' :city='city' :county='county'></Select>
        <div class="btnA" @click="next"><mt-button type="primary" size="large">下一步</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>
import Select from '../components/select'
export default {
    data() {
        return {
            
            ryCertType:[
                {
                    name:"身份证",
                    val:1791
                }
            ],
            zzmmList:["群众","共青团员","中共预备党员","中共党员","民革会员","民盟盟员","民建会员","民进会员","农工党党员","致工党党员","九三学社社员","台盟盟员","无党派民主人士"],
            whcdList:["小学","初中","高中","中专","大专","本科","硕士","博士","文盲","其他"],
            zyzkList:["高校毕业生","下岗失业人员","残疾人","退役士兵","农民","高校科技人员","科研院所科技人员","国有失业单位科技人员","国有企业单位科技人员","全日制高校学生","其他"],
            show1: false,
            province: '江苏省',
            city: '南京市',
            county: '栖霞区',
            addr:"江苏省南京市栖霞区",
            ryAddress:"",
            SpxkzNationsList:[],
            param:{
                bId:"",
                fId:"",
                ryCountry:"1",//人员类别
                ryName:"",//姓名
                rySex:1,//性别
                ryNation:"5",//民族
                position:"",//职务
                ryCertType:"1791",//证件类型
                ryCertCode:"",//证件号码
                ryPhone:"",//移动电话
                ryTel:"",//固定电话
                ryEmain:"",//电子邮件
                ryAddress:"",//住所
                ryCode:"",// 邮政编码
                ryZzmm:"群众",//政治面貌
                ryWhcd:"小学",//文化程度
                ryZyzk:"其他",//职业状况
                isHw:1,//是否海外留学生
                status:1
            }
        }
    },
    props: ['ryId','bId','fId'],
    created(){
        this.param.bId=this.bId;
        this.param.fId=this.fId;
        this.queryNation();
        //console.log(this.param)
        if(this.ryId){
            this.history();
        }
        //this.history();
    },
    methods: {
        history(){
            var that=this;
            this.$get("/individual/queryPersonnel",{
                ryId:this.ryId
            },false).then((res)=>{
                console.log(res.data)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    var index1=res.data.ryAddress.indexOf("省");      
                    this.province=res.data.ryAddress.slice(0,index1+1).trim();
                    var index2=res.data.ryAddress.indexOf("市");      
                    this.city=res.data.ryAddress.slice(index1+1,index2+1).trim(); 
                    var index3=res.data.ryAddress.indexOf("区");      
                    this.county=res.data.ryAddress.slice(index2+1,index3+1).trim();
                    this.addr=res.data.ryAddress.slice(0,index3+1).trim();
                    this.ryAddress=res.data.ryAddress.slice(index3+1).trim();      
                    this.param.ryId=res.data.ryId;
                    
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
       queryNation(){
           this.$get("/individual/queryNation",{},false).then((res)=>{
                console.log(res.data)
                if(res.resultCode==200){
                   this.SpxkzNationsList=res.data
                }
            }).catch(function(msg){
                console.log(msg);
            });
       },
        next(){
            this.param.ryAddress=this.addr+this.ryAddress;
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
                return
            }
            if(this.$validator.errors.has('idCard')){

                 this.$toast({
                    message: this.$validator.errors.first('idCard'),
                    position: 'middle',
                    duration: 2000
                });
                return 
            }

            if(this.$validator.errors.has('mobile')){
                 this.$toast({
                    message: this.$validator.errors.first('mobile'),
                    position: 'middle',
                    duration: 2000
                });
                return 
            }
            if(this.$validator.errors.has('tel')){

                 this.$toast({
                    message: this.$validator.errors.first('tel'),
                    position: 'middle',
                    duration: 2000
                });
                return 
            }
            if(this.$validator.errors.has('email')){

                 this.$toast({
                    message: this.$validator.errors.first('email'),
                    position: 'middle',
                    duration: 2000
                });
                return 
            }
            if(this.$validator.errors.has('code')){
                 this.$toast({
                    message: this.$validator.errors.first('code'),
                    position: 'middle',
                    duration: 2000
                });
                return 
            }
            //console.log(this.param);
           
            this.savePersonnel();
        },

        //保存数据
        savePersonnel(){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/savePersonnel",this.param,false,false).then((res)=>{
                this.$indicator.close();
                if(res.resultCode==200){
                    this.$router.push("/h")
                }else{
                    this.$toast({
                        message: res.message,
                        position: 'middle',
                        duration: 2000
                    });
                }
            
            }).catch(function(msg){
                console.log(msg);
            });
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
        'Select':Select
    }
}
</script>