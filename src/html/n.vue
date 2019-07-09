<template>
    <div>
        <Header2 title="从业人员" :hasMargin="false" to="/m"></Header2>
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
                        <input type="text" placeholder="请输入" v-model="param.personName">
                    </div>
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
                    <div class="ul1-li-div1">年龄</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" v-model="param.age">
                    </div>
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
                    <div class="ul1-li-div1">职务</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.position">
                            <option :value="tmp.positionCode" v-for="(tmp,index) of ZwDictList" :key="index">{{tmp.positionName}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">联系电话</div>
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
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">健康编号</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入"  v-model="param.healthNo">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">工种</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请选择" id="workType"  v-model="param.workType" readonly @click="openA">
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">发证单位</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入"  v-model="param.sendLicUnit">
                    </div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <div class="ul1-li-div1 align-self-flex-start flex">健康证</div>
                    <div class="ul1-li-div2">
                        <ul class="flex justify-content-space-between ul1-li-div2-ul">
                            <li><img :src="healthImage" alt=""></li>
                            <li  @click="chooseFile"><img src="../assets/images/j_tp2.jpg" alt=""></li>
                        </ul>
                        <my-image-cropper
                                v-model="photo"
                                :width="125"
                                :height="125"
                                :placeholder="'点击上传'"
                                :placeholder-font-size="16"
                                :accept="'image/*'"
                                :prevent-white-space="false"
                                @file-choose="handleCroppaFileChoose"
                        v-show="false" ></my-image-cropper>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-p  flex" @click="open3">暂无健康证,查看指南 ></div>
                </li>
            </ul>
        </div>
        <div class="btnA" @click="next"><mt-button type="primary" size="large" >确定</mt-button></div>
        <!-- <div class="btnA" ><mt-button type="default" size="large">暂存</mt-button></div> -->
        <div class="heigth20"></div>
        <Select v-if="show1" :ref="show1" @changeValue='isShow1' :province='province' :city='city' :county='county'></Select>

        <!-- 工种 -->
        <div id="popup1" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul1">
                    <li v-for="(tmp,index) in workTypeList" :key="index" @click="selected(index)">{{tmp}}</li>
                    <li class="popup-li">
                        <input type="text" placeholder="请输入自定义工种"  v-model="workType">
                    </li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA"  @click="confirm"><mt-button type="primary" size="large" >确定</mt-button></div>
                   <div class="btnA" @click="close1"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>
        <!--共享弹出层-->
        <div id="popup2" class="weui-popup-container2">
            <Cate name="选择人员" :isShow="!isShow"></Cate>
            <div class="bgWhite">
                <ul class="ul1 main">
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">姓名</div>
                        <div class="ul1-li-div2">
                            <select name="" dir="rtl" v-model="currentIndex">
                                <option :value="index" v-for="(tmp,index) of people" :key="index">{{tmp.personName}}</option>
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
        <!-- 指南 -->
        <div id="popup3" class="weui-popup-container">
            <div class="heigth10"></div>
            <div class="cont">
                <ul class="y-ul popup-ul popup-ul2">
                    <li class="y-li">
                        <div class="y-cate">
                            办理材料
                        </div>
                        <p class="y-p">
                            1、本人身份证<br>
                            2、两张免冠近期1寸照片<br>
                            3、就业单位的营业执照副本复印件加盖公章
                        </p>
                        <p class="y-p">
                            说明：身份证住址或单位营业执照副本中经营地址必须有一个归属栖霞区域方可办理
                        </p>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            办理地点
                        </div>
                        <p class="y-p">
                            南京市栖霞区尧化门尧佳路66号
                        </p>
                        
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            办理时间
                        </div>
                        <table class="y-p" cellspacing="0" cellpadding="0">
                            <tr>
                                <td colspan="2">周一至周五(除法定节假日)</td>
                            </tr>
                            <tr>
                                <td>上午：</td>
                                <td>08:00—11:00</td>
                            </tr>
                            <tr>
                                <td>下午：</td>
                                <td>14:00—15:30 (5月- 9月)</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>13:30—15:00 (10月- 4月)</td>
                            </tr>
                        </table>
                        
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            咨询电话
                        </div>
                        <p class="y-p">
                            025-85718135
                        </p>
                        
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            注意事项
                        </div>
                        <p class="y-p">
                            1、切记一定要空腹去办健康证，空腹时间至少10个小时，因为需要做抽血化验，抽血前一天晚上不要吃油腻、高蛋白食物，不要喝酒、抽烟。2、健康证的有限期一般在一年或者两年，具体看
    证件上的说明，过期后自动作废，需要重新补办。3、若是孕妇，请先不要办健康证，因为胸透可能会影响到胎儿发育
                        </p>
                    </li>
                    
                </ul>
                <div class="popup-button3">
                   <div class="btnA" @click="close3"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Mixins} from '../model/mixin'
import {otherUrlC} from '../../config/env'
import Select from '../components/select'
import Cate from '../components/cate.vue'
import {Indicator} from 'mint-ui'
export default {
    data() {
        return {
            isShow:true,
            ZwDictList:[],
            SpxkzNationsList:[],
            CertTypeDictList:[],
            workTypeList:["操作员","服务员","厨师","销售员"],
            workType:"",
            photo:{},
            healthImage:require("../assets/images/j_tp1.jpg"),
            show1: false,
            province: '江苏省',
            city: '南京市',
            county: '栖霞区',
            addr:"江苏省南京市栖霞区",
            nativePlace:"",
            param:{
                bId:"",
                fId:"",
                age:"",//年龄
                appointUnit:"",//任免单位
                certNo:"",//证件号
                certType:1,//证件类型
                healthImage:"",//健康证图片
                healthNo:"",//健康证编号
                nation:"01",//名族
                nativePlace:"",//户籍登记住址
                personName:"",//姓名
                phone:"",//移动电话
                position:1,//职务
                sendLicUnit:"",//发证单位
                sex:1,//性别
                state:0,
                workType:"",//工种
                
            },
            obj:{
                personName:"",
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
    props: ['workpersonId','bId','fId'],
    created(){
        this.param.bId=this.bId;
        this.param.fId=this.fId;
        this.getZwDict();
        this.getSpxkzNations();
        this.getCertTypeDict();
        this.queryBusiness();
        if(this.workpersonId){
            this.history();
        }
    },
    mixins:[Mixins],
    mounted(){
        var height1=$(".weui-popup-container").height()-$(".popup-button1").height();
        $(".popup-ul1").css({
            height:height1
        });
        var height2=$(".weui-popup-container").height()-$(".popup-button3").height();
        $(".popup-ul2").css({
            height:height2
        });
        $("input[readonly]").focus(()=>{
            document.activeElement.blur()
        });
    },
    methods: {
        chooseFile(){
            this.photo.chooseFile()
        },
        handleCroppaFileChoose(e){
            this.$getBase64(e,(data) => {
                this.upload(e,data)
            })  
        },
        upload(e,base64){
            this.$indicator.open({
                text: '图片处理完成，提交中...',
                spinnerType: 'double-bounce'
            })
            var formData=new FormData();
            formData.append("file",e);  
            $.ajax({
                contentType: "multipart/form-data",
                url: otherUrlC+"/file/upload?path=kzImage",
                type: "POST",
                data: formData,
                dataType: "text",
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: data=> {
                    data=JSON.parse(data);
                    this.healthImage=base64;
                    this.param.healthImage=data.fileName;
                    this.$indicator.close();
                }
            })

        },
        history(){
            var that=this;
            this.$get("/apply/queryWorkPerson",{
                workpersonId:this.workpersonId
            }).then((res)=>{
                //console.log(res.data)
                if(res.resultCode==200){
                    if(res.data.nation<10){
                        res.data.nation="0"+res.data.nation
                    }
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    if(res.data.healthImage){
                        this.healthImage=otherUrlC+"/file/down_file?file=/"+res.data.healthImage;   
                    }
                    var index1=res.data.nativePlace.indexOf("省");      
                    this.province=res.data.nativePlace.slice(0,index1+1).trim();
                    var index2=res.data.nativePlace.indexOf("市");      
                    this.city=res.data.nativePlace.slice(index1+1,index2+1).trim(); 
                    var index3=res.data.nativePlace.indexOf("区");      
                    this.county=res.data.nativePlace.slice(index2+1,index3+1).trim();
                    this.addr=res.data.nativePlace.slice(0,index3+1).trim();
                    this.nativePlace=res.data.nativePlace.slice(index3+1).trim();
                    this.param.workpersonId=res.data.workpersonId;               
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
        open3(){
            
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:0
            });

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
           
            $("#popup2").css({
                right:"-100%"
            });
        },
        close3(){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:"-100%"
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
                //console.log(res)
                if(res.resultCode=='200'){
                    this.people=[];
                    for(var tmpA of res.data.qxzwzxOnePersonalList){
                        tmpA.personName=tmpA.ryName;
                        tmpA.certNo=tmpA.ryCertCode;
                        tmpA.phone=tmpA.ryPhone;
                        tmpA.nativePlace=tmpA.ryAddress;
                    }
                    for(var tmpB of res.data.qxzwzxOneSafePersonList){
                        tmpB.personName=tmpB.operManName;
                    }
                    this.people=this.people.concat(res.data.qxzwzxOnePersonalList,res.data.qxzwzxOneSafePersonList,res.data.qxzwzxOneWorkPersonList);
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
                if(!keyVal.trim() && key!="healthImage"){
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
            this.insertWorkPerson((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/m")
                }
            });
        },
        insertWorkPerson(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/insertWorkPerson",{
                workPersonData:this.param,
                bId:this.bId,
                fId:this.fId
            }).then((res)=>{
                console.log(res);
                callBack(res)
            })
        },
        openA(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:0
            });
        },
        close1(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:"-100%"
            });
            
        },
        confirm(){
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:"-100%"
            }) 
            this.param.workType=this.workType;
        },
        selected(i){
            this.param.workType=this.workTypeList[i];
            $(document.body).toggleClass("html-body-overflow");
            $(document.documentElement).toggleClass("html-body-overflow");
            $("#popup1").css({
                right:"-100%"
            })  
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