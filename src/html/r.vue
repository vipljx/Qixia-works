<template>
    <div>
        <Header2 title="提交材料" to="/c"></Header2>
        <Cate name="材料上传" :isShow="!isShow"></Cate>
        <ul class="information-ul">
            <li v-for="(tmp,index) in list" :key="tmp.title" class="bgWhite">
                <div class="main flex justify-content-space-between align-items-center">
                    <div class="information-title" >{{tmp.desc}}</div>
                    <div class="information-button buttonA"  @click="jump(index)" v-show="tmp.doneFlag">查看</div>
                    <div class="information-button buttonB"  @click="jump(index)" v-show="!tmp.doneFlag">上传</div>
                </div>
                
            </li>
        </ul>
        <div class="btnA" @click="next" v-show="!isTrue"><mt-button type="primary" size="large" >填报完成</mt-button></div>
        <div class="btnA" @click="stag" v-show="!isTrue"><mt-button type="default" size="large">暂存</mt-button></div>
        <div class="btnA" @click="back" v-show="isTrue"><mt-button type="default" size="large">返回</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>
import Cate from '../components/cate.vue'
export default {
    data() {
        return {
            isShow:true,
            bId:"",
            fId:"",
            list:[ ]
        }
    },
    created(){
        this.bId=this.$storage.get("bId");
        this.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        this.history();
    },
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/apply/queryUploadFileInfo",{
                bId:this.bId,
            }).then((res)=>{
                console.log(res)
                if(res.resultCode==200){
                   this.list=res.data
                }
            }).catch(function(msg){
                console.log(msg);
            });
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
                if(!tmp.doneFlag){
                    isFinish=true;
                }
            }
            if(isFinish){
                this.$toast({
                    message: '请完成全部材料上传！',
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
            this.updateMainInfo((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        stag(){
            if(!this.isFinished()){
                return
            }
            this.updateMainInfo((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        updateMainInfo(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/updateMainInfo",{
                fId:this.fId
            }).then((res)=>{
                console.log(res);
                callBack(res)
            })
        },
        jump(index){
           // console.log(this.$storage)
            this.$storage.set("rMsg",this.list[index]);
            this.$router.push({
                path: "/s",
                query: {
                    bId:this.bId,
                    fId:this.fId
                }
            });
        }
    },
    components:{
        'Cate':Cate
    }
}
</script>