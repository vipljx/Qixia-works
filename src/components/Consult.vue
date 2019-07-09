<template>
  <div class="bg">
    <Header title="我要咨询" left=""></Header>
    <MakeCall></MakeCall>
    <div class="input-block">
      <input-line
              v-for="item in info"
              :key="item.placeholder"
              :info="item"
              :hasBottom="false"
      ></input-line>
      <div class="time-line">
        <div>咨询单位</div>
        <div>
          <select name="classify" v-model="classify">
            <option
                    :value="index"
                    v-for="(item,index) in classifyList"
                    :key="item.dId"
            >{{item.dName}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="textarea-block">
      <textarea placeholder="请输入您想咨询的内容" v-model="consultValue" cols="5" rows="5"></textarea>
    </div>
    <div class="photo">
      <!--      <div class="img-show">-->
      <div v-for="(item,index) in imgList"
           :key="index"
           :class="['img-father',(index + 1) % 3 === 0 ? 'm-none' : '']">
        <img :src="item" alt="">
        <img src="../assets/delete.png" @click="deleteImg(index)" class="delete" alt="">
      </div>
      <img class="camera" src="../assets/camera.png" alt="拍照" @click="chooseImg">
      <!--      </div>-->
      <div class="take-photo" style="display: none">
        <div class="cropper-block">
          <my-image-cropper v-model="photo"
                            :width="0.3 * w"
                            :height="0.3 * w"
                            :placeholder="'点击拍摄照片'"
                            :placeholder-font-size="16"
                            :accept="'image/*'"
                            :prevent-white-space="false"
                            @file-choose="handleCroppaFileChoose"
                            :show-loading="true"
                            :loading-size="40"
                            :loading-color="'#606060'"
          ></my-image-cropper>
        </div>
        <div class="button-block save-button">
          <mt-button class="s-button" type="primary" @click="saveImg">保存</mt-button>
        </div>
      </div>
    </div>
    <div class="button-block">
      <mt-button class="button" @click="update" type="primary">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import MakeCall from '@/components/MakeCall.vue'
  import InputLine from '@/components/InputLine.vue'

  export default {
    name: "Consult",
    data() {
      return {
        isUpdating: false,
        classify: 0,
        classifyList: [],
        info: [
          {
            label: '姓名',
            type: 'text',
            value: '',
            placeholder: '请输入姓名'
          },
          {
            label: '手机号码',
            type: 'number',
            value: '',
            placeholder: '请输入手机号码',
            reg:/^1[3456789]\d{9}$/
          }
        ],
        photo: {},
        imgList: [],
        consultValue: '',
        w: ''
      }
    },
    components: {
      MakeCall,
      InputLine
    },
    created() {
      this.w = document.body.offsetWidth
      this.$get('/dep/deplist', {dId: 3}).then((res) => {
        if (res.resultCode === 200) {
          res.data.list.unshift({'dId': 2, 'dName': '区政务服务中心'})
          this.classifyList = res.data.list
        }
      })

      var userInfo=JSON.parse(localStorage.getItem("userInfo"))
      if(userInfo){
        this.info[0].value=userInfo.name;
        this.info[1].value=userInfo.phone
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
      chooseImg() {
        this.photo.chooseFile()
      },
      saveImg(base) {
        // if (this.photo.generateDataUrl() && !this.isUpdating) {
        if (!this.isUpdating) {
          this.$indicator.open({
              text: '图片处理完成，提交中...',
              spinnerType: 'double-bounce'
          })
          this.isUpdating = true
          this.$post('/policy/uploadImg', {
            fileData: base,
            cerNo: '1111',
            fileName: (new Date()).getTime()
          }).then((res) => {
            if (res.resultCode === 200) {
              this.$indicator.close()
              // this.imgList.push({
              //   src: res.data,
              //   acId: ''
              // })
              this.imgList.push(res.data)
              this.photo.remove()
              this.isUpdating = false
            } else {
              this.$indicator.close()
              this.isUpdating = false
            }
          })
        }
      },
      deleteImg(i) {
        let arr = this.imgList
        arr.splice(i, 1)
      },
      update() {
        let errMsg = ''
        for (let i = 0; i < this.info.length; i++) {
          if (this.info[i].label === '手机号码') {
            if (!this.info[i].reg.test(this.info[i].value)) {
              errMsg = '请输入正确的手机号'
              break
            }
          } else {
            if (this.info[i].value === '') {
              errMsg = this.info[i].placeholder
              break
            }
          }
        }
        if (!this.consultValue && errMsg === '') {
          errMsg = '请输入您想咨询的内容'
        }
        if (errMsg) {
          return this.toast(errMsg)
        }
        this.$get('policy/insertAdviceInfo', {
          uId: sessionStorage.getItem('uId'),
          aContent: this.consultValue,
          aName: this.info[0].value,
          aPhone: this.info[1].value,
          aOrg: this.classifyList[this.classify].dId,
          picUrl: this.imgList.join(','),
          aType: 0
        }).then((res) => {
          if (res.resultCode === 200) {
            this.classify = 0
            this.info = [
              {
                label: '姓名',
                type: 'text',
                value: '',
                placeholder: '请输入姓名'
              },
              {
                label: '手机号码',
                type: 'number',
                value: '',
                placeholder: '请输入手机号码'
              }
            ];
            this.photo = {}
            this.imgList = []
            this.consultValue = ''
            this.toast('提交成功')
          }
        })
      },
      handleCroppaFileChoose(e) {
        this.$getBase64(e, (data) => {
          this.saveImg(data)
        })
      }
    }
  }
</script>

<style scoped>
  .input-block {
    padding: 0 4vw;
    background-color: #ffffff;
  }

  .time-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    /*border-bottom: 1px solid #cccccc;*/
    background-color: #ffffff;
  }

  select {
    height: 24px;
    text-align: right;
    font-size: 4.27vw;
    color: #666666;
    background-color: #ffffff;
    border: none;
    outline: none;
  }

  .textarea-block {
    height: 120px;
    padding: 10px 4vw;
    margin: 8px 0;
    background-color: #ffffff;
  }

  .textarea-block textarea {
    width: 100%;
    height: 100%;
    font-size: 4.27vw;
    color: #333333;
    padding: 10px;
    outline: none;
    box-sizing: border-box;
    border: 1px solid #cccccc
  }

  .button-block {
    padding: 10px 0;
    margin-bottom: 50px;
  }

  .button {
    font-size: 3.74vw;
  }

  .photo {
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 4vw
  }

  .cropper-block {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-block {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff
  }

  .save-button {
    padding: 0;
    background-color: #ffffff;
    margin-bottom: 0;
    height: 6vw;
  }

  .s-button {
    width: 135px;
    height: 6vw;
    border-radius: 0;
    font-size: 12px
  }

  .img-show {
    display: flex;
    flex-wrap: wrap;
    padding: 2vw;
    background-color: #ffffff
  }

  .img-father img {
    width: 30vw;
    height: 36vw
  }

  .img-father {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
    width: 30vw;
    height: 36vw;
    margin: 0 1vw 1vw 0
  }

  .img-father .delete {
    position: fixed;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px
  }

  .take-photo {
    width: 30vw;
    margin: 0
  }

  .m-none {
    margin: 0;
  }
</style>