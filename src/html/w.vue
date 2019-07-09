<template>
    <div>
        <Header2 :title="status[this.mainPageInfo.chilStatus]" to="/u"></Header2>
        <div class="main">
            <div class="cate flex align-items-center justify-content-space-between">
                <div class="cate-ico2"><img src="../assets/images/ico30.png" alt=""></div>
                <ul class="cate-nr flex1">
                    <li class=" flex align-items-center justify-content-space-between">
                        <div class="cate-left flex1">办件名称</div>
                        <div >
                            {{typeList[process_type-1]}}
                        </div>
                    </li>
                     <li class=" flex align-items-center justify-content-space-between">
                        <div class="cate-left flex1">办件环节</div>
                        <div class="red">
                            {{status[this.mainPageInfo.chilStatus]}}
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div class="bgWhite">
            <div class="main w-cont">
                <p class="w-top" v-for="(tmp,index) of noteList" :key="index">
                    {{tmp.note}}
                </p>
                <div class="w-bottom">
                    责任单位：{{deptName}}<br>
                    日期：{{createTime}}
                </div>
            </div>
        </div>
        <div class="btnA" @click="next"><mt-button type="primary" size="large" >{{btnName}}</mt-button></div>
        <div class="btnA"  v-show="false"><mt-button type="default" size="large" >{{btnName}}</mt-button></div>
        <!-- <div class="btnA" ><mt-button type="default" size="large">查看申请信息</mt-button></div> -->
        <div class="heigth20"></div>
    </div>
</template>
<script>
import {baseUrl,otherUrlC} from '../../config/env'
export default {
    data() {
        return {
            isHidden:false,
            btnName:"",
            status:[
                "暂存",//0.暂存
                "待签字",//1.待签字(已推送传身份证)
                "待签字",//2.待签字(未推送传身份证)，有回执 查看 签字提交
                "待修改",//3:名称及经营范围待修改，有回执 查看 可修改（具体项）
                "待补正",//4.待补正(暂无使用)
                "待审批",//5.待受理，有回执 查看 不可修改
                "待审批",//6.待审核，有回执 查看 不可修改
                "待审批",//7.待收件，有回执 查看 不可修改
                "待审批",//8.已办结，有回执 查看 不可修改
                "信息填写有误",//9.证件校验未通过，有回执 查看 不可修改
                "受理不通过",//10.失败，有回执 查看 不可修改

                "待审批",//11.待受理，有回执 查看 不可修改
                "审批不通过",//12.受理不通过，有回执 查看 不可修改
                "待签字",//13.待签字盖章，有回执 查看 签字提交
                "待自我评估",//14.待自我评估
                "待审批",//15.待提请核查(暂无使用)
                "待现场核查",//16.待现场核查，有回执 查看 不可修改
                "审批不通过",//17.现场核查不通过，有回执 查看 不可修改
                "待审批",//18.待审批，有回执 查看 不可修改
                "已办结",//19.审批通过，有回执 查看 不可修改
                "审批不通过",//20.审批不通过，有回执 查看 不可修改
                "",
                "环保现场核查中",//22.环保待处理，无回执 查看 不可修改
                "待受理",//23.待受理，无回执 查看 不可修改
                "环保评测不通过",//24.环保评测不通过，有回执 查看 都可修改
                "受理不通过"//25.受理不通过，有回执 查看 都可修改
            ],
            mainPageInfo:{},
            noteList:[],
            process_type:"",
            createTime:"",
            deptName:"",
            typeList:["营业执照","食品经营许可","环保评测"],
            userInfo:{}
        }
    },
    created(){
        this.mainPageInfo=this.$storage.get("mainPageInfo");
        this.userInfo=this.$storage.get("userInfo");
        this.queryApiResponse();
        //this.queryUser();
        if(this.mainPageInfo.chilStatus==1 || this.mainPageInfo.chilStatus==2 || this.mainPageInfo.chilStatus==13){
            this.btnName="签字";
        }else{
            this.btnName="查看";
        }
    },
    methods: {
        queryApiResponse(){
            this.$get("/individual/queryApiResponse",{
                bId:this.mainPageInfo.bId
            },false).then((res)=>{
                console.log(res)
                if(res.resultCode==200){
                    this.noteList=res.data;
                    this.process_type=res.data[0].processType;
                    this.createTime=res.data[0].createTime;
                    this.deptName=res.data[0].deptName;
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryUser(){
            this.$get("/individual/queryUser",{
                uId:this.mainPageInfo.uId
            },false).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                    this.isHidden=true;
                    this.userInfo=res.data;
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        next(){
            if(this.mainPageInfo.chilStatus==2){
                this.$indicator.open({
                    text: '加载中1...',
                    spinnerType: 'fading-circle'
                });
                this.uploadCard();
            }else if(this.mainPageInfo.chilStatus==1){
                this.getFaces()
            }else if(this.mainPageInfo.chilStatus==13){
                this.toSignature();    
            }else{
                this.$router.push("/c");
            }
            
        },

        uploadCard(){
            this.$post2("/individual/uploadCard",{
                bId:this.mainPageInfo.bId,
                uId:this.mainPageInfo.uId
            },false,false).then((res)=>{
               // console.log(res)
                if(res.resultCode==200){
                    this.getFaces()
                }
            }).catch(function(msg){
                console.log(msg);
            });
          
        },
        getFaces(){
			var name = this.userInfo.name;
			var cardNo = this.userInfo.card;
            var corpId = this.mainPageInfo.mainId;
            var corpName=this.mainPageInfo.shopName;
            var callBack = baseUrl+"/dist/u?isLogin=true"; 
            window.location.href = 'https://mynjhtml.zhengebang.com/process.html?name='+name+'&cardNo='+cardNo+'&corpId='+corpId+'&corpName='+corpName+'&callBack='+callBack;
            this.$indicator.close();
        },
        toSignature(){
            var xkzId = this.mainPageInfo.mainId;
            var callBack = baseUrl+"/dist/u?isLogin=true"; 
            window.location.href = otherUrlC+'/qsAgencyPersons/toSignature?xkzId='+xkzId+'&corpType=2'+'&callBack='+callBack;
        }
    },
}
</script>