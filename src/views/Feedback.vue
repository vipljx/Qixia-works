<template>
  <div class="bg">
    <Header title="意见反馈"></Header>
    <img class="feedback" src="../assets/feedback.png" alt="意见">
    <div class="input-block">
      <input-line
              v-for="item in info"
              :key="item.placeholder"
              :info="item"
              :hasBottom="false"></input-line>
      <div class="time-line">
        <div>问题类型</div>
        <div>
          <select name="classify" v-model="classify">
            <option
                    :value="index"
                    v-for="(item,index) in classifyList"
                    :key="item">
              {{item}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="textarea-block">
      <textarea placeholder="请填写您的反馈内容" v-model="consultValue" cols="5" rows="5"></textarea>
    </div>
    <div class="button-block">
      <mt-button class="button" @click="update" type="primary">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import InputLine from '@/components/InputLine.vue'

  export default {
    name: "Feedback",
    data() {
      return {
        classify: 0,
        classifyList: ['体验问题', '性能问题', ' 缺陷问题', ' 功能建议'],
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
        consultValue: '',
      }
    },
    components: {
      InputLine
    },
    created() {
      var userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
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
          errMsg = '请输入您想投诉的内容'
        }
        if (errMsg) {
          return this.toast(errMsg)
        }
        this.$post('/policy/insertQxzwTicklingInfo', {
          uId: sessionStorage.getItem('uId'),
          tName: this.info[0].value,
          tPhone: this.info[1].value,
          tType: this.classify,
          tContent: this.consultValue,
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
            this.consultValue = ''
            this.toast('提交成功')
          }
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

  .feedback {
    width: 100%;
  }
</style>