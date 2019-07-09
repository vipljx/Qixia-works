<template>
  <div class="bg">
    <div class="header">
      <router-link to="/">
        <img src="../assets/to-left.png" alt="">
      </router-link>
      <input type="text" v-model="searchValue" autofocus placeholder="请输入您要搜索的关键词">
      <button @click="search">搜索</button>
    </div>
    <div v-if="searchOnce">
      <div class="block">
        <div class="title">
          <div class="b"></div>
          <span>事项指南</span>
        </div>
        <div v-if="statementList.length">
          <policy-statement v-for="(item,index) in statementList"
                            :key="item.sId"
                            :type="0"
                            :info="item"
                            :hasBorder="(index + 1) === statementList.length"
                            @next="toNext(index,0)"
          ></policy-statement>
        </div>
        <div v-else class="noData">
          <span>暂无相关事项</span>
        </div>
      </div>
      <div class="block" v-if="where">
        <div class="title">
          <div class="y"></div>
          <span>政策公告</span>
        </div>
        <div v-if="policyList.length">
          <policy-statement v-for="(item,index) in policyList"
                            :key="item.pTitle"
                            :type="1"
                            :info="item"
                            :hasBorder="(index + 1) === policyList.length"
                            @next="toNext(index,1)"
          ></policy-statement>
        </div>
        <div v-else class="noData">
          <span>暂无相关政策公告</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PolicyStatement from '@/components/PolicyStatement.vue'

  export default {
    name: "Search",
    components: {
      PolicyStatement
    },
    data() {
      return {
        searchOnce: false,
        searchValue: '',
        policyList: [],
        statementList: [],
        where: 1
      }
    },
    created() {
      this.where = this.$route.params.where
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      search() {
        if (!this.searchValue) {
          this.toast('请输入搜索内容')
        } else {
          this.$post('/policy/queryAllSearch', {
            text: this.searchValue
          }).then((res) => {
            if (res.resultCode === 200) {
              this.searchOnce = true
              this.policyList = res.data.policy_notic
              this.statementList = res.data.bus_list
            }
          })
        }
      },
      toNext(i, type) {
        if (type) {
          this.goGGDetail(i)
        } else {
          this.goDetail(i)
        }
      },
      // 事项详情
      goDetail(i) {
        sessionStorage.setItem('sId', this.statementList[i].sId)
        sessionStorage.setItem('dId', this.statementList[i].dId)
        this.$router.push({
          name: 'workDetail',
          params: {
            title: this.statementList[i].sName
          }
        })
      },
      // 公告详情
      goGGDetail(i) {
        this.$router.push({
          name: 'newsDetail',
          params: {
            title: this.policyList[i].pTitle,
            time: this.policyList[i].createTime,
            content: this.policyList[i].pContent,
            type: 1,
            where: 1
          }
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 40px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .header a {
    width: 10px;
    height: 20px;
  }

  .header img {
    width: 10px;
    height: 20px;
    margin-left: 2vw;
  }

  .header input {
    width: 76vw;
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

  .header button {
    font-size: 4vw;
    color: #999999;
    background-color: #ffffff;
    border: none;
    outline: none;
  }

  .block {
    padding: 0 15px;
    background-color: #ffffff;
    margin-bottom: 5px;
  }

  .title {
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cccccc;
  }

  .title > div {
    width: 10px;
    height: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 5px;
  }

  .title .b {
    background-color: #6ca7f9;
  }

  .title .y {
    background-color: #ffb418;
  }

  .title span {
    font-size: 4.27vw;
    color: #333333;
  }

  .noData {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>