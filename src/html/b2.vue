<template>
    <div>
        <Header2 title="暂存待办" :hasMargin="false" to="/b"></Header2>
     
        <div class="bgWhite">
            <None :isShow="!isShow" note="暂无待办事项哦"></None>
            <ul class="information-ul main heightA" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="10">
                <li  :class="{'noBottomBorder':index==list.length-1}" v-for="(tmp,index) in list" :key="index">
                        <div class="main flex justify-content-space-between align-items-center" >
                            <div class="information-title">
                                <div>{{tmp.shopName}}</div>
                                <div class="information-time">{{tmp.time}}</div>
                            </div>
                            <div class="information-state edit" @click="edit(index)">修改</div>
                            <div class="information-state red" @click="del(index)">删除</div>                         
                        </div>
                </li>
            </ul>
            <!--显示加载中状态-->
            <p class="loading-box" v-if="isLoad">
                <mt-spinner type="fading-circle" class="loading-more"  color="#ccc"></mt-spinner>加载中...             		                  
            </p>

        </div>
        <div class="btnA" @click="next"><mt-button type="primary" size="large">立即申请</mt-button></div>
    </div>
</template>
<script>

import None from '../components/none.vue'
export default {
    data() {
        return {
            isShow:true,
            loading:false,
            isLoad:false,
            hasNextPage:false,
            list:[],
            shopMsg:{},
            currentIndex:"",
            currentPage:1,
            pageSize:6,
            uId:""
        }
    },
    created(){
        this.uId=sessionStorage.getItem("uId")||"1";
        this.shopMsg=this.$storage.get("shopMsg");
        this.queryExistMainData(this.currentPage,this.pageSize);
    },
    methods: {
    
        loadMore() {
            if(this.hasNextPage){
                this.$toast('亲，已经到底了哦！');
                this.loading = true;
                this.isLoad=false;
                return;
            }
            this.loading = true;
            this.isLoad=true;
            setTimeout(() => {
                this.currentPage+=1;
                this.queryExistMainData(this.currentPage,this.pageSize);
                this.loading = false;
                this.isLoad=false;
            }, 2000);
        },
        //暂存查询
        queryExistMainData(currentPage,pageSize){
            this.$get("/apply/queryExistMainData",{
                uId:this.uId,
                currentPage:currentPage,
                pageSize:pageSize,
                tType:this.shopMsg.tId
            }).then((res)=>{
                console.log(res.data);
                if(res.resultCode==200){
                    this.list=this.list.concat(res.data.list);
                    if(!res.data.hasNextPage){
                        this.hasNextPage = true;
                    }
                    
                }    
            })
        },
        deleteUnableData(bId){
            this.$get("/apply/deleteUnableData",{
                bId:bId,
            }).then((res)=>{
                if(res.resultCode==200){
                    this.$toast("删除成功！")
                    this.queryExistMainData(this.currentPage,this.pageSize)
                }    
            })
        },
        //新建主表
        createMainInfo(callback){
            this.$get("/apply/createMainInfo",{
                uId:this.uId,
                tId:this.shopMsg.tId
            }).then((res)=>{
                //console.log(res);
                callback(res)
            })
        },
        edit(i){
            this.$storage.remove("mainPageInfo");
            this.$storage.set("bId",this.list[i].bId);
            this.$router.push("/c");
        },
        del(i){
            this.$messagebox({
                title: '提示',
                message: '确定删除此暂存待办吗?',
                showConfirmButton:true,
                showCancelButton: true
            }).then(action => {
                if(action=="confirm"){
                    this.deleteUnableData(this.list[i].bId)
                }
            });
        },
        next(){
            this.createMainInfo(res=>{
                console.log(res)
                if(res.resultCode==200){
                    this.$storage.remove("mainPageInfo");
                    this.$storage.set("bId",res.data);
                    this.$router.push("/c");
                }else{
                    this.$toast("新建主表信息失败！")
                }
                
            });
        }
    },
    components:{
        'None':None
    }

}
</script>
<style scoped>


</style>
