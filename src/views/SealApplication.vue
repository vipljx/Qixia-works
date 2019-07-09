<template>
  <div class="bg">
    <Header title="授权申请"></Header>
    <div>
      <div class="title" style="margin-top: -10px;">经办人信息</div>
      <div class="input-block">
        <input-line
                v-for="(item,index) in operatorInfo"
                :key="item.placeholder"
                :info="item"
                :hasBottom="(index + 1) === operatorInfo.length"
        ></input-line>
      </div>
    </div>
    <div>
      <div class="title">法人信息</div>
      <div class="input-block">
        <input-line
                v-for="(item,index) in corporationInfo"
                :key="item.placeholder"
                :info="item"
                :hasBottom="(index + 1) === corporationInfo.length"
        ></input-line>
      </div>
    </div>
    <div>
      <div class="title">有效使用限期</div>
      <div class="input-block">
        <input-line
                v-for="(item) in expiryDates"
                :key="item.placeholder"
                :info="item"
                :hasBottom="false"
                @click="openPicker"
        ></input-line>
        <div class="time-line">
          <div>使用开始时间</div>
          <div @click="openPicker(0)">{{useStarTime}}</div>
        </div>
        <div class="time-line">
          <div>使用结束时间</div>
          <div @click="openPicker(1)">{{useEndTime}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">印章上传 <i>（请上传含有公司印章的授权函）</i></div>
      <div class="cropper-block">
        <my-image-cropper
                v-model="photo"
                :width="200"
                :height="200"
                :placeholder="'点击上传授权函'"
                :placeholder-font-size="16"
                :accept="'image/*'"
                :prevent-white-space="false"
                :show-loading="true"
                :loading-size="40"
                :loading-color="'#606060'"></my-image-cropper>
      </div>
    </div>
    <div class="button-block">
      <mt-button class="button" @click="upImg" type="primary">提交</mt-button>
    </div>
    <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="dateValue"
            @confirm="handleConfirm">
      >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import InputLine from '@/components/InputLine.vue'

  export default {
    name: "",
    data() {
      return {
        operatorInfo: [
          {
            label: '姓名',
            type: 'text',
            value: '',
            placeholder: '请输入姓名',
            readonly: true
          },
          {
            label: '身份证号码',
            type: 'number',
            value: '',
            placeholder: '请输入身份证号码',
            readonly: true
          },
          {
            label: '手机号码',
            type: 'number',
            value: '',
            placeholder: '请输入手机号码',
            readonly: true
          }
        ],
        corporationInfo: [
          {
            label: '姓名',
            type: 'text',
            value: '',
            placeholder: '请输入姓名'
          },
          {
            label: '身份证号码',
            type: 'number',
            value: '',
            placeholder: '请输入身份证号码'
          },
          {
            label: '统一社会信用代码',
            type: 'text',
            value: '',
            placeholder: '请输入统一社会信用代码'
          },
          {
            label: '手机号码',
            type: 'number',
            value: '',
            placeholder: '请输入手机号码'
          }
        ],
        expiryDates: [
          {
            label: '印章名称',
            type: 'text',
            value: '',
            placeholder: '请输入印章名称'
          }
          // ,
          // {
          //   label: '使用期限',
          //   type: 'number',
          //   value: '',
          //   placeholder: '请输入使用期限'
          // }
        ],
        dateValue: '',
        useStarTime: '请输入开始时间',
        useEndTime: '请输入结束时间',
        starOrEnd: 0,
        photo: {},
        isUpdating: false
      }
    },
    components: {
      InputLine
    },
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.operatorInfo[0].value = userInfo.name
      this.operatorInfo[1].value = userInfo.card
      this.operatorInfo[2].value = userInfo.phone
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      openPicker(i) {
        this.starOrEnd = i
        this.$refs.picker.open();
      },
      handleConfirm(val) {
        if (this.starOrEnd) {
          this.useEndTime = val.toLocaleDateString().replace(/\//g, '-')
        } else {
          this.useStarTime = val.toLocaleDateString().replace(/\//g, '-')
        }
      },
      upImg() {
        if (this.photo.generateDataUrl() && !this.isUpdating) {
          this.$indicator.open({
            text: '申请中...',
            spinnerType: 'double-bounce'
          })
          this.isUpdating = true
          this.$post('/policy/uploadImg', {
            fileData: this.photo.generateDataUrl(),
            cerNo: '1111',
            fileName: (new Date()).getTime()
          }).then((res) => {
            if (res.resultCode === 200) {
              this.update(res.data)
            } else {
              this.isUpdating = false
              this.$indicator.close()
            }
          })
        }
      },
      update(src) {
        this.$post('/auth/saveAuth', {
          uId: sessionStorage.getItem('uId'),
          legalName: this.corporationInfo[0].value,
          legalPhone: this.corporationInfo[3].value,
          legalIdNo: this.corporationInfo[1].value,
          regNo: this.corporationInfo[2].value,
          signatureName: this.expiryDates[0].value,
          startTime: this.useStarTime,
          endTime: this.useEndTime,
          signatureUrl: src,
          idNo: JSON.parse(sessionStorage.getItem('userInfo')).card,
        }).then((res) => {
          if (res.resultCode === 200) {
            this.toast('申请成功')
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            })
            this.photo.remove()
            this.isUpdating = false
            this.$indicator.close()
          } else if (res.resultCode === 997) {
            this.toast('法人未使用公众号，无法发起申请')
            this.isUpdating = false
            this.$indicator.close()
          } else {
            this.isUpdating = false
            this.$indicator.close()
          }
        })
      }
    },
    watch: {}
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

  .title i {
    font-size: 3.74vw;
    font-style: normal;
    color: #666666
  }

  .input-block {
    padding: 0 4vw;
    background-color: #ffffff
  }
  .cropper-block{
    padding: 0 4vw;
  }
  .time-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff
  }

  .time-line > div:last-child {
    color: #999999
  }

</style>