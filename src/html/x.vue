
<template>
    <div>
        <Header2 title="自我评估" to="/u"></Header2>
        <div class="bgWhite">
            <div class="cate-name">
                餐饮服务经营许可现场考察表<br>
                （适用特大型、大型、中型餐饮）
            </div>
            <div class="count">
                <div>共计{{detailIdNum}}项</div>
                <div>已填{{filledNum}}项</div>
            </div>
            <div class="project">
                <div class="project-bt"><span>检测项目({{detailIdNum}})</span></div>
                <ul class="project-ul">
                    <li  v-for="(tmpA,i) in listInfo" :key="i">
                        <div class="project-li-top">
                            <div>
                                <span>{{tmpA.listOrder}}.</span>{{tmpA.listName}}
                            </div>
                            <div v-show="tmpA.detailList.length>1"><img src="../assets/images//arrow-top.png" alt=""></div>
                        </div>
                        <div v-for="(tmpB,index) in tmpA.detailList" :key="index">
                            <div class="project-li-order" v-show="tmpA.detailList.length>1">{{charCode[index]}}.</div>
                            <div class="project-li-middle">{{tmpB.detailInfo}}</div>
                            <div class="project-li-bottom">
                                <div>
                                    <img src="../assets/images/star.png" alt="" v-for="item in Number(tmpB.detailType)" :key="item">
                                </div>
                                <div>
                                    <label :for="tmpB.detailId+1" @click.prevent="radioChange(i,index,tmpB.detailOrder,$event)">
                                        <input type="radio" value="1" :id="tmpB.detailId+1" :name="tmpB.detailId"  >
                                        <img :src="tmpB.target==1?radioTp2:radioTp1" alt="">
                                        <span>符合</span>
                                    </label>
                                    <label :for="tmpB.detailId+2" @click.prevent="radioChange(i,index,tmpB.detailOrder)">
                                        <input type="radio" value="3" :id="tmpB.detailId+2" :name="tmpB.detailId"  >
                                        <img :src="tmpB.target==3?radioTp3:radioTp1" alt="">
                                        <span>不符合</span>
                                    </label>
                                    <label :for="tmpB.detailId+3" @click.prevent="radioChange(i,index,tmpB.detailOrder, $event)" v-if="tmpB.isQue==1">
                                        <input type="radio" value="2" :id="tmpB.detailId+3" :name="tmpB.detailId">
                                        <img :src="tmpB.target==2?radioTp3:radioTp1" alt="">
                                        <span>不适用</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </li>

                </ul>
            </div>
        </div>

        <div class="btnA" ><mt-button type="primary" size="large" @click="next">评估</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>
import {otherUrlC} from '../../config/env'
export default {
    data() {
        return {
            mainPageInfo:{},
            infoGjMax:0,
            infoZdMax:0,
            infoZdYbMax:0,
            starNum1:0,
            starNum2:0,
            starNum3:0,
            checkResult:"",
            isConform: [],//检测结果
            detailIdNum: 0,//共计项
            filledNum:0,//已填
            listInfo:[],
            charCode:[],//英文字母排序
            radioTp1: require('../assets/images/radio-tp1.png'),
            radioTp2: require('../assets/images/radio-tp2.png'),
            radioTp3: require('../assets/images/radio-tp3.png'),
        }
    },
    created(){
        this.mainPageInfo=this.$storage.get("mainPageInfo")
        /**
         * 英文排序
         */
        for (var i = 0; i < 25; i++) {
            this.charCode.push(String.fromCharCode((65 + i)).toLocaleLowerCase())
        }
        this.querySuperviseInfo();
    },
    mounted(){
           
            
    },
    methods:{
        radioChange(i,index,order){
               // console.log(this.listInfo[i].detailList);
                this.listInfo[i].detailList[index].target=$(event.currentTarget).children("input").val();
                this.$forceUpdate();
                this.isConform[order-1]=order;
                this.filledNum=0;
                for(var tmp of this.isConform){
                    if(tmp){
                        this.filledNum+=1;
                    }
                }

        },
        querySuperviseInfo(){
            this.$get(otherUrlC+"/basisInformationController/querySuperviseInfo",{
                xkzId:this.mainPageInfo.mainId
            },false).then((res)=>{
               // console.log(res)
                if(res.result=="success"){
                    this.queryCheckCaseList(res.append.infoId)
                }
                
            }).catch(function(msg){
                console.log(msg);
            });
        },
        queryCheckCaseList(infoId){
            this.$get("/individual/queryCheckCaseList",{
                infoId:infoId
            },false).then((res)=>{
                console.log(JSON.parse(res.data.JSON))
                if(res.resultCode==200){
                    var json=JSON.parse(res.data.JSON);
                    this.infoGjMax=json.info.infoGjMax;
                    this.infoZdMax=json.info.infoZdMax;
                    this.infoZdYbMax=json.info.infoZdYbMax;
                    var arr=json.info.listInfo;
                    var listInfoLength = arr.length - 1;
                    var detailListLength = arr[listInfoLength].detailList.length - 1
                    this.detailIdNum = arr[listInfoLength].detailList[detailListLength].detailId - arr[0].detailList[0].detailId + 1
                    this.listInfo=arr;

                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        
       
        next(){

            if(this.filledNum!=this.detailIdNum){
                this.$toast({
                    message: '请完成所有评估',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }else{
                this.starNum1 = 0;
                this.starNum2 = 0;
                this.starNum3 = 0;
                for (var tmp1 of this.listInfo) {
                    for (var tmp2 of tmp1.detailList) {
                        if (tmp2.detailType == 1 && tmp2.target == 3) {
                            this.starNum1++
                        }
                        if (tmp2.detailType == 2 && tmp2.target == 3) {
                            this.starNum2++
                        }
                        if (tmp2.detailType == 3 && tmp2.target == 3) {
                            this.starNum3++
                        }
                    }

                }
                var condition1 = this.starNum3 == this.infoGjMax;
                var condition2 = this.starNum2 <= this.infoZdMax;
                var condition3 = this.starNum1 + this.starNum2 <= this.infoZdMax + this.infoZdYbMax;
                if (condition1 && condition2 && condition3) {
                    this.checkResult = "符合要求";
                    this.updateMainInfo();
                } else {
                    this.checkResult = "不符合要求";
                    this.$messagebox({
                        title: '提示',
                        message: this.checkResult,
                        showCancelButton: true
                    }).then(action => {
                        //console.log(action)
                        if(action=="confirm"){
                            this.$router.push("/u");
                        }
                        
                    });
                }
                
            }
        },
        updateMainInfo(){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get(otherUrlC+"/qsMainInfo/updateMainInfo",{
                state:6,
                xkzId:this.mainPageInfo.mainId
            },false).then((res)=>{
                //console.log(res)
                if(res.result=="success"){
                    this.insertApiResponseInfo()
                }
                
            }).catch(function(msg){
                console.log(msg);
            });
        },
        insertApiResponseInfo(){  
            this.$get("/apply/insertApiResponseInfo",{
                mainId:this.mainPageInfo.mainId,
                status:16,
                processName:"自我评估流程",
                note:"自我评估完成"
            }).then((res)=>{
                //console.log(res)
                if(res.resultCode=="200"){
                    this.$indicator.close();
                    this.$router.push("/u");
                }
                
            }).catch(function(msg){
                console.log(msg);
            });
        },
        
    }
}
</script>