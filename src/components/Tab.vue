<template>
  <div>
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="index">
          <home-page @changeTab="changeTab"></home-page>
        </mt-tab-container-item>
        <mt-tab-container-item id="work">
          <work ref="work"></work>
        </mt-tab-container-item>
        <mt-tab-container-item id="consult">
          <consult></consult>
        </mt-tab-container-item>
        <mt-tab-container-item id="serve">
          <serve></serve>
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
          <mine></mine>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <img v-if="selected === 'index'" slot="icon" src="../assets/tabIcon/index-selected.png">
        <img v-else slot="icon" src="../assets/tabIcon/index.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="work">
        <img v-if="selected === 'work'" slot="icon" src="../assets/tabIcon/work-selected.png">
        <img v-else slot="icon" src="../assets/tabIcon/work.png">
        办事
      </mt-tab-item>
      <mt-tab-item id="consult">
        <img v-if="selected === 'consult'" slot="icon" src="../assets/tabIcon/consult-selected.png">
        <img v-else slot="icon" src="../assets/tabIcon/consult.png">
        咨询
      </mt-tab-item>
      <mt-tab-item id="serve">
        <img v-if="selected === 'serve'" slot="icon" src="../assets/tabIcon/serve-selected.png">
        <img v-else slot="icon" src="../assets/tabIcon/serve.png">
        服务
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img v-if="selected === 'mine'" slot="icon" src="../assets/tabIcon/mine-selected.png">
        <img v-else slot="icon" src="../assets/tabIcon/mine.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import Work from '@/views/Work.vue'
  import HomePage from '@/views/HomePage.vue'
  import Consult from '@/components/Consult.vue'
  import Serve from '@/views/Serve.vue'
  import Mine from '@/views/Mine.vue'

  export default {
    name: "",
    components: {
      Work,
      HomePage,
      Consult,
      Serve,
      Mine
    },
    data() {
      return {
        selected: 'index',
        tabItems: ['index', 'work', 'consult', 'serve', 'mine']
      }
    },
    created() {
      
      let unionid = localStorage.getItem('unionid')
      if (unionid) {
        this.getUserInfo(unionid)
      } else {
        let code = this.getUrlParam("code")
        !code ? this.getCode() : this.saveId(code)
      }

      // 清楚缓存信息
      sessionStorage.removeItem('personInfo')
      sessionStorage.removeItem('workInfo')
      sessionStorage.removeItem('myWorkInfo')
      sessionStorage.removeItem('addressInfo')

    },
    methods: {
      // 获取url中的参数
      getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        } else {
          return null;
        }
      },
      //获取code
      getCode() {
        //获取code
        const local_url = window.location.href;
        const appid = 'wxcb742ae8c5045a26'
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + local_url + "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
      },
      //获取openid
      saveId(code) {
        this.$get('/getOpenId', {
          code: code
        }).then(res => {
          let response = res
          if (response.resultCode === 200) {
            localStorage.setItem('openId', response.data.openid)
            localStorage.setItem('unionid', response.data.unionid)
            this.getUserInfo(response.data.unionid)
          }
        })
      },
      getUserInfo(id) {
        this.$get('/login/queryUsersByUnionid', {
          unionid: id
        }).then(res => {
          let response = res
          if (response.resultCode === 200) {
            let data = {
              card: response.data.cardNo,
              name: response.data.uName,
              phone: response.data.mobile
            }
            localStorage.setItem('userInfo', JSON.stringify(data))
            sessionStorage.setItem('userInfo', JSON.stringify(data))
            sessionStorage.setItem('uId', response.data.uId)
            this.jump()
          } else {
            this.jump()
          }
        })
      },
      //前往不同页面
      jump() {
        //页面前往不同的页面
        let nextRoute = this.getUrlParam('goWhere')
        if (nextRoute) {
          if (!isNaN(parseInt(nextRoute))) {
            this.changeTab(nextRoute)
          } else if (isNaN(parseInt(nextRoute))) {
            if (nextRoute === 'TwoNavBar') {
              let data = {
                title: '咨询公告',
                navBar: ['政策咨询', '通知公告'],
                wType: 5
              }
              sessionStorage.setItem('params', JSON.stringify(data))
              this.$router.push({
                name: 'TwoNavBar'
              })
            } else {
              this.$router.push({
                name: nextRoute
              })
            }
          }
        }
        console.log(1)
        //之前离开时的tab页签
        let tabItemsIndex = sessionStorage.getItem('tabItemsIndex')
        if (tabItemsIndex) {
          this.changeTab(tabItemsIndex)
        }
      },
      changeTab(i, e) {
        this.selected = this.tabItems[i]
        if (typeof e === "number") {
          this.$refs.work.changeTab(e)
        }
      }
    },
    watch: {
      selected(newSelected) {
        if ([2, 4].indexOf(this.tabItems.indexOf(newSelected)) !== -1) {
          if (!sessionStorage.getItem('userInfo')) {  // 通过vuex state获取当前的token是否存在
            this.$router.push({
              name: 'loginOne'
            })
          } else {
            sessionStorage.setItem('tabItemsIndex', this.tabItems.indexOf(newSelected))
          }
        } else {
          sessionStorage.setItem('tabItemsIndex', this.tabItems.indexOf(newSelected))
        }
      }
    }
  }
</script>

<style scoped>
  .mint-tabbar {
    background-color: #ffffff;
    height: 50px;
    background-image: none;
    position: fixed;
  }

  img {
    width: 5.33vw;
    height: 5.33vw;
    margin: 0 auto;
  }

  .mint-tabbar > .mint-tab-item {
    color: #737373;
    font-size: 2.93vw;
    font-weight: 600;
  }

  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #ffffff;
    color: #3785ea;
    font-size: 2.93vw;
    font-weight: 600;
  }
</style>