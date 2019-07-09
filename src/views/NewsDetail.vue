<template>
  <div class="bg">
    <Header :title="params.type ? '公告详情' : '消息详情'" :to="params.where ? '/' : '/TwoNavBar'"></Header>
    <div class="content">
      <h5>{{params.title}}</h5>
      <p>{{params.time}}</p>
      <div v-html="params.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewsDetail",
    data() {
      return {
        params: {}
      }
    },
    created() {
      this.params = this.$route.params
    }
  }
</script>

<style scoped>
  .content {
    padding: 10px 20px;
    background-color: #ffffff;
  }

  .content > h5 {
    font-size: 17px;
    color: #333333;
    text-align: center;
    margin: 0;
  }

  .content > p {
    font-size: 13px;
    color: #999999;
    text-align: center;
  }

  .content > div {
    font-size: 15px;
    color: #666666;
  }

</style>