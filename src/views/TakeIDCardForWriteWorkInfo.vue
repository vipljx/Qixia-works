<template>
  <div class="bg">
    <Header title="身份证" :to="type ? '/cardPackage' : '/bid'"></Header>
    <div class="title" style="margin-top: -10px;">身份证正面</div>
    <div class="img-block">
      <my-image-cropper
              v-model="IDCardFront"
              :width="240"
              :height="150"
              :placeholder="'点击拍摄身份证正面'"
              :placeholder-font-size="16"
              :accept="'image/*'"
              :prevent-white-space="false"
              :initial-image=IDCardFrontPath
              :show-loading="true"
              :loading-size="40"
              :loading-color="'#606060'"
      ></my-image-cropper>
    </div>
    <div class="title">身份证反面</div>
    <div class="img-block">
      <my-image-cropper
              v-model="IDCardBack"
              :width="240"
              :height="150"
              :placeholder="'点击拍摄身份证反面'"
              :placeholder-font-size="16"
              :accept="'image/*'"
              :prevent-white-space="false"
              :initial-image=IDCardBackPath
              :show-loading="true"
              :loading-size="40"
              :loading-color="'#606060'"
      ></my-image-cropper>
    </div>
    <div class="example">
      <img src="../assets/exampleOfTakingPhotos.png" alt="">
    </div>
    <div class="button-block">
      <mt-button v-if="myWorkInfo.state!=2" class="button" type="primary" @click="upLoad">上传</mt-button>
      <mt-button v-if="myWorkInfo.state==2" class="button2" type="default" @click="back">返回</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        IDCardFront: {},
        IDCardBack: {},
        myWorkInfo:{},
        IDCardFrontPath: '',
        IDCardBackPath: '',
        type: 0
      }
    },
    components: {},
    created() {
      this.IDCardFrontPath = this.$route.params.IDCardFrontPath
      this.IDCardBackPath = this.$route.params.IDCardBackPath
      this.type = this.$route.params.type ? this.$route.params.type : 0
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo')) || {code: ''}
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      upLoad() {
        if (!this.IDCardFront.generateDataUrl()) {
          return this.toast('请上传身份证正面照片')
        } else if (!this.IDCardBack.generateDataUrl()) {
          return this.toast('请上传身份证反面照片')
        }
        this.$indicator.open({
          text: '提交中...',
          spinnerType: 'double-bounce'
        })
        this.$post('/policy/uploadImg', {
          fileData: this.IDCardFront.generateDataUrl(),
          cerNo: (new Date()).getTime(),
          fileName: 'SFZZM'
        }).then((res) => {
          if (res.resultCode === 200) {
            this.$post('/policy/uploadImg', {
              fileData: this.IDCardBack.generateDataUrl(),
              cerNo: (new Date()).getTime(),
              fileName: 'SFZFM'
            }).then((resB) => {
              if (resB.resultCode === 200) {
                let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
                obj.IDCardInfo.frontInfo = res.data
                obj.IDCardInfo.backInfo = resB.data
                sessionStorage.setItem('workInfo', JSON.stringify(obj))
                this.$indicator.close()
                this.toast('提交成功')
                setTimeout(() => {
                  this.$router.push({
                    name: 'bid'
                  })
                }, 2000)
              } else {
                this.$indicator.close()
                this.toast('提交异常')
              }
            })
          } else {
            this.$indicator.close()
            this.toast('提交异常')
          }
        })
      },
      back(){
        this.$router.push({
          name: 'bid'
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: #f2f2f2
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 4.26vw;
    color: #333333;
    padding: 0 4vw
  }

  .img-block {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 170px;
    padding-top: 20px;
    background-color: #ffffff;
  }

  .example {
    padding: 10px;
    margin-top: 10px;
    background-color: #ffffff;
  }

  .example img {
    width: 100%;
  }
</style>