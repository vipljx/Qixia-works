<template>
    <div>
        <Header2 title="食品经营许可申请" to="/c"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main">
            
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经营者名称</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入名称" v-model="param.corpName" readonly >
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
                        <input type="text" placeholder="详细地址:如乡(镇/街道)、村(路/弄)、门牌号码"  v-model="param.addrTown">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经营场所</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请选择省/市/区(县)" v-model="fare"  @click="select(2)" readonly>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="详细地址:如乡(镇/街道)、村(路/弄)、门牌号码"  v-model="param.fareTown">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">是否有实体门店</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.ifEntity">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">仓库类型</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.storageType">
                            <option value="">请选择</option>
                            <option value="0">自有</option>
                            <option value="1">租赁</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">仓库地址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请选择省/市/区(县)" v-model="param.storageAddr"  @click="select(3)" readonly>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="详细地址:如乡(镇/街道)、村(路/弄)、门牌号码"  v-model="param.storageDetailAddr">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">利用自动售货设<br/>备从事食品销售</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.automaticSell" >
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                            
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">主体业态</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.mainKind">
                            <option value="">请选择</option>
                            <option :value="index+1" v-for="(tmp,index) of mainKindList" :key="index">{{tmp}}</option>
                           
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">主体业态(备注)</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.mainKindRemark">
                            <option value="">请选择</option>
                            <option v-for="(tmp,index) in mainKindRemarkList" :key="index" :value="tmp.mainkindId">{{tmp.mainkindName}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">中央厨房</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.centreKitchen">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">集体用餐配送单位</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.mealSendUnit">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">是否含网络经营</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.cnetManage">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center" v-show="param.cnetManage==1">
                    <div class="ul1-li-div1">网址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入网址" v-model="param.website">
                    </div>
                </li>
                 <li class="flex align-items-center" v-show="false">
                    <div class="ul1-li-div1 align-self-flex-start flex">网站截图</div>
                    <div class="ul1-li-div2">
                        <ul class="flex justify-content-space-between ul1-li-div2-ul">
                            <li><img :src="websitePic" alt=""></li>
                            <li @click="chooseFile"><img src="../assets/images/j_tp2.jpg" alt=""></li>
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
                        v-show="false"></my-image-cropper>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经营项目</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请选择" readonly v-model="param.manageName" data-target="one">
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1 align-self-flex-start flex">经营项目备注</div>
                    <div class="ul1-li-div2">
                        <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注" v-model="param.manageItemRemark"></textarea>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1 align-self-flex-start flex">其他类食品销<br/>售的具体品种</div>
                    <div class="ul1-li-div2">
                        <textarea name="" id="" cols="30" rows="10" placeholder="请输入具体品种"  v-model="param.otherSellItem"></textarea>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">散装熟食销售</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.foodSell">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">自酿酒销售</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.wineSell">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">拟申请机关</div>
                    <div class="ul1-li-div2 width5">
                        <input type="text" placeholder="请选择" v-model="param.belongorgName" @click="open2" readonly>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">申请副本数(份)</div>
                    <div class="ul1-li-div2">
                        <input type="number" placeholder="请输入" v-model="param.copyNum">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">有效期</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.validYear">
                            <option value="">请选择</option>
                            <option value="1">5年</option>
                            <option value="2">6个月</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">经济性质</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.corpType">
                            <!-- <option value="">请选择</option> -->
                            <!-- <option value="1">企业</option> -->
                            <option value="2">个体商户</option>
                            <!-- <option value="3">农民专业合作社</option>
                            <option value="4">其他</option> -->
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center" v-if="false">
                    <div class="ul1-li-div1">职工人数</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">应体检人数</div>
                    <div class="ul1-li-div2">
                        <input type="number" placeholder="请输入" v-model="param.checkNum">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">就餐座位数</div>
                    <div class="ul1-li-div2">
                        <input type="number" placeholder="请输入" v-model="param.seatNum">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">邮政编码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" v-model="param.zip" v-validate="'code'" data-vv-name="code">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">电子邮箱</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" v-model="param.eMail" v-validate="'email'" data-vv-name="email">
                    </div>
                </li>
            </ul>
        </div>
        <Select v-if="show1" :ref="show1" @changeValue='isShow1' :province='param.addrProvince' :city='param.addrCity' :county='param.addrCounty'></Select>
        <Select v-if="show2" :ref="show2" @changeValue='isShow2' :province='param.fareProvince' :city='param.fareCity' :county='param.fareCounty'></Select>
        <Select v-if="show3" :ref="show3" @changeValue='isShow3' :province='province' :city='city' :county='county'></Select>
        <div class="btnA" @click="next" v-show="!isTrue"><mt-button type="primary" size="large" >下一步</mt-button></div>
        <div class="btnA" @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA" @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>

        <div class="heigth20"></div>


        <!--经营项目弹出层-->
        <div id="one" class="select">
            <div class="select-top">
                <p>经营项目</p><img src="../assets/images/ico0.png" alt="" @click="saveXm" data-target="close">
            </div>
            <div class="select-bottom" id="xmMsg">
                <p>预包装食品销售</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="0101" id="select11"><label for="select11">预包装食品（含冷藏冷冻食品)</label></li>
                    <li><input type="checkbox" data-value="0102" id="select12"><label for="select12">预包装食品（不含冷藏冷冻食品)</label></li>
                </ul>
                <p>-----------------------------------------</p>
                <p>散装食品销售</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="0201" id="select21"><label for="select21">散装食品（含冷藏冷冻食品)</label></li>
                    <li><input type="checkbox" data-value="0202" id="select22"><label for="select22">散装食品（不含冷藏冷冻食品)</label></li>
                </ul>
                <p>-----------------------------------------</p>
                <p>特殊食品销售</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="0304" id="select31"><label for="select31">其他婴幼儿配方食品销售</label></li>
                    <li><input type="checkbox" data-value="0301" id="select32"><label for="select32">保健食品销售</label></li>
                    <li><input type="checkbox" data-value="0302" id="select33"><label for="select33">特殊医学用途配方食品销售</label></li>
                    <li><input type="checkbox" data-value="0303" id="select34"><label for="select34">婴幼儿配方乳粉销售</label></li>
                </ul>
                <p>-----------------------------------------</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="0010" id="select41"><label for="select41">热食类食品制售</label></li>
                    <li><input type="checkbox" data-value="11" id="select42"><label for="select42">冷食类食品制售</label></li>
                    <li><input type="checkbox" data-value="12" id="select43"><label for="select43">生食类食品制售</label></li>
                </ul>
                <p>-----------------------------------------</p>
                <p>糕点类食品制售</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="1301" id="select51"><label for="select51">糕点类食品制售</label></li>
                    <!--<li><input type="checkbox" data-value="1302" id="select52"><label for="select52">糕点类食品制售（不含裱花蛋糕）</label>-->
                </ul>
                <p>-----------------------------------------</p>
                <ul class="select-ul">
                    <li><input type="checkbox" data-value="14" id="select61"><label
                            for="select61">自制饮品制售(不含使用压力容器制作饮品、不含自酿白酒)</label></li>
                    <!--<li><input type="checkbox" data-value="09" id="select62"><label for="select62">其他类食品制售</label>-->
                    <li><input type="checkbox" data-value="19" id="select63"><label for="select63">其他类食品销售</label></li>
                </ul>
            </div>
        </div>
        
        

        <!-- 拟申请机关弹出层 -->
        <div id="popup2" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul2">
                    <li v-for="(tmp,index) in belongListA" :key="index"  class="flex align-items-center"><input type="radio" name="belongorgCode" @click="onRadio(tmp.belongorgName,tmp.belongorgCode)" ><div @click="open3(index)" >{{tmp.belongorgName}}</div></li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA"  @click="confirm"><mt-button type="primary" size="large" >确定</mt-button></div>
                   <div class="btnA" @click="close2"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

        <div id="popup3" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul2">
                    <li v-for="(tmp,index) in belongListB" :key="index" class="flex align-items-center"><input type="radio" name="belongorgCode" @click="onRadio(tmp.belongorgName,tmp.belongorgCode)" ><div>{{tmp.belongorgName}}</div></li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA"  @click="confirm"><mt-button type="primary" size="large" >确定</mt-button></div>
                   <div class="btnA" @click="close3"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Select from '../components/select'
import {otherUrlC,otherUrlD} from '../../config/env'
export default {
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            isTrue:false,
            province: '江苏省',
            city: '南京市',
            county: '栖霞区',
            addr:"江苏省南京市栖霞区",
            fare:"江苏省南京市栖霞区",
            photo:{},//图片上传组件对象
            bId:"",
            fId:"",
            fileName:"",
            mainKindList:["食品销售经营者","餐饮服务经营者","单位食堂"],    
            mainKindRemarkList:[],
            belongListA:[],
            belongListB:[],
            websitePic:require("../assets/images/j_tp1.jpg"),
            param:{
                corpName:"",//经营者名称
                addrProvince: "江苏省",//住所-省
                addrCity: "南京市",//住所-市
                addrCounty: "栖霞区",//住所-区
                addrTown: "",//住所-街道
                fareProvince: "江苏省",//经营场所-省
                fareCity: "南京市",//经营场所-市
                fareCounty:"栖霞区",//经营场所-区
                fareTown: "",//经营场所-街道
                ifEntity:"0",//是否有实体门店
                storageType:"0",//仓库类型
                storageAddr:"",//仓库地址
                storageDetailAddr:"",//仓库详细地址
                automaticSell:"0",//利用自动售货设备从事食品销售
                manageItem:"",//经营项目中文
                manageName:"",//经营项目编码
                mainKind:"",//主体业态
                mainKindRemark:"",//主体业态(备注)
                centreKitchen: "0",
                mealSendUnit:"0",//集体用餐配送单位
                cnetManage:"0",//是否含网络经营
                website:"",//网址
                websitePic:"../assets/images/ico2.png",//网站截图
                manageItemRemark:"",//经营项目备注
                otherSellItem:"",//其他类食品销售的具体品种
                foodSell:"0",//散装熟食销售
                wineSell: "0",//自酿酒销售
                belongOrgId:"",//拟申请机关
                belongorgName:"",//拟申请机关名
                copyNum:"",//申请副本数(份)
                validYear:"1",//有效期
                corpType:"2",//经济性质
                checkNum:"",//应体检人数
                seatNum:"",//就餐座位数
                zip: "",//邮政编码
	            eMail: "",//电子邮件
            }
        }
    },
    props: ['isDone'],
    created(){
        this.bId=this.$storage.get("bId");
        this.fId=this.$storage.get("fId");
        this.fileName=this.$storage.get("fileName");
        this.isTrue=this.$storage.get("isTrue");
        // if(this.isDone==0){
        //     this.history();
        // }
        this.queryBusiness();
        this.queryPersonnelList();
        this.queryAddress();
        this.history()
    },
    mounted() {
        var height1=$(".weui-popup-container").height()-$(".popup-button1").height();
        $(".popup-ul1").css({
            height:height1
        });
        var height2=$(".weui-popup-container").height()-$(".popup-button2").height();
        $(".popup-ul2").css({
            height:height2
        });
        $("input[readonly]").focus(()=>{
            document.activeElement.blur()
        });
        $("input[data-target='one']").on("click", function () {
            document.activeElement.blur();
            $("#one").css({
                height: '25rem'
            });
        });
        $("img[data-target='close']").on("click", function () {
            $("#one").css({
                height: 0
            });
        });
       

    },
    watch:{
        'param.mainKind'(val){
            if(val){
                val="-"+val
                this.getMainKindsDict(val)
            }else{
                this.mainKindRemarkList=[];
                this.param.mainKindRemark=""
            }
           
        }
    },
    methods: {
        history(){
            var that=this;
            this.$get("/apply/queryBaseInfoById",{
                bId:this.bId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode==200 && res.data){
                    this.addr="";
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    this.addr=res.data["addrProvince"]+res.data["addrCity"]+res.data["addrCounty"],
                    this.fare=res.data["fareProvince"]+res.data["fareCity"]+res.data["fareCounty"],
                    this.param.baseId=res.data.baseId;
                    this.fId=res.data.fId
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        back(){
            this.$router.push("/c");
        },
        queryBusiness(){
            this.$get("/individual/queryBusiness",{
                bId:this.bId
            },false).then((res)=>{
                //console.log(res.data)
                if(res.resultCode==200){
                    switch(res.data.jyfwMczh)
                    {
                        case "行政区域+字号+行业+组织形式":
                            this.param.corpName=res.data.jyfwXzqy+""+res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+行政区域+组织形式":
                            this.param.corpName=res.data.jyfwMainName+""+res.data.jyfwTradeCode+""+res.data.jyfwXzqy+""+res.data.jyfwOrgType;
                            break;
                        case "字号+行业+(行政区域)+组织形式":
                            this.param.corpName=res.data.jyfwMainName+""+res.data.jyfwTradeCode+"("+res.data.jyfwXzqy+")"+res.data.jyfwOrgType;
                            break;
                        case "字号+(行政区域)+行业+组织形式":
                            this.param.corpName=res.data.jyfwMainName+"("+res.data.jyfwXzqy+")"+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                            break;
                        default:
                            this.param.corpName=res.data.jyfwMainName+""+res.data.jyfwXzqy+""+res.data.jyfwTradeCode+""+res.data.jyfwOrgType;
                    }
                    
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryPersonnelList(){
            this.$get("/individual/queryPersonnelList",{
                bId:this.bId
            },false).then((res)=>{
                //console.log(res.data[0])
                if(res.resultCode==200){
                   for(var tmp of res.data){
                       if(tmp.ryCountry==1){
                           //this.param.corpName=tmp.ryName;
                           this.param.regNo=tmp.ryCertCode;
                           this.param.eMail=tmp.ryEmain;
                           this.param.zip=tmp.ryCode;  
                           var index1=tmp.ryAddress.indexOf("省");      
                           this.param.addrProvince=tmp.ryAddress.slice(0,index1+1).trim();
                           var index2=tmp.ryAddress.indexOf("市");      
                           this.param.addrCity=tmp.ryAddress.slice(index1+1,index2+1).trim(); 
                           var index3=tmp.ryAddress.indexOf("区");      
                           this.param.addrCounty=tmp.ryAddress.slice(index2+1,index3+1).trim();
                           this.param.addrTown=tmp.ryAddress.slice(index3+1).trim();  
         
                       }
                   }

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryAddress(){
            this.$get("/individual/queryAddress",{
                bId:this.bId
            },false).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                    this.param.fareTown=res.data.detailZsAddr

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        chooseFile(){
            this.photo.chooseFile()
        },
        handleCroppaFileChoose(e){
            this.$getBase64(e,(data) => {
               // console.log(e)
                this.AddCardCallBack(data);
            })     
        },
        AddCardCallBack(data){
            //console.log(data)
            this.$post(otherUrlC+"/file/AddCardCallBack2",{
                imgNum:0,
                imgBase64:data
            },false,true).then((res)=>{
                //console.log(res)
                if(res.result=='success'){
                   this.websitePic=data;
                   this.param.websitePic=res.append
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        onRadio(belongorgName,belongorgCode){
            this.param.belongOrgId=belongorgCode;
            this.param.belongorgName=belongorgName;
        },
        getMainKindsDict(val){
            this.$get(otherUrlD+"/foodCheckInfoController/getMainKindsDict",{
                pMainkCode:val
            }).then((res)=>{
                //console.log(res)
                if(res.result=='success'){
                    this.mainKindRemarkList=res.append
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        
        saveXm(){
            var arr1=[];
            var arr2=[];
            $(".select input[type='checkbox']").each(function(){
                if($(this).is(":checked")){
                    var inputVal=$(this).attr("data-value");
                    var labelVal=$(this).next().html();
                    arr1.push(inputVal);
                    arr2.push(labelVal);
                }
            })
            this.param.manageItem=arr1.join(",")
            this.param.manageName=arr2.join(",");
            
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            Object.keys(this.param).forEach(function(key){
                var keyVal=String(that.param[key])
                //console.log(key+":"+keyVal)
                switch(key){
                    case "storageAddr":
                    return;
                    case "storageDetailAddr":
                    return;
                    case "manageItemRemark":
                    return;
                    case "otherSellItem":
                    return;
                    case "checkNum":
                    return;
                    case "seatNum":
                    return;
                    case "zip":
                    return;
                    case "eMail":
                    return;
                }
                if(key=="website" && that.param.cnetManage==0){
                    return
                }
                if(!keyVal.trim()){
                   // console.log(key+":"+keyVal)
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
            if(this.$validator.errors.has('regNo')){

                 this.$toast({
                    message: this.$validator.errors.first('regNo'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }

            if(this.$validator.errors.has('email')){
                 this.$toast({
                    message: this.$validator.errors.first('email'),
                    position: 'middle',
                    duration: 2000
                });
                return false
            }
            if(this.$validator.errors.has('code')){
                 this.$toast({
                    message: this.$validator.errors.first('code'),
                    position: 'code',
                    duration: 2000
                });
                return 
            }
            
            return true
        },
        
        next(){
            if(!this.isFinished()){
                return
            }
            //console.log(this.param)
            this.insertSpBaseInfo((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.fId++;
                    this.$storage.set("fId",this.fId);
                    this.$router.push("/k")
                }
            });
        },
        stag(){
            if(!this.isFinished()){
                return
            }
            this.insertSpBaseInfo((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        insertSpBaseInfo(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/insertSpBaseInfo",{
                dataJson:this.param,
                bId:this.bId,
                fId:this.fId
            }).then((res)=>{
                //console.log(res);
                callBack(res)
            })
        },
        select(i){
            if(i==1){
                this.show1 = true;
            }else if(i==2){
                this.show2 = true;
            }else if(i==3){
                this.show3 = true;
            }
            
        },
        isShow1(msg){
            //console.log(msg);
            this.show1 = msg.show;
            this.addr = msg.result;
            this.param.addrProvince = msg.province;
            this.param.addrCity = msg.city;
            this.param.addrCounty = msg.county;
        },
        isShow2(msg){
            //console.log(msg);
            this.show2 = msg.show;
            this.fare = msg.result;
            this.param.fareProvince = msg.province;
            this.param.fareCity = msg.city;
            this.param.fareCounty = msg.county;
        },
        isShow3(msg){
            //console.log(msg);
            this.show3 = msg.show;
            this.param.storageAddr =  msg.province+" "+msg.city+" "+msg.county;
            this.province = msg.province;
            this.city = msg.city;
            this.county = msg.county;
        },
        open2(){
            $(document.body).toggleClass("html-body-overflow");
           
            $("#popup2").css({
                right:0
            });
            this.initOne(877);
        },
        initOne(belongorgCode){
            this.$get(otherUrlD+"/dictController/queryBelongOrgByParent",{
                belongorgCode:belongorgCode
            }).then((res)=>{
                console.log(res.append)
                if(res.result=='success'){
                    this.belongListA=res.append
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        open3(i){
            //console.log(3)
            $("#popup3").css({
                right:0
            });
            this.initTwo(this.belongListA[i].belongorgCode);
        },
       
        initTwo(belongorgCode){
            this.$get(otherUrlD+"/dictController/queryBelongOrgByParent",{
                belongorgCode:belongorgCode
            }).then((res)=>{
                console.log(res.append)
                if(res.result=='success'){
                    this.belongListB=res.append
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        close2(){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            });
        },
        close3() {
            
            $("#popup3").css({
                right: "-100%"
            });

        },
        confirm(){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            })
            $("#popup3").css({
                right:"-100%"
            })

        },
    },
    components:{
        'Select':Select
    }
}
</script>
<style scoped>
.width5{
    width: 5rem;
    overflow: hidden
}
.select{
    width: 100%;
    height: 0;
    overflow: hidden;
    background: #cccccc;
    position: fixed;
    bottom: 0;
    left:0;
    transition: all .2s linear;
    transform: translateY(100);
}
.select-top{
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    position: relative;
}
.select-top p{
    width: 100%;
    text-align: center;
    font-size: 1.9rem;
}
.select-top img{
    position: absolute;
    right: 2rem;
    width: 1.5rem;
    height: 1.5rem;
}
.select-bottom{
    width: 95%;
    height: 22.5rem;
    overflow-y: auto;
    margin: 0 auto;
}
.select-bottom p{
    margin-bottom: .5rem;
    font-size: 1.6rem;
}
.select-ul:after{
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.select-ul li{
    position: relative;
    float: left;
    font-size: 1.4rem;
}
.select-ul li input{
    display: none;
}
.select-ul li input[type="checkbox"] + label{
    display: table;
    padding: .5rem 1.5rem;
    background-color: #efefef;
    color: #000;
    border-radius: 0.4rem;
    margin:.5rem 1rem .5rem 0;
    text-align: center;
}
.select-ul li input[type="checkbox"]:checked + label{
    background-color: #3498db;
    color: #ffffff;
}
.select-ul li input:checked +label{
    background-color: #eee;
}

.select-ul li input:checked +label{
    background-color: #eee;
}

#one{
    z-index: 199;
}

</style>
