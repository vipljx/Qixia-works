<template>
    <div>
        <Header2 title="食品安全设施设备" to="/c"></Header2>
        <div v-for="(tmp,index) in list" :key="index">
            <div :class="{cate:true,borderBottom:isHidden}">
                <div class="main flex align-items-center justify-content-space-between" v-show="!isTrue">
                    <div class="cate-m">新增设施设备{{dx(index+1)}}</div>
                    <div class="cate-r" @click="del(index)" v-show="index!=0" ><img src="../assets/images/ico0.png" alt=""></div>
                </div>
                <div class="main flex align-items-center justify-content-space-between" v-show="isTrue">
                    <div class="cate-m">新增设施设备{{dx(index+1)}}</div>
                </div>
            </div>
            <div class="bgWhite">
                <ul class="ul1 main">
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">设备名称</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请选择" readonly @click="open2(index)" v-model="tmp.facilityName">
                        </div>
                        <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""  ></div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">数量</div>
                        <div class="ul1-li-div2">
                            <input type="number" placeholder="请输入" v-model="tmp.facilityNum">
                        </div>
                        
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1">位置</div>
                        <div class="ul1-li-div2">
                            <input type="text" placeholder="请输入"   v-model="tmp.place">
                        </div>
                    </li>
                    <li class="flex align-items-center">
                        <div class="ul1-li-div1 align-self-flex-start flex">备注</div>
                        <div class="ul1-li-div2">
                             <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注" v-model="tmp.remark" ></textarea>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bgWhite" v-show="!isTrue">
            <ul class="ul1 main">
                <li class="flex align-items-center topBorder" >
                    <button class="ul1-li-button" @click="add">继续新增</button>
                </li>
            </ul>
        </div>
        <div class="btnA" @click="next" v-show="!isTrue"><mt-button type="primary" size="large" >下一步</mt-button></div>
        <div class="btnA" @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA" @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>
        <div class="heigth20"></div>


         <!-- 设备名称弹出层 -->
        <div id="popup2" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul2">
                    <li @click="open3(tmp.equipmentCode)" v-for="(tmp,index) in pEquipmentA" :key="index">{{tmp.equipmentName}}</li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA" @click="close2"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

        <div id="popup3" class="weui-popup-container">
            <div class="cont">
                <ul class="popup-ul popup-ul2">
                    <li @click="confirm(index)" v-for="(tmp,index) in pEquipmentB" :key="index">{{tmp.equipmentName}}</li>
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
            isHidden:true,
            isTrue:false,
            pEquipmentA:[],
            pEquipmentB:[],
            currentIndex:"",
            bId:"",
            fId:"",
            fileName:"",
            list:[
                {   
                    deviceId:"",//设施设备主键
                    facilityName:"",//设备名称
                    facilityNum:"",//数量
                    place:"",//位置
                    remark:""//备注
                }
            ]
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
        this.history();
    },
    mounted(){
        var height2=$(".weui-popup-container").height()-$(".popup-button2").height();
        $(".popup-ul2").css({
            height:height2
        });
        $("input[readonly]").focus(()=>{
            document.activeElement.blur()
        });
    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/apply/querySafeDeviceInfoByBId",{
                bId:this.bId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode==200 && res.data){     
                    if(res.data.length>0){
                       this.list=res.data?res.data:[];
                       this.fId=res.data[0].fId;
                    }
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        open2(i){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:0
            });
            this.currentIndex=i;
            this.initListA(-1);
        },
        initListA(pEquipmentCode){
            this.$get("/dictController/selectEquipmentByPCode",{
                pEquipmentCode:pEquipmentCode
            },4).then((res)=>{
                //console.log(res)
                if(res.result=='success'){
                    this.pEquipmentA=res.append
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        open3(pEquipmentCode){
            //console.log(3)
            $("#popup3").css({
                right:0
            });
            this.initListB(pEquipmentCode);
        },
        initListB(pEquipmentCode){
            this.$get("/dictController/selectEquipmentByPCode",{
                pEquipmentCode:pEquipmentCode
            },4).then((res)=>{
                //console.log(res)
                if(res.result=='success'){
                    this.pEquipmentB=res.append
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
        confirm(i){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup2").css({
                right:"-100%"
            })
            $("#popup3").css({
                right:"-100%"
            })
            console.log(this.pEquipmentB[i])
            
            this.list[this.currentIndex].facilityName=this.pEquipmentB[i].equipmentName;
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            for(var tmp of this.list){
                Object.keys(tmp).forEach(function(key){
                    var keyVal=String(tmp[key])
                    //console.log(key+":"+keyVal)
                    if(!keyVal.trim() && key!='deviceId'){
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
            }else{
                
                return true
            }
        },
        next(){
            if(!this.isFinished()){
                return
            }
            //console.log(this.list);
            this.insertSafeDevice((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.fId++;
                    this.$storage.set("fId",this.fId);
                    this.$router.push("/p")
                }
            });

        },
        stag(){
            if(!this.isFinished()){
                return
            }
            this.insertSafeDevice((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        insertSafeDevice(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/insertSafeDevice",{
                fId:this.fId,
                bId:this.bId,
                safeDeviceData:JSON.stringify(this.list)
            }).then((res)=>{
                //console.log(res)
                callBack(res)
            }).catch(function(msg){
                console.log(msg);
            });
        },
        add(){
            var obj= {
                deviceId:"",//设施设备主键
                facilityName:"",//设备名称
                facilityNum:"",//数量
                place:"",//位置
                remark:""//备注
            }
            this.list.push(obj)
        },
        del(i){
            this.$messagebox({
                title: '提示',
                message: '确定要删除吗?',
                showCancelButton: true
            }).then(action => {
                console.log(action)
                if(action=="confirm"){
                    if(this.list[i].deviceId){
                        this.deleteSafeDevice(this.list[i].deviceId);
                    }else{
                        this.list.splice(i,1)
                    }
                }
                
            });
           
            
        },
        deleteSafeDevice(deviceId){
            this.$get("/apply/deleteSafeDevice",{
                deviceId:deviceId,
            }).then((res)=>{
                if(res.resultCode=='200'){
                    this.history();
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
    },
    computed: {
        dx(n){
            return function(n){
                var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
                var s = '';
                n = '' + n; // 数字转为字符串
                for (var i = 0; i < n.length; i++) {
                    s += cnum[parseInt(n.charAt(i))];
                }
                if (s.length == 2) { // 两位数的时候
                    // 如果个位数是0的时候，令改成十
                    if (s.charAt(1) == cnum[0]) {
                        s = s.charAt(0) + cnum[10];
                        // 如果是一十改成十
                        if (s == cnum[1] + cnum[10]) {
                            s = cnum[10]
                        }
                    } else if (s.charAt(0) == cnum[1]) {
                        // 如果十位数是一的话改成十
                        s = cnum[10] + s.charAt(1);
                    }
                }
                return s;
            }
        }
    }
}
</script>
