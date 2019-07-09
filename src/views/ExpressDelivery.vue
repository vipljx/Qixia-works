<template>
  <div class="bg">
    <Header title="我的快递"></Header>
    <div class="block">
      <div class="line" v-for="item in list" :key="item.a_id" @click="toDetail(item.a_id,item.s_name)">
        <div>
          <h5>{{item.s_name}}</h5>
          <span>办结时间：{{item.a_time.split(' ')[0]}}</span>
        </div>
        <div class="b">
          <span>查看物流信息</span>
          <img src="../assets/to-right.png" alt="right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExpressDelivery",
    data() {
      return {
        list: []
      }
    },
    created() {
      this.loadList()
    },
    methods: {
      //提示
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      loadList() {
        this.$get('/sta/queryQxzwBusApplysLogistics', {
          uId: sessionStorage.getItem('uId')
        }).then((res) => {
          if (res.resultCode === 200) {
            this.list = res.data
          }
        })
      },
      toDetail(id, title) {
        this.$router.push({
          name: 'expressDeliveryDetail',
          params: {
            id: id,
            title: title
          }
        })
      }
    }
  }
</script>

<style scoped>

  .block {
    background-color: #ffffff;
    padding: 0 20px;
  }

  .line {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
  }

  .block .line:last-child {
    border: none;
  }

  .line img {
    width: 7px;
    height: 14px;
  }

  .b {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #3785ea;
  }

  .b span {
    margin-right: 5px;
  }

  h5 {
    width: 60vw;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h5 + span {
    font-size: 13px;
    color: #999999;
  }
</style>