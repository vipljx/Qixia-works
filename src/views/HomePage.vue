<template>
  <div class="bg">
    <header>
      <input type="text" @click="goSearch" readonly placeholder="请输入您要搜索的关键词">
    </header>
    <img src="../assets/banner.png" alt="banner" class="banner">
    <div class="notice" @click="toPolicy">
      <img src="../assets/horn.png" alt="horn" class="horn">
      <p>{{notice}}</p>
      <img src="../assets/to-right.png" alt="" class="right">
    </div>
    <div class="work-entrance">
      <div v-for="(item,index) in list"
           :key="item"
           @click="goWork(index)">
        <!--        <img src="../assets/work-entrance-1.png" alt="">-->
        <img :src="require('../assets/work-entrance-' + (index + 1) + '.png')" :alt="'work-entrance-' + index">
        <span>{{item}}</span>
      </div>
    </div>
    <!--    <div class="title">我要开店</div>-->
    <div class="open-shops" @click="openShop">
      <img src="../assets/shop-new.png" alt="shop-1">
      <!--      <div>-->
      <!--        <div>-->
      <!--          <div>-->
      <!--            <p>餐饮店</p>-->
      <!--            <button>开店说明</button>-->
      <!--          </div>-->
      <!--          <img src="../assets/shop-2.png" alt="shop-2">-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <div>-->
      <!--            <p>食品店</p>-->
      <!--            <button>开店说明</button>-->
      <!--          </div>-->
      <!--          <img src="../assets/shop-3.png" alt="shop-3">-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="consult-complaint">
      <div @click="goConsult">
        <img src="../assets/consult.png" alt="consult">
        <span>便民咨询</span>
      </div>
      <div @click="goComplaint">
        <img src="../assets/complaint.png" alt="complaint">
        <span>投诉建议</span>
      </div>
    </div>
    <div class="title">大厅指南</div>
    <div class="hall-list">
      <Hall :info="hall"></Hall>
    </div>
    <div class="button-block">
      <mt-button class="button" @click="goHall" type="primary">查看更多实体大厅指南</mt-button>
    </div>
  </div>
</template>

<script>
  import Hall from '@/components/Hall.vue'

  export default {
    name: "HomePage",
    data() {
      return {
        list: ['个人办事', '企业办事', '部门服务', '进度查询'],
        notice: '',
        hall: {}
      }
    },
    components: {
      Hall
    },
    created() {
      this.loadNotice()
      this.loadHall()
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      //政策公告
      toPolicy() {
        let data = {
          title: '咨询公告',
          navBar: ['政策咨询', '通知公告'],
          wType: 5
        }
        sessionStorage.setItem('params', JSON.stringify(data))
        this.$router.push({
          name: 'TwoNavBar'
        })
      },
      //热门消息
      loadNotice() {
        this.$get('/policy/queryPolicyNotic').then((res) => {
          if (res.resultCode === 200) {
            this.notice = res.data.list[0].pTitle
          }
        })
      },
      openShop() {
        this.$router.push("/a")
      },
      //便民咨询
      goConsult() {
        this.$emit('changeTab', 2)
      },
      //投诉
      goComplaint() {
        this.$router.push({
          name: 'complaint'
        })
      },
      //办事
      goWork(i) {
        if (i === 3) {
          this.$router.push({
            name: 'myWork',
            params: {}
          })
        } else {
          this.$emit('changeTab', 1, i)
        }
      },
      //加载大厅指南
      loadHall() {
        this.$get('/policy/queryQxzwWorkHall').then((res) => {
          if (res.resultCode === 200) {
            this.hall = res.data[0]
            sessionStorage.setItem('hall', JSON.stringify(res.data))
          }
        })
      },
      //办事大厅
      goHall() {
        this.$router.push({
          name: 'hallList'
        })
      },
      //搜索
      goSearch() {
        this.$router.push({
          name: 'search',
          params: {
            where: 1
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    padding-bottom: 50px;
  }

  header {
    height: 40px;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    background-color: #ffffff
  }

  header input {
    width: 96vw;
    height: 30px;
    padding: 0 0 0 8vw;
    line-height: 30px;
    box-sizing: border-box;
    background-color: #ebebeb;
    background-image: url("../assets/search.png");
    background-repeat: no-repeat;
    background-size: 3.4vw 3.4vw;
    background-position: 1.33vw center;
    border: none;
    outline: none
  }

  input::-webkit-input-placeholder {
    font-size: 4vw;
    color: #bfbfbf
  }

  .banner {
    width: 100vw
  }

  .notice {
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5.33vw;
    margin-bottom: 8px;
    background-color: #ffffff
  }

  .notice p {
    width: 74vw;
    color: #666666;
    font-size: 3.74vw;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .notice .horn {
    width: 6vw;
  }

  .notice .right {
    width: 7px;
    height: 14px;
  }

  .work-entrance {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 8px;
    background-color: #ffffff
  }

  .work-entrance > div {
    width: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
  }

  .work-entrance img {
    width: 11vw;
  }

  .work-entrance span {
    color: #333333;
    font-size: 3.74vw;
  }

  .title {
    height: 40px;
    line-height: 40px;
    padding: 0 5.33vw;
    color: #333333;
    font-size: 4.27vw;
    font-weight: 600;
    background-color: #ffffff
  }

  .open-shops {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 4.33vw;
    margin-bottom: 8px
  }

  .open-shops > img {
    width: 100%
  }

  .open-shops > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .open-shops > div > div {
    width: 40.5vw;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4.33vw 10vw;
    margin: 10px;
    border-radius: 3px;
  }

  .open-shops > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .open-shops > div > div p {
    font-size: 4.27vw;
    margin: 0;
  }

  .open-shops > div > div button {
    width: 16vw;
    height: 20px;
    text-align: center;
    font-size: 2.67vw;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    outline: none;
    margin-top: 5px;
  }

  .open-shops > div > div:first-child {
    background-color: #e8fcff;
    margin: 0 10px
  }

  .open-shops > div > div:first-child p {
    color: #18a0cb;
  }

  .open-shops > div > div:first-child button {
    background-color: #18a0cb;
  }

  .open-shops > div > div:first-child img {
    width: 14.67vw
  }

  .open-shops > div > div:last-child {
    background-color: #fff5e1;
  }

  .open-shops > div > div:last-child p {
    color: #ff9d00;
  }

  .open-shops > div > div:last-child button {
    background-color: #ff9d00;
  }

  .open-shops > div > div:last-child img {
    width: 11.33vw;
    margin-right: 1.67vw;
  }

  .consult-complaint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .consult-complaint > div {
    width: 49.5vw;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }

  .consult-complaint > div img {
    width: 12vw;
    margin-right: 10px;
  }

  .consult-complaint > div span {
    font-size: 4.27vw;
    color: #333333;
  }

  .hall-list {
    padding: 0 5.33vw;
    background-color: #ffffff;
    border-top: 1px solid #e3e3e3;
  }

  .button-block {
    padding: 10px 0;
  }

  .button {
    font-size: 3.74vw;
  }
</style>