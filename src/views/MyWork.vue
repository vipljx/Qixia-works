<template>
  <div class="bg">
    <Header title="我的办件"></Header>
    <div class="block"
         v-for="(item,index) in list"
         :key="item.code"
         @click="goMyWorkList(index)">
      <div>
        <img :src="require('../assets/myWork-'+ index+'.png')" :alt="item">
        <span>{{item.text}}</span>
      </div>
      <div>
        <div>{{item.count}}</div>
        <img src="../assets/to-right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyWork",
    data() {
      return {
        list: [
          {
            text: '待受理',
            code: 2,
            count: 0
          }, {
            text: '待审批',
            code: 4,
            count: 0
          }, {
            text: '待签字',
            code: 10,
            count: 0
          }, {
            text: '待补正',
            code: 5,
            count: 0
          }, {
            text: '已办结',
            code: 0,
            count: 0
          }
          // , {
          //   text: '已过号',
          //   code: 8,
          //   count: 0
          // }
        ]
      }
    },
    created() {
      this.loadCount()
    },
    methods: {
      loadCount() {
        this.$post('mynj/busListCount', {
          uId: sessionStorage.getItem('uId')
        }).then((res) => {
          if (res.resultCode === 200) {
            let data = res.data
            this.list[0].count = data.nocount
            this.list[1].count = data.dspcount
            this.list[2].count = data.gzcount
            this.list[3].count = data.bzcount
            this.list[4].count = data.okcount
            // this.list[5].count = data.ghcount
          }
        })
      },
      goMyWorkList(index) {
        let myWorkInfo = {
          title: this.list[index].text,
          code: this.list[index].code
        }
        sessionStorage.setItem('myWorkInfo', JSON.stringify(myWorkInfo))
        this.$router.push({
          name: 'myWorkList'
        })
      }
    }
  }
</script>

<style scoped>
  .block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
    padding: 20px;
  }

  .block > div {
    display: flex;
    align-items: center;
  }

  .block > div:first-child img {
    width: 20px;
    margin-right: 10px;
  }

  .block > div:first-child span {
    font-size: 4.27vw;
    color: #666666;
  }

  .block > div:last-child img {
    width: 7px;
    height: 14px;
    margin-left: 5px
  }

  .block > div:last-child div {
    font-size: 3.74vw;
    color: #ffffff;
    padding: 3px;
    min-width: 19px;
    text-align: center;
    background-color: #ff6b77;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
</style>