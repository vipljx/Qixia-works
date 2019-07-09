<template>
  <div class="bg">
    <Header title="授权申请" :has-margin="false"></Header>
    <section class="mt">印章使用信息</section>
    <div class="block">
      <div class="row"><span>印章名称</span><span>{{yName}}</span></div>
      <div class="row"><span>使用期限</span><span>{{yTime}}</span></div>
      <div class="row"><span>公司公章授权函</span><span></span></div>
      <img :src="yImg" alt="授权函">
    </div>
    <section>申请人信息</section>
    <div class="block">
      <div class="row"><span>姓名</span><span>{{sName}}</span></div>
      <div class="row"><span>身份证号</span><span>{{sCard}}</span></div>
      <div class="row"><span>手机号</span><span>{{sPhone}}</span></div>
    </div>
    <div class="button-block" v-if="yType === 2">
      <mt-button class="button" type="primary" @click="handle(0)">同意</mt-button>
      <mt-button class="button no" type="default" @click="handle(1)">不同意</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SealApplicationHandle",
    data() {
      return {
        sName: '',
        sCard: '',
        sPhone: '',
        yName: '',
        yTime: '',
        yImg: '',
        yType: '',
        dId: '',
        seizeSignatureUrl: ''
      }
    },
    created() {
      this.loadInfo()
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      //加载申请人信息
      loadInfo() {
        this.$get('/auth/queryAuth', {
          cId: this.$route.params.cId
        }).then((res) => {
          if (res.resultCode === 200) {
            let data = res.data
            this.sName = data.legalName
            this.sCard = data.legalIdNo
            this.sPhone = data.legalPhone
            this.yName = data.signatureName
            this.yTime = data.startTime.split(' ')[0] + '~' + data.endTime.split(' ')[0]
            this.yImg = data.signatureUrl
            this.yType = data.stasus
            this.dId = data.dId
            this.seizeSignatureUrl = data.seizeSignatureUrl
          }
        })
      },
      handle(type) {
        let data = {
          dId: this.dId,
          status: type
        }
        if (type === 0) {
          data.seizeSignatureUrl = this.seizeSignatureUrl
        }
        this.$post('/auth/updateAuth', data).then((res) => {
          if (res.resultCode === 200) {
            if (type === 0) {
              this.toast('授权成功')
            } else {
              this.toast('您已拒绝授权')
            }
            this.yType = type
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mt {
    margin-top: 40px;
  }

  section {
    /*height: 40px;*/
    /*line-height: 40px;*/
    font-size: 4.26vw;
    color: #1a1a1a;
    padding: 10px 4vw
  }

  .block {
    padding: 0 4vw;
    background-color: #ffffff;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    color: #333333;
    padding: 15px 0;
  }

  .block .row:last-child {
    border: none;
  }

  .row .b {
    color: #3785ea;
  }

  .row img {
    width: 7px;
    height: 14px;
  }

  .block img {
    width: 100%;
  }

  .no{
    background-color: #BFBFBF;
    color: #ffffff;
  }
</style>