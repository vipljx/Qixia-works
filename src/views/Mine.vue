<template>
  <div class="bg">
    <Header title="我的" left="" :has-margin="false"></Header>
    <div class="user">
      <img src="../assets/header-img.png" alt="头像">
      <span>{{myName ? myName : '您好'}}</span>
    </div>
    <div class="function-block">
      <div>
        <div class="function"
             v-for="(item,index) in mineList"
             :key="item"
             @click="goFunction(index)">
          <img :src="require('../assets/mine-' + index + '.png')" :alt="item">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="line" @click="myExpressDelivery">
      <img src="../assets/mine-kd.png" alt="快递">
      <span>我的快递</span>
    </div>
    <div class="line border-none" @click="myFastMail">
      <img src="../assets/mine-yj.png" alt="意见">
      <span>意见反馈 </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Mine",
    data() {
      return {
        mineList: ['我的消息', '我的办件', '我的证照', '我的咨询', '我的投诉', '我的评价'],
        myName: ''
      }
    },
    created(){
      this.myName = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).name || '' : ''
    },

    methods: {
      sessionSet(data) {
        sessionStorage.setItem('params', JSON.stringify(data))
      },
      //我的功能
      goFunction(i) {
        let functionName = ['myNews', 'myWork', 'myCard', 'myConsult', 'myComplaint', 'myEvaluate']
        this[functionName[i]]()
      },
      myNews() {
        this.sessionSet({
          title: '我的消息',
          navBar: ['通知消息', '系统消息'],
          wType: 1
        })
        this.$router.push({
          name: 'TwoNavBar'
        })
      },
      myWork() {
        this.$router.push({
          name: 'myWork',
          params: {}
        })
      },
      myCard() {
        this.$router.push({
          name: 'cardPackage'
        })
      },
      myConsult() {
        this.sessionSet({
          title: '我的咨询',
          navBar: ['未回复', '已回复'],
          wType: 2
        })
        this.$router.push({
          name: 'TwoNavBar'
        })
      },
      myComplaint() {
        this.sessionSet({
          title: '我的投诉',
          navBar: ['未回复', '已回复'],
          wType: 3
        })
        this.$router.push({
          name: 'TwoNavBar'
        })
      },
      myEvaluate() {
        this.sessionSet({
          title: '我的评价',
          navBar: ['已评价', '待评价'],
          isEvaluate: true,
          wType: 4
        })
        this.$router.push({
          name: 'TwoNavBar'
        })
      },
      myFastMail() {
        this.$router.push({
          name: 'feedback',
        })
      },
      myExpressDelivery() {
        this.$router.push({
          name: 'expressDelivery',
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    height: 100vh;
  }

  .user {
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: url("../assets/mine-bg.png") no-repeat;
    background-size: cover;
    margin-top: 40px
  }

  .user img {
    width: 60px;
    height: 60px;
    margin: 10px 0;
  }

  .user span {
    font-size: 16px;
    color: #ffffff;
  }

  .function-block {
    height: 148px;
    padding: 0 4vw;
    background-color: #ffffff;
    transform: translate(0, 0);
  }

  .function-block > div {
    width: 92vw;
    position: fixed;
    top: -15px;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 0 5px 10px #f0f0f0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px
  }

  .function {
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0
  }

  .function img {
    height: 30px;
    margin: 0 0 5px;
  }

  .function span {
    font-size: 3.74vw;
    color: #666666;
  }

  .line {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 4vw;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff
  }

  .line img {
    width: 25px;
    margin-right: 8px;
  }

  .line span {
    font-size: 4.27vw;
    color: #666666;
  }

  .border-none {
    border: none;
  }
</style>