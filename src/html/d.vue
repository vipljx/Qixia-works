<template>
    <div>
        <Header2 title="法定代表人信息"></Header2>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">姓名</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center" >
                    <div class="ul1-li-div1">性别</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioA" id="radioA1" type="radio" value="0" ><label for="radioA1" class="main0">男</label>
                            <input name="radioA" id="radioA2" type="radio" value="1" checked><label for="radioA2">女</label>
                        </div>
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">名族</div>
                    <div class="ul1-li-div2">
                        <select name="" >
                            <option>汉族</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件类型</div>
                    <div class="ul1-li-div2">
                        <select name="" >
                            <option>身份证</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">证件号码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">移动电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">固定电话</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">电子邮箱</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">住址</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">邮政编码</div>
                    <div class="ul1-li-div2">
                        <input type="text" placeholder="请输入" >
                    </div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">政治面貌</div>
                    <div class="ul1-li-div2">
                        <select name=""  dir="rtl">
                            <option v-for="tmp in zzmmList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">文化程度</div>
                    <div class="ul1-li-div2">
                        <select name=""  dir="rtl">
                            <option v-for="tmp in whcdList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center">
                    <div class="ul1-li-div1">职业状况</div>
                    <div class="ul1-li-div2">
                        <select name=""  dir="rtl">
                            <option v-for="tmp in zyzkList" :key="tmp">{{tmp}}</option>
                        </select>
                    </div>
                    <div class="ul1-li-div3"><img src="../assets/images/ico2.png" alt=""></div>
                </li>
                <li class="flex align-items-center" >
                    <div class="ul1-li-div1">是否为海外留学生</div>
                    <div class="ul1-li-div7 ">
                        <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioA" id="radioA1" type="radio" value="0" ><label for="radioA1" class="main0">是</label>
                            <input name="radioA" id="radioA2" type="radio" value="1" checked><label for="radioA2">否</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Cate name="法定代表人（经营个体户）" :isShow="!isShow"></Cate>
        <div class="bgWhite">
            <ul class="ul1 main">
                <li class="flex align-items-center" >
                   <div class="radioGroup3  flex justify-content-space-between ">
                            <input name="radioB" id="radioB1" type="radio" value="0" ><label for="radioB1" class="main0">安全管理人员</label>
                            <input name="radioB" id="radioB2" type="radio" value="1" checked><label for="radioB2">从业人员</label>
                    </div>
                </li>
            </ul>
        </div>

         <div class="btnA" ><mt-button type="primary" size="large" @click="next">下一步</mt-button></div>
         <div class="btnA" ><mt-button type="default" size="large">暂存</mt-button></div>
         <div class="heigth20"></div>
    </div>

    
</template>
<script>
import Cate from '../components/cate.vue'
export default {
    data() {
        return {
            isShow:true,
            zzmmList:["群众","共青团员","中共预备党员","中共党员","民革会员","民盟盟员","民建会员","民进会员","农工党党员","致工党党员","九三学社社员","台盟盟员","无党派民主人士"],
            whcdList:["小学","初中","高中","中专","大专","本科","硕士","博士","文盲","其他"],
            zyzkList:["高校毕业生","下岗失业人员","残疾人","退役士兵","农民","高校科技人员","科研院所科技人员","国有失业单位科技人员","国有企业单位科技人员","全日制高校学生","其他"]
        }
    },
    methods: {
        next(){
            this.$router.push("/e")
        }
    },
    components:{
        'Cate':Cate,
    
    }
}
</script>