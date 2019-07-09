<template>
    <div>
        <Header2 title="委托人信息" to="/c"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main" >
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">委托代理人姓名</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入委托代理人姓名" v-model="param.dbUserName" readonly>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件类型</div>
                    <div class="ul1-li-div2">
                        <select name="" dir="rtl" v-model="param.dbUserSfType">
                            <option value="1791">身份证</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件号码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入证件号码" v-model="param.dbUserSfcode" v-validate="'idCard'" data-vv-name="idCard" readonly>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">手机号码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入手机号码" v-model="param.dbUserMphone" v-validate="'mobile'" data-vv-name="mobile">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">座机号码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入座机号码" v-model="param.dbUserTel" v-validate="'tel'" data-vv-name="tel">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">住址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="" v-model="param.dbUserDomicile">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">邮政编码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="" v-model="param.dbUserCode" v-validate="'code'" data-vv-name="code">
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="write_text" >授权期限</div>
                    <div class="ul1-li-div10">
                       <mt-datetime-picker
                            type="date"
                            ref="pickerA"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="startDateA"
                            @confirm="handleConfirmA"
                           >
                        </mt-datetime-picker>
                        <input type="text" placeholder="" v-model="param.sqStart" class="bottomBorder"  @click="openPickerA" readonly>
                    </div>
                    <div class="ul1-li-div5 flex align-items-center"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="ul1-li-div10">
                        <mt-datetime-picker
                            type="date"
                            ref="pickerB"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="startDateB"
                            @confirm="handleConfirmB"
                           >
                        </mt-datetime-picker>
                        <input type="text" placeholder="" v-model="param.sqEnd" class="bottomBorder"  @click="openPickerB" readonly>
                    </div>
                    <div class="ul1-li-div5 flex align-items-center"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">收件方式</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioB" id="radioH1" type="radio" v-model="param.receiptType" value="1"><label for="radioH1">自取</label>
                            <input name="radioB" id="radioH2" type="radio" v-model="param.receiptType" value="2"><label for="radioH2">EMS</label>
                        </div>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">收件地址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入收件地址" v-model="param.receiptAddr" :disabled="param.receiptType==1">
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
export default {
    data() {
        return {
            isTrue:false,
            startDateA:new Date(),//开始时间
            startDateB:new Date(),//开始时间this.nextYear(new Date())
            param:{
                bId:"",
                fId:"",
                dbUserName:"",//姓名
                dbUserSfType:"1791",//证件类型
                dbUserSfcode:"",//证件号码
                dbUserMphone:"",//手机号码
                dbUserTel:"",//座机号码
                dbUserDomicile:"",//住所
                dbUserCode:"",//邮编
                sqStart:this.formatDate(new Date()),//授权开始时间
                sqEnd:this.formatDate(this.nextYear(new Date())),//授权结束时间
                receiptType:1,// 收件方式
                receiptAddr:"",//邮寄地址
                status:1
            },
            userInfo:{}
        }
    },
    props: ['isDone'],
    created(){
        this.param.bId=this.$storage.get("bId");
        this.param.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        this.userInfo=this.$storage.get("userInfo");
        if(this.userInfo){
            this.param.dbUserName=this.userInfo.name;
            this.param.dbUserSfcode=this.userInfo.card;
            this.param.dbUserMphone=this.userInfo.phone
        }
        // if(this.isDone==0){
        //     this.history();
        // }
        this.history();
    },
    watch: {
        'param.receiptType':function(val){
            if(val==1){
                this.param.receiptAddr="";
            }
        }
    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryClient",{
                bId:this.param.bId
            },false).then((res)=>{
                console.log(res)
                if(res.resultCode==200){
                   Object.keys(that.param).forEach(function (key) {
                        that.param[key] = res.data[key]
                    });
                    this.param.dbId=res.data.dbId;

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        isFinished(){
            var isFinish=false;
            var that=this;
            Object.keys(this.param).forEach(function(key){
                if(that.param.receiptType==1 && key=="receiptAddr"){
                    return
                }
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
            if(this.$validator.errors.has('tel')){

                 this.$toast({
                    message: this.$validator.errors.first('tel'),
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
            //console.log(this.param);
            this.saveClient((res)=>{
                 if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/t")
                }
            });
        },
        //暂存
        stag(){
            if(!this.isFinished()){
                return
            }
            this.saveClient((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        //保存数据
        saveClient(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/saveClient",this.param,false,false).then((res)=>{
                console.log(res)
                callBack(res);
            
            }).catch(function(msg){
                console.log(msg);
            });
        },
        openPickerA() {
            this.$refs.pickerA.open()
        },
        handleConfirmA(data){
            this.param.sqStart=this.formatDate(data)
        },
        openPickerB() {
            this.$refs.pickerB.open()
        },
        handleConfirmB(data){
            this.param.sqEnd=this.formatDate(data)
        },
        formatDate(date){
            var year = date.getFullYear(),
                month = date.getMonth() + 1,//月份是从0开始的
                day = date.getDate(),
                hour = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds();
            if(month<10)month="0"+month;
            if(day<10)day="0"+day;
            var newTime =year+'-'+month+'-'+ day;
            return newTime;
        },
        nextYear(date){
            var year = date.getFullYear()+1,
                month = date.getMonth() + 1,//月份是从0开始的
                day = date.getDate(),
                hour = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds();
            if(month<10)month="0"+month;
            if(day<10)day="0"+day;
            var newTime =year+'-'+month+'-'+ day;
            return new Date(newTime);
        }
    },
}
</script>