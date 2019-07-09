<template>
    <div>
        <Header2 title="经营者信息" :hasMargin="false" to="/c"></Header2>
        <div :class="{cate:true,borderBottom:isHidden}">
                <div class="main flex align-items-center justify-content-space-between">
                <div class="cate-m">经营者信息</div>
                <div class="cate-r" @click="add" v-show="!isTrue"><img src="../assets/images/ico5.png" alt=""></div>
            </div>
        </div>
        <ul class="sharehold-ul" >
            <li class="flex  justify-content-space-between" v-for="(tmp,index) in list" :key="tmp.ryName"  v-show="list.length>0">
                <div class="sharehold-li-l">
                    <div class="sharehold-li-top">
                        {{tmp.ryName}}<span>（{{ryCountryList[tmp.ryCountry-1]}}）</span>
                    </div>
                    <div class="sharehold-li-middle">
                        身份证:{{tmp.ryCertCode}}
                    </div>
                    <div class="sharehold-li-bottom" >
                        电话:{{tmp.ryPhone}}
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
            <li class="noBottomBorder flex align-items-center justify-content-space-between">
                <div class="sharehold-li-desc">
                    注：若组织形式为家庭经营至少填写2名经营者信息
                </div>
            </li>
        </ul>
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
            isHidden:true,
            isTrue:false,
            orgDaType:"",
            countOrgDaTypeA:0,
            countOrgDaTypeB:0,
            ryCountryList:["经营者","家庭成员"],
            list:[],
            param:{
                bId:"",
                fId:"",
            }
        }
    },
    created(){
            this.param.bId=this.$storage.get("bId");
            this.param.fId=this.$storage.get("fId");
            this.isTrue=this.$storage.get("isTrue");
            this.history();
            this.queryIndiviType();

    },
    methods: {
        queryIndiviType(){
            var that=this;
            this.$get("/individual/queryIndiviType",{
                bId:this.param.bId
            },false).then((res)=>{
                //console.log(res.data)
                if(res.resultCode==200){
                    this.orgDaType=res.data.orgDaType
                }else{
                    this.orgDaType=this.$storage.get("orgDaType");
                }
                //console.log(this.orgDaType)
            }).catch(function(msg){
                console.log(msg);
            });
            
        },
        back(){
            this.$router.push("/c");
        },
        history(){
            var that=this;
            this.$get("/individual/queryPersonnelList",{
                bId:this.param.bId
            },false).then((res)=>{
               console.log(res)
                if(res.resultCode==200){
                    this.param.fId=res.data[0].fId
                    this.list=res.data;
                }else{
                    this.list=[]
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        add(){
            this.$router.push({
                path: "/i",
                query: {
                    bId:this.param.bId,
                    fId:this.param.fId
                }
            });
        },
        edit(i){
            this.$router.push({
                path: "/i",
                query: {
                    ryId:this.list[i].ryId,
                    bId:this.param.bId,
                    fId:this.param.fId
                }
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
                    this.removePersonnelByRyId(this.list[i].ryId)
                }
                
            });
        },
        removePersonnelByRyId(ryId){
            this.$get("/individual/removePersonnelByRyId",{
                ryId:ryId
            },false).then((res)=>{
                console.log(res)
                if(res.resultCode==200){
                    this.$toast({
                        message: '删除成功！',
                        position: 'middle',
                        duration: 2000
                    });
                    this.history();
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        isFinished(){
            
            this.countOrgDaTypeA=0;
            this.countOrgDaTypeB=0;
            for(var tmp of this.list){
                if(tmp.ryCountry==1){
                    this.countOrgDaTypeA+=1;
                }else if(tmp.ryCountry==2){
                    this.countOrgDaTypeB+=1;
                }
            }
            if(this.orgDaType=="家庭经营"){
                if(this.list.length>=2 && this.countOrgDaTypeA==1){
                    return true
                }else{
                    this.$toast({
                        message: '添加一名经营者和至少一名家庭成员！',
                        position: 'middle',
                        duration: 2000
                    });
                    return false
                }
                
            }else if(this.orgDaType=="个人经营"){
                if(this.list.length==1 && this.countOrgDaTypeA==1){
                    return true
                }else{
                    this.$toast({
                        message: '只能添加一名经营者！',
                        position: 'middle',
                        duration: 2000
                    });
                    return false
                }
            }else{
                this.$toast({
                    message: '请先填写个体工商信息',
                    position: 'middle',
                    duration: 2000
                });
                return false
            }
        },
        next(){
            if(!this.isFinished()){
                return
            }
            //console.log(this.param.fId)
            this.updateFileStatusByFId((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.param.fId++;
                    this.$storage.set("fId",this.param.fId);
                    this.$router.push("/j");
                }
            });
            
        },
        stag(){
        
            if(!this.isFinished()){
                return
            }
            
            this.updateFileStatusByFId((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
            
        },
        updateFileStatusByFId(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post2("/individual/updateFileStatusByFId",{
                fId:this.param.fId
            },false,false).then((res)=>{
                console.log(res)
                callBack(res)
            
            }).catch(function(msg){
                console.log(msg);
            });
        }
        
    },
}
</script>