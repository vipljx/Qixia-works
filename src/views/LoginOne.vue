<template>
  <div class="bg">
    <Header title="身份认证" to="/"></Header>
    <div class="title" style="margin-top: -10px;">身份证正面</div>
    <div class="img-block">
      <img src="../assets/IDZ.png" alt="" v-show="showImgZ" @click="changeShow(0)">
      <my-image-cropper
              v-show="!showImgZ"
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
      <img src="../assets/IDF.png" alt="" v-show="showImgF" @click="changeShow(1)">
      <my-image-cropper
              v-show="!showImgF"
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
      <mt-button class="button" type="primary" @click="upLoad">下一步</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginOne",
    data() {
      return {
        IDCardFront: {},
        IDCardBack: {},
        IDCardFrontPath: '',
        IDCardBackPath: '',
        showImgZ: true,
        showImgF: true
      }
    },
    components: {},
    created() {
      this.$indicator.open({
        text: '您未认证，请先完成认证',
        spinnerType: 'double-bounce'
      })
      setTimeout(() => {
        this.$indicator.close()
      },2000)
      this.IDCardFrontPath = this.$route.params.IDCardFrontPath
      this.IDCardBackPath = this.$route.params.IDCardBackPath
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      changeShow(i) {
        if (i) {
          this.showImgF = false
          this.IDCardBack.chooseFile()
        } else {
          this.showImgZ = false
          this.IDCardFront.chooseFile()
        }
      },
      upLoad() {
        if (!this.IDCardFront.generateDataUrl()) {
          return this.toast('请上传身份证正面照片')
        } else if (!this.IDCardBack.generateDataUrl()) {
          return this.toast('请上传身份证反面照片')
        }
        this.$indicator.open({
          text: '校验中...',
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
                //校验身份证信息
                this.$get('policy/getIdCardInfos', {
                  froPath: res.data,
                  backPath: resB.data
                }).then((resp) => {
                  if (resp.resultCode === 200) {
                    let data = resp.data
                    data.froPath = res.data
                    data.backPath = resB.data
                    localStorage.setItem('recognitionInfo', JSON.stringify(data))
                    this.$router.push({
                      name: 'loginTwo'
                    })
                    this.$indicator.close()
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
          } else {
            this.$indicator.close()
            this.toast('提交异常')
          }
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

  .img-block img {
    width: 240px;
    height: 150px;
  }
</style>