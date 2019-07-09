<template>
    <div>
        <Header2 title="食品安全管理制度" to="/c"></Header2>
       
        <div class="bgWhite">
			<ul class="project2-ul">
				<li v-for="(tmp,index) in list" :key="index">
					<div class="project2-li-top">
						<div class="project2-li-left">
							<div class="project2-li-left-top">
								<span>{{index+1}}.&nbsp;</span>{{tmp.ruleNo}}
							</div>
							<div class="project2-li-left-bottom">
								<div >{{tmp.introduce}}</div>
							</div>
						</div>
						<div class="project2-li-right" @click="onRadio(index,tmp.imgPath)">
							<img :src="imgList[tmp.imgPath]" alt="">
						</div>
					</div>
					<div class="project2-li-bottom" v-show="tmp.isShow" @click="open(index)"><img :src="icoList[tmp.icoPath]" alt=""></div>
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
export default {
    data() {
        return {
            isHidden:true,
            isTrue:false,
            bId:"",
            fId:"",
            len:60,//参考字数
            imgList:[require("../assets/images/tick-tp1.png"),require("../assets/images/tick-tp2.png")],
            icoList:[require("../assets/images//tick-ico1.png"),require("../assets/images/tick-ico2.png")],
            list:[],
            param:[]
        }
    },
    created(){
        this.bId=this.$storage.get("bId");
        this.fId=this.$storage.get("fId");
        this.isTrue=this.$storage.get("isTrue");
        this.history();
    },
    props: ['isDone'],
    methods: {
        back(){
            this.$router.push("/c");
        },
        onRadio(index,imgPath){
            if(imgPath==1){
                this.list[index].imgPath=0
            }else{
                this.list[index].imgPath=1;
                var obj={}
                obj.textNo=this.list[index].ruleNo;
                obj.insitiutionContent=this.list[index].insitiutionContent;
                this.param.push(obj)
            }

        },
        open(index){
            if( this.list[index].icoPath==0){
                this.list[index].introduce=this.list[index].ruleText;
                this.list[index].icoPath=1
            }else{
                this.list[index].introduce=this.list[index].ruleText.substring(0,this.len)+"...";
                this.list[index].icoPath=0
            }

        },
        history(){
            var that=this;
            this.$get("/apply/queryRuleInfo",{
                bId:this.bId
            }).then((res)=>{
                console.log(res)
                if(res.resultCode==200 && res.data.qxzwzxOneRuleDicList){     
                    if(res.data.qxzwzxOneRuleDicList.length>0){
                        for(var tmp of res.data.qxzwzxOneRuleDicList){
                            //console.log(tmp.ruleText.length>this.len);
                            if(tmp.ruleText.length>this.len){
                                tmp.isShow=true;
                                tmp.introduce=tmp.ruleText.substring(0,this.len)+"..."
                            }else{
                                tmp.introduce=tmp.ruleText
                            }
                            //console.log(this.isDone)
                            // if(this.isDone==0){
                            //     tmp.imgPath=1;
                            //     var obj={}
                            //     obj.textNo=tmp.ruleNo;
                            //     obj.insitiutionContent=tmp.ruleText;
                            //     this.param.push(obj)
                            // }else{
                            //     tmp.imgPath=0;
                            // }
                            tmp.imgPath=0;
                            tmp.icoPath=0;

                        }
                       this.list=res.data.qxzwzxOneRuleDicList?res.data.qxzwzxOneRuleDicList:[];
                       this.fId=res.data.fId;
                    }
                }
            }).catch(function(msg){
                console.log(msg);
            });
        },
        next(){
            if(this.list.length==0){
                this.$toast({
                    message: '暂无列表',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }

            if(this.param.length!=this.list.length){
                this.$toast({
                    message: '请确认所有食品安全管理制度',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }
            
            this.insertSafeRule((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.fId++;
                    this.$storage.set("fId",this.fId);
                    this.$router.push("/q");
                }
            });
        },
        stag(){
            if(this.list.length==0){
                this.$toast({
                    message: '暂无列表',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }
            // console.log(this.param)
            // console.log(this.list)
            if(this.param.length!=this.list.length){
                this.$toast({
                    message: '请确认所有食品安全管理制度',
                    position: 'middle',
                    duration: 1000
                });
                return false
            }
            
            this.insertSafeRule((res)=>{
                if(res.resultCode==200){
                    this.$indicator.close();
                    this.$router.push("/c")
                }
            });
        },
        insertSafeRule(callBack){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$get("/apply/insertSafeRule",{
                fId:this.fId,
                bId:this.bId,
            }).then((res)=>{
                //console.log(res)
                callBack(res)
            
            }).catch(function(msg){
                console.log(msg);
            });
        }

    }
}
</script>
<style scoped>
.project-ul2{
    width: 100%;
    margin: 0 auto;
}
.project2-ul li{
    border-bottom: 1px solid #f7f7f7;
    padding:10px;

}
.project2-ul li .project2-li-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

}
.project2-ul li .project2-li-left-top{
    height: 2.2rem;
    font-size: 1.5rem;
    margin-bottom: .5rem;
    font-weight: bold;
    overflow: hidden;
}
.project2-ul li .project2-li-left-top span{
    font-size: 1.6rem;

}
.project2-ul li .project2-li-left-top img{
    width: 1.2rem;

}
.project2-li-bottom{
    text-align: center;
}
.project2-li-bottom img{
    width: 20px;
}

.project2-ul li .project2-li-left-bottom{

    font-size: 1.3rem;
}
.project2-li-left{
    width: 85%;
}
.project2-li-right{
    position: absolute;
    height: 100%;
    top:0;
    right: 0;
    display: flex;
    align-items: center;
}

.project2-li-right img{
    width: 2.4rem;


}
</style>
