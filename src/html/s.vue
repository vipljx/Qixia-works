<template>
    <div>
        <Header2 title="提交材料" to="/r"></Header2>
        <Cate name="材料一" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">文件名称</div>
                    <div class="ul1-li-div2">
                        {{rMsg.desc}}
                    </div>
                </li>
                <li class="flex align-items-center noBottomBorder">
                    <div class="ul1-li-div1 align-self-flex-start flex">上传附件</div>
                </li>
                <li class="flex align-items-center">
                    <ul class="ul1-li-div2-ul2">
                        <li v-for="(tmp,index) in list" :key="index">
                            <img :src="tmp" alt="" class="ul1-li-div2-tp">
                            <img src="../assets/images/delete.png" alt="" class="ul1-li-div2-del" @click="del(index)">
                        </li>
                        <li @click="chooseFile"><img src="../assets/images/j_tp2.jpg" alt="" class="ul1-li-div2-tp"></li>
                    </ul>
                    
                </li>
            </ul>
        </div>
        <my-image-cropper
            v-model="photo"
            :width="widths" 
            :height="heights"  
            :placeholder="'点击上传'"
            :placeholder-font-size="16"
            :accept="'image/*'"
            :prevent-white-space="false"
            :disable-click-to-choose ="true"
            @file-choose="handleCroppaFileChoose"
         v-show="false"></my-image-cropper>
        <div class="btnA" @click="next"><mt-button type="primary" size="large" >提交</mt-button></div>
        <div class="btnA" @click="back"><mt-button type="default" size="large">返回</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>
import Cate from '../components/cate.vue'
import {otherUrlC} from '../../config/env'
export default {
    data() {
        return {
            isShow:true,
            widths:1,
            heights:1,
            arr:[],
            list:[],
            photo:{},
            rMsg:{},
            
        }
    },
    props: ['bId','fId'],
    created(){
        
        this.rMsg=this.$storage.get("rMsg");
        this.history();
    },
    mounted(){

        this.widths=$(".ul1-li-div2-ul2 li:last").width();
        this.heights=$(".ul1-li-div2-ul2 li:last").height();

    },
    methods: {
        history(){
            var that=this;
            this.$get("/apply/queryFileInfoByType",{
                bId:this.bId,
                type:this.rMsg.code
            }).then((res)=>{
                //console.log(res)
                if(res.resultCode==200){
                    this.arr=res.data;
                    this.list=[];
                    for(var tmp of res.data){
                        this.list.push(otherUrlC+"/file/down_file?file=/"+tmp.filesPath)
                    }
                  // console.log(this.arr)
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
            this.$indicator.open({
                text: '图片处理完成，提交中...',
                spinnerType: 'double-bounce'
            })
            this.$post(otherUrlC+"/file/AddCardCallBack2",{
                imgNum:0,
                imgBase64:data
            },false,true).then((res)=>{
               //console.log(res)
                if(res.result=='success'){
                    var obj={};
                    obj.filesName=res.append;
                    obj.filesPath=res.append;
                    obj.filesType=this.rMsg.code;
                    this.arr.push(obj);
                    this.list.push(data);
                    this.$indicator.close();
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        
        next(){
            //console.log(this.arr)
            if(this.arr.length==0){
                this.$toast({
                    message: '请上传附件',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }
            this.saveUploadFileInfo((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/r")
                }
            });
        },
        back(){
            this.$router.push("/r")
        },
        saveUploadFileInfo(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/saveUploadFileInfo",{
                bId:this.bId,
                fId:this.fId,
                code:this.rMsg.code,
                fileData:JSON.stringify(this.arr)
            }).then((res)=>{
                //console.log(res)
                callBack(res)
            }).catch(function(msg){
                console.log(msg);
            });
        },
        del(i){
            this.$messagebox({
                title: '提示',
                message: '确定要删除吗?',
                showCancelButton: true
            }).then(action => {
                //console.log(action)
                if(action=="confirm"){
                    this.list.splice(i,1);
                    this.arr.splice(i,1);
                }
            });
            
        }
    },
    components:{
        'Cate':Cate
    }
}
</script>
<style scoped>

</style>
