<template>
  <div class="bg">
    <Header title="物流信息" to="/expressDelivery"></Header>
    <div class="top">
      <img src="../assets/express.png" alt="">
      <div>
        <span>{{title}}</span>
        <span>{{expressName}}: {{expressNum}}</span>
      </div>
    </div>
    <div class="info">
      <div v-for="(item,index) in expressInfoArr" :key="item.acceptTime">
        <div class="time">{{item.acceptTime}}</div>
        <div class="middle">
          <div class="circle"></div>
          <div class="line" v-if="index !== expressInfoArr.length - 1"></div>
        </div>
        <div class="express-info">{{item.acceptStation}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExpressDeliveryDetail",
    data() {
      return {
        aId: '',
        expressName: '',
        expressNum: '',
        expressInfoArr: '',
        expressFlag: true,
        reason: '',
        title: ''
      }
    },
    created() {
      this.aId = this.$route.params.id
      this.title = this.$route.params.title
      this.loadInfo()
    },
    methods: {
      loadInfo() {
        this.$post('/sta/wlcx', {
          aId: this.aId,
          logisticsType: 2
        }).then((res) => {
          if (res.data.obj.reason === null) {
            this.expressName = 'EMS'//快递名称
            this.expressNum = res.data.obj.logisticCode//快递单号
            this.expressInfoArr = res.data.obj.traces.reverse()
          } else {
            this.expressFlag = false
            this.reason = res.data.obj.reason
          }
        })
      }
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    background-color: #ffffff;
    margin-bottom: 20px;
  }

  .top img {
    width: 13.3vw;
    height: 13.3vw;
    margin: 0 6.7vw 0 12vw;
  }

  .top > div {
    display: flex;
    flex-direction: column;
  }

  .top > div span:first-child {
    display: inline-block;
    width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 17px;
    color: #333333;
  }

  .top > div span:last-child {
    font-size: 15px;
    color: #666666;
  }

  .info {
    padding: 20px 0 20px;
    background-color: #ffffff;
  }

  .info > div {
    display: flex;
  }

  .time {
    flex: 0.29;
    text-align: right;
  }

  .middle {
    flex: 0.08;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .express-info {
    flex: 0.63
  }

  .time, .express-info {
    margin-bottom: 40px;
  }

  .info .line {
    width: 1px;
    flex-grow: 1;
    background-color: #e6e6e6;
  }

  .info .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #e6e6e6;
  }
</style>