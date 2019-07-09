<template>
    <div>
        <Header2 :title="shopMsg.tName+'办事指南'" :hasMargin="shopMsg.tId==1" to="/a"></Header2>
        <ul class="ul1 main" v-if="shopMsg.tId==2">
            <li class="flex align-items-center noBottomBorder justify-content-flex-end">
                <div class="t-guide"><img src="../assets/images/z-ico.png" alt=""><span class="t-guide-bt" @click="open3">排水许可指南</span></div>
            </li>
        </ul>
        <ul class="b-ul1">
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main b-ul1-borderBottom ">
                    <div class="b-ul1-bt">受理条件</div>
                    <div class="b-ul1-ico  hidden"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico " ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main ">
                   {{info.todoCondition}}
                </div>
            </li>
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main ">
                    <div class="b-ul1-bt">办理材料</div>
                    <div class="b-ul1-ico"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico hidden" ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main hidden">
                  <p class="b-ul1-bottom-p" v-for="tmp in info.qxzwzxOneFileIndexList" :key="tmp.fileRelId">{{tmp.mName}}</p>
                </div>
            </li>
            
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main ">
                    <div class="b-ul1-bt">办理流程</div>
                    <div class="b-ul1-ico"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico hidden" ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main hidden">
                  <img :src="info.todoProcess" alt="">
                </div>
            </li>
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main ">
                    <div class="b-ul1-bt">收费情况</div>
                    <div class="b-ul1-ico"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico hidden" ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main hidden">
                  {{info.payInfo}}
                </div>
            </li>
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main ">
                    <div class="b-ul1-bt">办结时限</div>
                    <div class="b-ul1-ico"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico hidden" ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main hidden">
                  {{info.endDate}}
                </div>
            </li>
            <li class="bgWhite">
                <div @click="onClick" class="b-ul1-top flex justify-content-space-between align-items-center main ">
                    <div class="b-ul1-bt">咨询电话</div>
                    <div class="b-ul1-ico"><img src="../assets/images/ico2.png" alt=""></div>
                    <div class="b-ul1-ico hidden" ><img src="../assets/images/ico3.png" alt=""></div>
                </div>
                <div class="b-ul1-bottom main hidden">
                  {{info.tel}}
                </div>
            </li>
           
        </ul>
        <div class="btnA" @click="jump"><mt-button type="primary" size="large">在线办理</mt-button></div>

        <!-- 指南 -->
        <div id="popup3" class="weui-popup-container">
            <div class="heigth10"></div>
            <div class="cont">
                <ul class="y-ul popup-ul popup-ul2">
                    <li class="y-li">
                        <div class="y-cate">
                            一、办理条件：
                        </div>
                        <p class="y-p">
                        排水户水质必须符合“污水排入城市下水道水质标准”（CJ343-2010）和“污水综合排放标准”（GB8978-1996）以及地方有关标准。</p>
                    
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                            二、申报资料：
                        </div>
                        <p class="y-p">
                        排水许可申请证:<br>
                        1、	有资质的检测机构出具的水质检测报告（南京市排水检测站电话83468286）<br>
                        2、	本单位的平面布置图、排水管网图以及与城市排水系统连接的施工图；<br>
                        3、	建设工程排水户办理排水许可申请，还应当提交建设项目立项批文、建设工程规划设计要点和建设工程规划许可证及附图。
                        </p>
                        
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        三、办理程序：
                        </div>
                        <p class="y-p">
                        4、	栖霞区城市管理局依法进行审查，在20个工作日内做出行政许可决定；<br>
                        5、	发放排水许可证或临时排水许可证。
                        </p>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        四、收费：<span>无</span>
                        </div>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        五、法定时限：<span>20个工作日</span>
                        </div>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        六、承诺时限：<span>10个工作日</span>
                        </div>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        七、受理地点：<span>仙林大学城文成路1号</span>
                        </div>
                    </li>
                    <li class="y-li">
                        <div class="y-cate">
                        八、联系电话：<span>85328072、85580268</span>
                        </div>
                    </li>
                </ul>
                <div class="popup-button2">
                   <div class="btnA" @click="close3"><mt-button type="default" size="large">返回</mt-button></div>
                   <div class="heigth20"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            shopMsg:{},
            info:{},
            currentPage:1,
            pageSize:999,
            uId:""
        }
    },
    created(){
        this.uId=sessionStorage.getItem("uId")||"1";
        this.shopMsg=this.$storage.get("shopMsg");
        this.queryHelpInfo();
    },
    mounted() {
        var height2=$(".weui-popup-container").height()-$(".popup-button2").height();
        $(".popup-ul2").css({
            height:height2
        });
    },
    methods: {
        
        queryHelpInfo(){
            this.$get("/apply/queryHelpInfo",{
                tId:this.shopMsg.tId
            }).then((res)=>{
                console.log(res);
                if(res.resultCode==200){
                    this.info=res.data
                    
                }    
            })
        },
        onClick(){
            var target=$(event.currentTarget);
            target.toggleClass("b-ul1-borderBottom")
            target.next().toggleClass("hidden")
            target.children().last().toggleClass("hidden")
            target.children().last().prev().toggleClass("hidden")
        },
        //暂存查询
        queryExistMainData(currentPage,pageSize,callback){
            this.$get("/apply/queryExistMainData",{
                uId:this.uId,
                currentPage:currentPage,
                pageSize:pageSize,
                tType:this.shopMsg.tId
            }).then((res)=>{
                //console.log(res.data);
                if(res.resultCode==200){
                    callback(res.data.list.length)
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
        jump(){
            this.queryExistMainData(this.currentPage,this.pageSize,res=>{
                console.log(res)
                if(res>0){
                    this.$router.push("/b2")
                }else{
                    this.createMainInfo(res=>{
                        if(res.resultCode==200){
                            this.$storage.remove("mainPageInfo")
                            this.$storage.set("bId",res.data);
                            this.$router.push("/c");
                        }else{
                            this.$toast("新建主表信息失败！")
                        }
                        
                    });
                    
                    
                }
            });
        },
        open3(){
            
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:0
            });

        },
        close3(){
            $(document.body).toggleClass("html-body-overflow");
            $("#popup3").css({
                right:"-100%"
            });
        }
    },
}
</script>
<style scoped>

</style>
