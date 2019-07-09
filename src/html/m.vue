<template>
    <div>
        <Header2 title="从业人员" :hasMargin="false" to="/c"></Header2>
        <div :class="{cate:true,borderBottom:isHidden}">
                <div class="main flex align-items-center justify-content-space-between">
                <div class="cate-m">从业人员</div>
                <div class="cate-r" @click="add" v-show="!isTrue"><img src="../assets/images/ico5.png" alt=""></div>
            </div>
        </div>
        <div class="bgWhite">
            <ul class="sharehold-ul" >
                <li :class="{'flex':true,'justify-content-space-between':true,'noBottomBorder':index==list.length-1}" v-for="(tmp,index) in list" :key="index"  v-show="list.length>0">
                    <div class="sharehold-li-l">
                        <div class="sharehold-li-top">
                            {{tmp.personName}}<span>（{{tmp.certTypeName}}）</span>
                        </div>
                        <div class="sharehold-li-middle">
                            证件号:{{tmp.certNo}}
                        </div>
                        <div class="sharehold-li-bottom" >
                            职务:{{tmp.positionName}}
                        </div>
                        
                    </div>
                    <div class="sharehold-li-y flex justify-content-space-between" v-show="!isTrue">
                        <div><img src="../assets/images/ico7.png" alt="" @click="edit(index)"></div>
                        <div><img src="../assets/images/ico0.png" alt="" @click="del(index)"></div>
                    </div>
                </li>
                <li v-show="list.length==0">
                    <div class="none" >
                        <div class="height22"></div>
                        <div class="none-tp">
                            <img src="../assets/images/h_1.png" alt="">
                        </div>
                        <div class="none-bt">暂无信息</div>
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
import {Mixins} from '../model/mixin'
export default {
    data() {
        return {
            isHidden:true,
            isTrue:false,
            ZwDictList:[],
            CertTypeDictList:[],
            list:[
               
            ],
            bId:"",
            fId:"",
            fileName:"",
    
        }
    },
    
    created(){
        this.bId=this.$storage.get("bId");
        this.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        Promise.all([
            this.getZwDict(),
            this.getCertTypeDict()      
        ]).then(()=>{
            this.history()
        })
        
    },
    mixins:[Mixins],
    methods: {
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/apply/queryWorkPersonInfoByBId",{
                bId:this.bId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode==200 && res.data){
                    for(var tmpA of res.data){   
                        for(var tmpB of this.CertTypeDictList){
                            if(tmpA.certType==tmpB.certtypeCode){
                                tmpA.certTypeName=tmpB.certtypeName
                            }
                            
                        }
                        for(var tmpC of this.ZwDictList){
                            if(tmpA.position==tmpC.positionCode){
                                tmpA.positionName=tmpC.positionName
                            }
                            
                        }
                    }
                    
                    this.list=res.data?res.data:[];
                    this.fId=res.data[0].fId;
                    
                }else{
                    this.list=[]
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        
        add(){
            this.$router.push({
                path: "/n",
                query: {
                    bId:this.bId,
                    fId:this.fId
                }
            });
        },
        edit(i){
            this.$router.push({
                path: "/n",
                query: {
                    workpersonId:this.list[i].workpersonId,
                    bId:this.bId,
                    fId:this.fId
                }
            });
        },
        del(i){
            this.$messagebox({
                title: '提示',
                message: '确定要删除吗?',
                showCancelButton: true
            }).then(action => {
                console.log(action)
                if(action=="confirm"){
                    this.deleteWorkPerson(this.list[i].workpersonId);
                }
                
            });
           
        },
        deleteWorkPerson(workpersonId){
            this.$get("/apply/deleteWorkPerson",{
                workpersonId:workpersonId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode=='200'){
                    this.history();
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        isFinished(){
            if(this.list.length==0){
                this.$toast({
                    message: '至少添加一名从业人员',
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
                    this.fId++;
                    this.$storage.set("fId",this.fId);
                    this.$router.push("/o");
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
                "fId":this.fId
            }).then((res)=>{
                console.log(res)
                callBack(res)
            
            }).catch(function(msg){
                console.log(msg);
            });
        }
    },
    
}
</script>