<template>
    <div>
        <Header2 title="我要开店" :hasMargin="false"></Header2>
        <Banner></Banner>
        <Cate name="新办申请" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="a-ul1">
                <li @click="jump(index)" v-for="(tmp,index) in shopList" :key="tmp.tId">
                    <div class="a-ul1-tp"><img :src="tmp.icoPath" alt=""></div>
                    <div class="a-ul1-bt">{{tmp.tName}}</div>
                </li>
                 <div class="clear"></div>
            </ul>
        </div>
        <Cate name="待办查询" :isShow="isShow" to="/u"></Cate>
        <div class="bgWhite">
            <None :isShow="list.length==0" note="暂无待办事项哦"></None>
            <ul class="information-ul main heightA" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="10">
             <div  @click="jumpB(index)"  v-for="(tmp,index) in list" :key="index" >
                <listA :class="{'noBottomBorder':index==list.length-1}"  :title="tmp.shopName" :state="tmp.chilStatus"  :time="tmp.createTime" ></listA>
             </div>
            </ul>
            <!--显示加载中状态-->
            <p class="loading-box" v-if="isLoad">
                <mt-spinner type="fading-circle" class="loading-more"  color="#ccc"></mt-spinner>加载中...             		                  
            </p>

        </div>
        <!-- 弹出层 -->
        <div class="popup" v-show="isHidden">
            <div class="popup-bj">
                <div class="popup-cont">
                    <div class="popup-tp"><img src="../assets/images/a_5.png" alt=""></div>
                    <div class="popup-nr">
                        <p class="popup-p">
                            {{shopDesc}}
                        </p>
                        <div class="popup-btn flex justify-content-space-between">
                            <button @click="cancel">取消</button>
                            <button @click="next">下一步</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Banner from '../components/banner.vue'
import Cate from '../components/cate.vue'
import listA from '../components/listA.vue'
import None from '../components/none.vue'
export default {
    data() {
        return {
            isShow:true,
            isHidden:false,
            loading:false,
            isLoad:false,
            hasNextPage:false,
            shopList:[],
            shopDesc:"",
            list:[],
            currentIndex:"",
            currentPage:1,
            pageSize:6,
            uId:""
        }
    },
    created(){
        this.uId=sessionStorage.getItem("uId")||"1";
        this.queryTodoList();
        this.queryMainPageInfo(this.currentPage,this.pageSize);
    },
    methods: {
        //新办申请
        queryTodoList(){
            this.$get("/apply/queryTodoList").then((res)=>{
                //console.log(res);
                if(res.resultCode==200){
                    this.shopList=res.data
                }
                
            })
        },
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
                type:"1,2",
                uId:this.uId,
                currentPage:currentPage,
                pageSize:pageSize
            }).then((res)=>{
                //console.log(res.data);
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
                    this.list=this.list.concat(res.data.list);
                    if(!res.data.hasNextPage){
                        this.hasNextPage = true;
                    }
                    
                }    
            })
        },
        jump(i){
            this.isHidden=true;
            this.shopDesc=this.shopList[i].shopDesc;
            this.currentIndex=i;
        },
        jumpB(i){
            if(!this.list[i].url){
                return
            }
            this.$storage.set("mainPageInfo",this.list[i]);
            this.$router.push(this.list[i].url);
        },
        cancel(){
            this.isHidden=false;
        },
        next(){
            this.$storage.set("shopMsg",this.shopList[this.currentIndex])
            this.$router.push("/b")
        }
    },
    components:{
        'Banner':Banner,
        'Cate':Cate,
        'None':None,
        'listA':listA
    }

}
</script>
