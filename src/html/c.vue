<template>
    <div>
        <Header2 title="新办申请" to="/a"></Header2>
        <ul class="information-ul">
            <li v-for="(tmp,index) in list" :key="tmp.fId" class="bgWhite">
                <div class="main flex justify-content-space-between align-items-center" @click="jump(index)">
                    <div class="information-ico">
                        <img :src="tmp.ico" alt="">
                    </div>
                    <div class="information-title" >{{tmp.fileName}}</div>
                    <div :class="{'information-state':true,'red':tmp.isDone==2}" >{{doneList[tmp.isDone]}}</div>
                    <div class="information-arrow">
                        <img src="../assets/images/ico1.png" alt="">
                    </div>
                </div>
                
            </li>
        </ul>
        <div class="btnA" @click="submit" v-show="!isHidden"><mt-button type="primary" size="large">{{submitName}}</mt-button></div>
        <div class="btnA" @click="back" v-show="isHidden"><mt-button type="default" size="large">{{submitName}}</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            isHidden:false,
            isTrue:false,
            submitName:"提交",
            doneList:["查看","","修改"],
            list:[],
            bId:"",
            fId:"",
            tId:"",
            shopMsg:{},
            mainPageInfo:{},
            status:2
        }
    },
    created(){
        this.mainPageInfo=this.$storage.get("mainPageInfo") || {chilStatus:""};
        //console.log(this.isTrue)
        switch(this.mainPageInfo.chilStatus){
            case 5:
                this.isTrue=true
                break;
            case 6:
                this.isTrue=true
                break;
            case 7:
                this.isTrue=true
            case 8:
                this.isTrue=true
                break;
            case 9:
                this.isTrue=true
                break;
            case 10:
                this.isTrue=true
                break;
            case 11:
                this.isTrue=true
                break;
            case 12:
                this.isTrue=true
                break;
            case 16:
                this.isTrue=true
                break;
            case 17:
                this.isTrue=true
                break;
            case 18:
                this.isTrue=true
                break;
            case 19:
                this.isTrue=true
                break;
            case 20:
                this.isTrue=true
                break;
            case 22:
                this.isTrue=true
                break;
            case 23:
                this.isTrue=true
                break;
        }
        //console.log(this.mainPageInfo.chilStatus)
        if(this.isTrue){
            //console.log(1)
            this.submitName="返回";
            this.isHidden=true;
            this.bId=this.mainPageInfo.bId;
        }else if(this.mainPageInfo.chilStatus=="0" || this.mainPageInfo.chilStatus=="3"){
            //console.log(2)
            this.bId=this.mainPageInfo.bId;
        }else{
           //console.log(3)
            this.bId=this.$storage.get("bId");
        }
        //console.log(this.bId)
        //console.log(this.bId+"111")
        this.fId=this.$storage.get("fId");
        this.shopMsg=this.$storage.get("shopMsg");
        if(this.mainPageInfo){
            this.tId=this.mainPageInfo.tId
        }else{
            this.tId=this.shopMsg.tId
        }
        this.queryExistDataInfo();
    },
    methods: {
        back(){
            this.$router.push("/u");
        },
        jump(index){
            if(this.list[index].isDone==1 && index!=0){
                return
            }else if(this.list[index].isDone==0 && this.mainPageInfo.chilStatus==3){
                return
            }
            this.$storage.set("fId",this.list[index].fId);
            this.$storage.set("bId",this.list[index].bId);
            this.$storage.set("fileName",this.list[index].fileName);
            this.$storage.set("isTrue",this.isTrue);
            this.$router.push({
                path: this.list[index].href,
                query: {
                    isDone: this.list[index].isDone
                }
            });
            
        },
        queryExistDataInfo(){
            this.$get("/apply/queryExistDataInfo",{
                bId:this.bId
            }).then((res)=>{
                console.log(res.data);
                if(res.resultCode==200){       
                    for(var i=0; i<res.data.length;i++){
                        var k=11+i;
                        res.data[i].ico=require("../assets/images/ico"+k+".png");
                    
                    }
                    this.list=res.data;
                    
                }    
            })
        },
        isFinished(){
            if(this.list.length==0){
                this.$toast({
                    message: '暂无列表',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }
            var isFinish=false;
            for(var tmp of this.list){
                if(tmp.isDone!=0){
                    isFinish=true
                }
            }
            if(isFinish){
                this.$toast({
                    message: '请完成所有申请',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }else{
                return true
            }
        },
        submit(){
            if(!this.isFinished()){
                return
            }
            if(this.isTrue){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$post("/individual/pushOneThingData",{
                bId:this.bId,
                status:this.status
                },false,true).then((res)=>{
                    //console.log(res) 
                    this.$indicator.close();
                    this.$messagebox({
                        title: '提示',
                        message: '提交成功，请等待受理！',
                        showCancelButton: true
                    }).then(action => {
                        //console.log(action)
                        if(action=="confirm"){
                            this.$router.push("/a");
                        }
                        
                    });
                
                }).catch(function(msg){
                    console.log(msg);
                });
            }else{
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$get("/apply/generateFoodCheckDocx",{
                    fileName:"1.docx",
                    tempPath:"/home/foodCheckInfo.docx",
                    bId:this.bId
                },false).then((res)=>{
                   // console.log(res);
                    if(res.resultCode==200){
                        this.insertGenerateDoc(res.data)
                    }
                })
            }
            
        },
        insertGenerateDoc(filePath){
            this.$get("/apply/insertGenerateDoc",{
                bId:this.bId,
                fId:this.fId,
                tId:this.tId,
                filePath:filePath
            },false).then((res)=>{
                //console.log(res);
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/a")
                }else{
                    this.$toast({
                        message: res.message,
                        position: 'middle',
                        duration: 2000
                    });
                    this.$indicator.close();
                    
                }  
            })
        }
    },
}
</script>
<style scoped>

</style>
