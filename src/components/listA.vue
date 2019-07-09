<template>
        <li class="bgWhite">
                <div class="main flex justify-content-space-between align-items-center" >
                    <div class="information-title">
                        <div>{{title}}</div>
                        <div class="information-time">{{time}}</div>
                    </div>
                    <div class="information-state red">{{status[state]}}</div>
                    <div class="information-arrow">
                        <img src="../assets/images/ico1.png" alt="">
                    </div>
                </div>
        </li>
</template>
<script>

export default {
    props:{
        title:{
            type: String,
            required: true
        },
        state:{
            type: Number
        },
        time: {
            type: String,
            default: '/'
        }
    },
    data() {
        return {
            status:[
                "暂存",//0.暂存
                "待签字",//1.待签字(已推送传身份证)
                "待签字",//2.待签字(未推送传身份证)，有回执 查看 签字提交
                "待修改",//3:名称及经营范围待修改，有回执 查看 可修改（具体项）
                "待补正",//4.待补正(暂无使用)
                "待审批",//5.待受理，有回执 查看 不可修改
                "待审批",//6.待审核，有回执 查看 不可修改
                "待审批",//7.待收件，有回执 查看 不可修改
                "待审批",//8.已办结，有回执 查看 不可修改
                "信息填写有误",//9.证件校验未通过，有回执 查看 不可修改
                "受理不通过",//10.失败，有回执 查看 不可修改

                "待审批",//11.待受理，有回执 查看 不可修改
                "审批不通过",//12.受理不通过，有回执 查看 不可修改
                "待签字",//13.待签字盖章，有回执 查看 签字提交
                "待自我评估",//14.待自我评估
                "待审批",//15.待提请核查(暂无使用)
                "待现场核查",//16.待现场核查，有回执 查看 不可修改
                "审批不通过",//17.现场核查不通过，有回执 查看 不可修改
                "待审批",//18.待审批，有回执 查看 不可修改
                "已办结",//19.审批通过，有回执 查看 不可修改
                "审批不通过",//20.审批不通过，有回执 查看 不可修改
                "",
                "环保现场核查中",//22.环保待处理，无回执 查看 不可修改
                "待受理",//23.待受理，无回执 查看 不可修改
                "环保评测不通过",//24.环保评测不通过，有回执 查看 都可修改
                "受理不通过"//25.受理不通过，有回执 查看 都可修改

            ]
        }
    },
    created(){

    },
    methods: {

    }
    
}
</script>