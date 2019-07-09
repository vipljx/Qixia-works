<template>
    <div>
        <Header2 title="已办查看" to="/a"></Header2>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" >办理中</mt-tab-item>
            <mt-tab-item id="2">已完成</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <div class="bgWhite">
                <ul class="information-ul main heightA"  
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="false"
                infinite-scroll-distance="10" v-show="list.length>0">
                    <div  @click="jump(index)"  v-for="(tmp,index) in list" :key="index" >
                        <listA :class="{'noBottomBorder':index==list.length-1}" :title="tmp.shopName" :state="tmp.chilStatus" :time="tmp.createTime"></listA>
                    </div>
                </ul>
                <!--显示加载中状态-->
                <p class="loading-box" v-if="isLoad">
                    <mt-spinner type="fading-circle" class="loading-more"  color="#ccc"></mt-spinner>加载中...             		                  
                </p>
                <None :isShow="list.length==0" :note="note"></None>
            </div>
        </mt-tab-container>
    </div>
</template>
<script>
import listA from '../components/listA.vue'
import None from '../components/none.vue'
export default {
    data() {
        return {
            selected:"1",
            list:[],
            loading:false,
            isLoad:false,
            hasNextPage:false,
            type:"1,2",
            currentPage:1,
            pageSize:6,
            uId:"",
            note:"暂无办理中事项哦"
        }
    },
    created() {
        this.uId=sessionStorage.getItem("uId")||"1";
        this.queryMainPageInfo(this.currentPage,this.pageSize);
    },
    mounted(){
        
    },
    methods:{
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
                this.queryMainPageInfo(this.currentPage,this.pageSize);
                this.loading = false;
                this.isLoad=false;
            }, 2000);
        },
       //待办查询
        queryMainPageInfo(currentPage,pageSize){
            this.$get("/apply/queryMainPageInfo",{
                type:this.type,
                uId:this.uId,
                currentPage:currentPage,
                pageSize:pageSize
            }).then((res)=>{
                console.log(res.data.list)
                if(res.resultCode==200){
                    for(var tmp of res.data.list){
                        tmp.chilStatus=tmp.chilStatus?tmp.chilStatus:0
                        switch(tmp.chilStatus){
                            case 0:
                                tmp.url="/c"
                                break;
                            case 1:
                                tmp.url="/w"
                                break;
                            case 2:
                                tmp.url="/w"
                                break;
                            case 3:
                                tmp.url="/w"
                                break;
                            case 5:
                                tmp.url="/w"
                                break;
                            case 6:
                                tmp.url="/w"
                                break;
                            case 7:
                                tmp.url="/w"
                                break;
                            case 8:
                                tmp.url="/w"
                                break;
                            case 9:
                                tmp.url="/w"
                                break;
                            case 10:
                                tmp.url="/w"
                                break;

                            case 11:
                                tmp.url="/w"
                                break;
                            case 12:
                                tmp.url="/w"
                                break;
                            case 13:
                                tmp.url="/w"
                                break;
                            case 14:
                                tmp.url="/x"
                                break;
                            case 16:
                                tmp.url="/w"
                                break;
                            case 17:
                                tmp.url="/w"
                                break;
                            case 18:
                                tmp.url="/w"
                                break; 
                            case 19:
                                tmp.url="/w"
                                break;
                            case 20:
                                tmp.url="/w"
                                break;
                            case 22:
                                tmp.url="/w"
                                break;
                            case 23:
                                tmp.url="/c"
                                break;
                            case 24:
                                tmp.url="/w"
                                break;
                            case 25:
                                tmp.url="/w"
                                break;     
                        }
                        
                    }
                    //console.log(res.data.list)
                    this.list=this.list.concat(res.data.list);
                    if(!res.data.hasNextPage){
                        this.hasNextPage = true;
                    }
                }
                
            })
        },
        //跳转
        jump(i){
            if(!this.list[i].url){
                return
            }
            this.$storage.set("mainPageInfo",this.list[i]);
            this.$router.push(this.list[i].url);
        }
    },
    components:{
        'listA':listA,
        'None':None
    },
    watch:{
        selected:function(val){
            if(val==2){
                this.list=[];
                this.currentPage=1;
                this.hasNextPage=false;
                this.loading=false;
                this.type="3";
                this.note="暂无已完成事项哦";
                this.queryMainPageInfo(this.currentPage,this.pageSize);
            }else{
                this.list=[];
                this.currentPage=1;
                this.hasNextPage=false;
                this.loading=false;
                this.type="1,2";
                this.note="暂无办理中事项哦";
                this.queryMainPageInfo(this.currentPage,this.pageSize);
            }
        }
    }
}
</script>
<style lang="css" type="text/css">
.mint-navbar{
    background: #f2f2f2;
}
.mint-tab-item-label{
    font-size: 1.6rem !important;
}
.mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0;
}
</style>

