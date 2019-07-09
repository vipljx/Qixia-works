<template>
  <div class="bg">
    <Header :title="params.title" :has-margin="false"></Header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">{{params.navBar[0]}}</mt-tab-item>
      <mt-tab-item id="2">{{params.navBar[1]}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected"
                      v-infinite-scroll="loadMore"
                      infinite-scroll-disabled="loading"
                      infinite-scroll-distance="10">
      <mt-tab-container-item id="1">
        <div v-if="leftList.length > 0">
          <div v-if="params.title === '我的消息'">
            <news-block v-for="item in leftList"
                        :key="item.r_id"
                        :info="item"></news-block>
          </div>

          <!-- <title-time-list v-if="params.title === '我的咨询' || params.title === '我的投诉'"-->
          <title-time-list v-else
                           v-for="(item,index) in leftList"
                           :key="index"
                           :isEvaluate="params.isEvaluate ? params.isEvaluate : false"
                           :info="item"
                           :wType="params.wType"
                           :hasBorder="index === leftList.length - 1"></title-time-list>
        </div>
        <div v-else>
          <p class="no-list">暂无数据</p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-if="rightList.length > 0">
          <div v-if="params.title === '我的消息'">
            <news-block v-for="item in rightList"
                        :key="item.r_id"
                        :info="item"></news-block>
          </div>
          <!-- <title-time-list v-if="params.title === '我的咨询' || params.title === '我的投诉'"-->
          <title-time-list v-else
                           v-for="(item,index) in rightList"
                           :key="index"
                           :isEvaluate="params.isEvaluate ? params.isEvaluate : false"
                           :info="item"
                           :wType="params.wType"
                           :hasBorder="index === rightList.length - 1"></title-time-list>
        </div>
        <div v-else>
          <p class="no-list">暂无数据</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import NewsBlock from '@/components/NewsBlock.vue'
  import TitleTimeList from '@/components/TitleTimeList.vue'

  export default {
    name: "TwoNavBar",
    components: {
      NewsBlock,
      TitleTimeList
    },
    data() {
      return {
        params: {},
        selected: '1',
        leftList: [],
        rightList: [],
        loading: false,
        leftHasNextPage: true,
        rightHasNextPage: true,
        leftPage: 1,
        rightPage: 2
      }
    },
    created() {
      this.params = JSON.parse(sessionStorage.getItem('params'))
      switch (this.params.wType) {
          //我的消息
        case 1:
          this.loadNews(2, 1)
          this.loadNews(1, 1)
          break
          //我的咨询
        case 2:
          this.loadConsult(1, 1)
          this.loadConsult(2, 1)
          break
          //我的投诉
        case 3:
          this.loadComplaint(1, 1)
          this.loadComplaint(2, 1)
          break
          // 我的评价
        case 4:
          this.loadEvaluate(1, 1)
          this.loadEvaluate(2, 1)
          break
          // 咨询公告
        case 5:
          this.loadPolicy(1, 1)
          this.loadPolicy(2, 1)
          break
      }
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      // 分页数据加载
      loadMore() {
        // this.loading = true
        switch (this.selected) {
          case '1':
            if (this.leftHasNextPage) {
              this.loadLeft()
            } else {
              this.toast('没有更多数据了')
            }
            break
          case '2':
            if (this.rightHasNextPage) {
              this.loadRight()
            } else {
              this.toast('没有更多数据了')
            }
            break
        }
      },
      loadLeft() {
        this.leftPage++
        switch (this.params.wType) {
          case 1:
            this.loadNews(2, this.leftPage)
            break
          case 2:
            this.loadConsult(1, this.leftPage)
            break
          case 3:
            this.loadComplaint(1, this.leftPage)
            break
          case 4:
            this.loadEvaluate(1, this.leftPage)
            break
          case 5:
            this.loadPolicy(1, this.leftPage)
            break
        }
      },
      loadRight() {
        this.rightPage++
        switch (this.params.wType) {
          case 1:
            this.loadNews(1, this.rightPage)
            break
          case 2:
            this.loadConsult(2, this.rightPage)
            break
          case 3:
            this.loadComplaint(2, this.rightPage)
            break
          case 4:
            this.loadEvaluate(2, this.rightPage)
            break
          case 5:
            this.loadPolicy(2, this.rightPage)
            break
        }
      },
      //我的消息
      loadNews(state, page) {
        let data = {
          uId: sessionStorage.getItem('uId'),
          nType: state - 1,
          page: page,
          size: 10
        }
        this.load('/mynj/queryByUidAndNtype', data, state === 1 ? 2 : 1)
      },
      // 咨询
      loadConsult(state, page) {
        let data = {
          uId: sessionStorage.getItem('uId'),
          status: state - 1,
          page: page,
          size: 10
        }
        this.load('policy/queryQxzwAdviceInfo', data, state)
      },
      // 投诉
      loadComplaint(state, page) {
        let data = {
          uId: sessionStorage.getItem('uId'),
          state: state,
          page: page,
          size: 10
        }
        this.load('UsersManagement/queryByUidAndState', data, state)
      },
      //评价
      loadEvaluate(state, page) {
        let data = {
          uId: sessionStorage.getItem('uId'),
          state: state,
          page: page,
          size: 10
        }
        this.load('/acc/queryQxzwBusApplysEvaluate', data, state)
      },
      //政策公告
      loadPolicy(state, page) {
        let data = {
          type: state - 1,
          page: page,
          size: 10
        }
        this.load('/policy/queryPolicyNotic', data, state)
      },
      //加载请求
      load(url, data, state) {
        this.$get(url, data)
            .then((res) => {
              if (res.resultCode === 200) {
                console.log(res)
                let arr = []
                switch (state) {
                  case 1:
                    arr = this.leftList
                    this.leftList = arr.concat(res.data.list)
                    this.leftHasNextPage = res.data.hasNextPage
                    break
                  case 2:
                    arr = this.rightList
                    this.rightList = arr.concat(res.data.list)
                    this.rightHasNextPage = res.data.hasNextPage
                    break
                }
              } else if (res.resultCode === 995) {
                switch (state) {
                  case 1:
                    this.leftHasNextPage = false
                    break
                  case 2:
                    this.rightHasNextPage = false
                    break
                }
              }
            })
      }
    }
  }
</script>

<style scoped>
  .mint-navbar {
    /*margin-top: 40px;*/
    position: fixed;
    background-color: #f2f2f2;
    top: 40px;
    width: 100vw;
    z-index: 999;
  }

  .mint-navbar .mint-tab-item {
    font-size: 16px;
    padding: 13px 0
  }

  .mint-navbar .mint-tab-item.is-selected {
    margin: 0;
    border-bottom: 2px solid #3785ea;
    color: #3785ea
  }

  .mint-tab-container {
    margin-top: 80px;
  }

  .mint-tab-container-item {
    background-color: #f2f2f2;
    box-sizing: border-box;
    min-height: 100vh
  }

  .no-list {
    text-align: center;
  }
</style>