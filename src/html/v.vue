<template>
    <div>
        <Header2 title="用户签字盖章" to="/u"></Header2>
        <ul class="information-ul">
            <li v-for="(tmp) in list" :key="tmp.title" class="bgWhite">
                <div class="main flex justify-content-space-between align-items-center">
                    <div class="information-title" >{{tmp.title}}</div>
                    <div class="information-button buttonC" @click="sign">签字</div>
                </div>    
            </li>
        </ul>
        <div class="btnA" ><mt-button type="primary" size="large" @click="next">签字完成</mt-button></div>
        <div class="heigth20"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow:true,
            list:[
                {
                    title:"《个体工商信息》申请",
                    state:0,
                },
                {
                    title:"《法定代表人情况登记表》申请",
                    state:1,
                },
                {
                    title:"《食品经营许可证》封面",
                    state:1,
                }
                
            ]
        }
    },
    methods: {
        next(){},
        sign(){
            this.$router.push("/w")
        }
    },
}
</script>