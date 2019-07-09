<template>
  <div class="bg" v-show="isShow">
    <Header title="填写信息" to="/loginOne"></Header>
    <div class="line">
      <div>
        <span>姓名</span>
        <input type="text" v-model="userInfo.name" placeholder="请输入姓名">
      </div>
      <div>
        <span>身份证号</span>
        <input type="tel" v-model="userInfo.cardno" placeholder="请输入身份证号">
      </div>
      <div>
        <span>手机号</span>
        <input type="number" v-model="phone" placeholder="请输入手机号">
      </div>
    </div>
    <div class="button-block">
      <mt-button class="button" type="primary" @click="checkInfo">下一步</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginTwo",
    data() {
      return {
        isShow:true,
        userInfo: {},
        phone: '',
        reg1:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
        reg2:/^1[3456789]\d{9}$/
      }
    },
    created() {
      let flag = this.getUrlParam('flag')
      if (flag === '0') {
        this.isShow=false;
        this.$indicator.open({
          text: '人脸识别成功，正在加载用户信息...  ',
          spinnerType: 'fading-circle'
        });
        this.getUserInfo();
      } else if (flag !== null && flag !== '0') {
        this.toast('人脸识别失败，请重新识别')
        setTimeout(() => {
          this.$router.push({
            name: 'loginOne'
          })
        }, 2000)
      } else {
        this.userInfo = JSON.parse(localStorage.getItem('recognitionInfo'))
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
      checkInfo() {
        if (!this.userInfo.name) {
          return this.toast('请输入姓名')
        } else if (!this.userInfo.cardno || !this.reg1.test(this.userInfo.cardno)) {
          return this.toast('身份证号为空或格式错误')
        } else if (!this.phone || !this.reg2.test(this.phone)) {
          return this.toast('手机号为空或格式错误')
        }
        this.getOpenId()
      },
      getUserInfo() {
        let recognitionInfo = JSON.parse(localStorage.getItem('recognitionInfo'))
        let data = {
          uName: recognitionInfo.name,
          cardNo: recognitionInfo.cardno,
          mobile: recognitionInfo.phone,
          openid: localStorage.getItem('openId'),
          unionid: localStorage.getItem('unionid'),
          isOnline: 3,
          frontPath: recognitionInfo.froPath,
          backPath: recognitionInfo.backPath
        }
        this.$get('/login/insertQxzwUsers', data).then((res) => {
          if (res.resultCode === 200) {
            let userInfo = {
              card: recognitionInfo.cardno,
              name: recognitionInfo.name,
              phone: recognitionInfo.phone
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            sessionStorage.setItem('uId', res.data.uId)
            this.$indicator.close()
            this.toast('身份认证成功')
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            }, 2000)
          }else{
            this.$indicator.close();
            this.toast(res.message);
            setTimeout(() => {
              this.$router.push({
                name: 'loginOne'
              })
            }, 2000)
          }
        })
      },
      getOpenId() {
        this.recognition(localStorage.getItem('openId'))
        // this.recognition('oGySPxDjy4eT2xi2SlQHOL13Tb5A')
        // this.$get('/getOpenId', {
        //   code: sessionStorage.getItem('wxCode')
        // }).then((res) => {
        //   if (res.resultCode === 200) {
        //     // sessionStorage.setItem('openId', res.data.openId)
        //     // sessionStorage.setItem('unionid', res.data.unionid)
        //     // this.recognition(res.data.openId)
        //     sessionStorage.setItem('openId', 'oGySPxDjy4eT2xi2SlQHOL13Tb5A')
        //     sessionStorage.setItem('unionid', 'oTXJlww1dYrpr1xqCl9QSE3QpnyQ')
        //     this.recognition('oGySPxDjy4eT2xi2SlQHOL13Tb5A')
        //   }
        // })
      },
      recognition(id) {
        let recognition = JSON.parse(localStorage.getItem('recognitionInfo'))
        recognition.phone = this.phone
        localStorage.setItem('recognitionInfo', JSON.stringify(recognition))
        this.$post('/api/face_reuqest_id', {
          'face_app_key': '3mdYuYHeegvCXxHsATNGnD',
          'return_url': 'http://qxgs.zhengebang.com/WxController/discriminate2?authId=1',
          'sj_open_id': id,
          'user_name': recognition.name,
          'user_id_num': recognition.cardno
        }, 'wx').then((res) => {
          location.href = "http://face.wohewomen.com/api/face_check/" + res.request_id + "/auths"
        })
      },
      // 获取url中的参数
      getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        } else {
          return null;
        }
      }
    }
  }
</script>

<style scoped>

  .line {
    padding: 0 20px;
    background-color: #ffffff;
  }

  .line span, .line input {
    font-size: 16px;
    color: #333333;
  }

  .line > div {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .line input {
    width: 60vw;
    height: 40px;
    border: none;
    outline: none;
    text-align: right;
  }
</style>