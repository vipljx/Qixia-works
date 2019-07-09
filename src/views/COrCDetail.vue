<template>
  <div class="bg">
    <Header :title="title[params.type]" to="/TwoNavBar"></Header>
    <div>
      <div class="block">
        <div class="img bg-b" v-if="params.type === 0">询</div>
        <div class="img bg-g" v-else>诉</div>
        <div class="line">
          <p>{{params.type === 0 ? params.info.aContent : params.info.cContent}}</p>
          <div class="line-tp"><img :src="params.type === 0?params.info.picUrl:params.info.cUrl" alt=""></div>
          <span>{{params.type === 0 ? params.info.aTime ? params.info.aTime.split(' ')[0] : '' : params.info.createTime ? params.info.createTime.split(' ')[0] : ''}}</span>
        </div>
      </div>
      <div class="block">
        <div class="img bg-d">答</div>
        <div class="line">
          <p>{{params.type === 0 ? params.info.repMsg : params.info.accContent}}</p>
          <span>{{params.info.accDate ? params.info.accDate.split(' ')[0] : ''}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "COrCDetail",
    data() {
      return {
        title: ['咨询详情', '投诉详情'],
        params: {}
      }
    },
    created() {
      this.params = this.$route.params
      console.log(this.params)
    },
  }
</script>

<style scoped>
  .block {
    display: flex;
    background-color: #ffffff;
    padding: 10px 20px
  }

  .block .img {
    width: 20px;
    height: 20px;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-right: 10px
  }
  .line-tp{
    width: 40%;
    margin-top: .5rem;
  }
  .line-tp img{
    width: 100%;
  }
  .bg-b {
    background-color: #3785ea
  }

  .bg-d {
    background-color: #fdbb57
  }

  .bg-g {
    background-color: #31bc80
  }

  .block .line p {
    font-size: 4.27vw;
    color: #333333;
    overflow: hidden;
    margin: 0
  }

  .block .line span {
    font-size: 3.74vw;
    color: #999999
  }
</style>