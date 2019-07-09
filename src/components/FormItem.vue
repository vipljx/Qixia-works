<template>
  <div>
    <!--  label-->
    <label v-if="overcome.indexOf(info.from_item_type) === -1">{{info.from_item_name}}</label>
    <!--  文本框-->
    <div :class="['input',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'text_input'">
      <input
              type="text"
              v-model="info.value"
              :placeholder="info.from_item_desc">
    </div>
    <!--  数字框-->
    <div :class="['input',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'number_input'">
      <input
              type="number"
              v-model="info.value"
              :placeholder="info.from_item_desc">
    </div>
    <!--  多行输入框-->
    <div :class="['input',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'multiline_input'">
      <textarea name=""
                id=""
                cols="10"
                rows="3"
                v-model="info.value"
                :placeholder="info.from_item_desc">
      </textarea>
    </div>
    <!--  多选框-->
    <div :class="['input','block',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'multiline_checkbox'">
      <div class="radio-block"
           v-for="item in JSON.parse(info.data)"
           :key="item.value">
        <input type="checkbox"
               :value="item.key"
               v-model="info.value">
        <label for="">{{item.value}}</label>
      </div>
    </div>
    <!--  单选框 -->
    <div :class="['input','block',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'radio_input'">
      <div class="radio-block"
           v-for="item in JSON.parse(info.data)"
           :key="item.value">
        <input type="radio"
               :value="item.key"
               v-model="info.value">
        <label for="">{{item.value}}</label>
      </div>
    </div>
    <!--  日期-->
    <div :class="['input',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'datetime_input' && info.value">
      <div class="date-line" @click="openPicker">
        {{info.value.length === 0 ? '请选择日期' : info.value}}
      </div>
      <mt-datetime-picker
              ref="picker"
              type="date"
              v-model="value"
              @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <!--  日期-->
    <!--    <div :class="['input',{'none' : hasBottom}]"-->
    <!--         v-if="info.from_item_type === 'number_input'">-->
    <!--      <mt-datetime-picker-->
    <!--              type="date"-->
    <!--              v-model="info.values">-->
    <!--      </mt-datetime-picker>-->
    <!--    </div>-->
    <!--  选择框-->
    <div :class="['input','block',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'select_input'">
      <div>
        <select v-model="info.value">
          <option disabled value="">请选择</option>
          <option v-for="item in JSON.parse(info.data)"
                  :key="item.value">
            {{item.value}}
          </option>
        </select>
      </div>
    </div>
    <!--  签字-->
    <div :class="['input','block',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'autograph'">
      <div>
        <div> <img
             class="signature"
             :src="info.value"
          ></div>
        <img @click="showSignature"
             class="signature"
             src="../assets/signature.png"
             alt="签字">
        <Signature v-show="showSignatureFlag"
                   @cancelBack="cancelBack"
                   @saveBack="saveBack"></Signature>
      </div>
    </div>
    <!--  盖章-->
    <div :class="['input','block',{'none' : hasBottom}]"
         v-if="info.from_item_type === 'signet'">
      <div>
        <div v-show="info.value"><img class="signature"
             :src="info.value"
             alt="盖章">   </div> 
        <div class="height10"></div>
        <img @click="showSignet"
             class="signature"
             src="../assets/signet.png"
             alt="盖章">
        
        <Signet v-show="showSignetFlag"
                :info="signetList"
                @signetSave="signetSave"
                @signetCancel="signetCancel"></Signet>
      </div>
    </div>
    <!--  分界线-->
    <div class="title" v-if="info.from_item_type === 'dividing_line'">{{info.from_item_name}}</div>
  </div>
</template>

<script>
  import Signature from '@/components/Signature.vue'
  import Signet from '@/components/Signet.vue'

  export default {
    name: "",
    props: {
      info: {
        type: Object,
        required: true
      },
      hasBottom: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        overcome: ['take_photo', 'dividing_line', 'time_input', 'date_input'],//不需要渲染的表单类型
        value: '',
        showSignatureFlag: false,
        showSignetFlag: false,
        signetList: [],
        userInfo:{},
      }
    },
    components: {
      Signature,
      Signet
    },
    created() {
        this.userInfo=this.$storage.get("userInfo");
       // console.log(this.userInfo)
    },
    methods: {
      //日期弹出
      openPicker() {
        this.$refs.picker.open();
      },
      // 日期确定
      handleConfirm(val) {
        this.info.value = val.toLocaleDateString().replace(/\//g, '-')
      },
      // 签字取消
      cancelBack() {
        this.showSignatureFlag = false
      },
      // 签字显示
      showSignature() {
        this.showSignatureFlag = true
      },
      // 签字保存
      saveBack(url) {
        //console.log(url)
        this.info.value = url
        this.showSignatureFlag = false
      },
      // 盖章显示
      showSignet() {
        this.$indicator.open({
          text: '加载印章中...',
          spinnerType: 'double-bounce'
        })
        this.$get('/policy/queryCerInfos',
            // {idNo: '412726199604305413', cTypeId: 11})
            {idNo: this.userInfo.card, cTypeId: 11})
            .then((res) => {
              if (res.resultCode === 995 || res.resultCode === 200) {
                this.signetList = res.data || []
                this.showSignetFlag = true
                this.$indicator.close()
              } else {
                this.$indicator.close()
              }
            })
      },
      // 盖章取消
      signetCancel() {
        this.showSignetFlag = false
      },
      //盖章保存
      signetSave(url) {
        this.info.value = url
      }
    }
  }
</script>

<style scoped>
  .height10{
    height: 10px;
  }
  .title {
    width: 96vw;

    line-height: 40px;
    font-size: 4.26vw;
    color: #333333;
    background-color: #f2f2f2;
    padding-left: 4vw;
    margin-left: -4vw;
    font-weight: 600
  }

  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*height: 54px;*/
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
    padding: 10px 0;
    margin-bottom: 5px
  }

  .input label {
    font-size: 4.27vw;
    color: #333333
  }

  .input input[type='text'],
  .input input[type='number'],
  .input select,
  .input textarea {
    width: 92vw;
    font-size: 4.27vw;
    color: #333333;
    border: none;
    outline: none;
    background-color: #ffffff
  }

  .input input[type='text']::-webkit-input-placeholder,
  .input input[type='number']::-webkit-input-placeholder,
  .input select, ::-webkit-input-placeholder,
  .input textarea::-webkit-input-placeholder {
    color: #999999
  }

  .none {
    border: none;

  }

  .radio-block {
    display: flex;
    align-items: center;
    height: 6vw;
    padding: 6px 0
  }

  .block {
    display: block;
    text-align: center
  }

  .date-line {
    width: 92vw;
    height: 20px;
  }

  .signature {
    width: 40vw;
  }
</style>