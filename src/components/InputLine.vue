<template>
  <div :class="['input',{'none' : hasBottom}]">
    <label>{{info.label}}</label>
    <input
            :type="info.type"
            v-model="info.value"
            :placeholder="info.placeholder"
            :readonly="info.readonly"
            @input="checkType"
    >
  </div>
</template>

<script>
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
    methods: {
      checkType(e) {
        if (this.info.type !== 'number') {
          return false
        }
        let val = e.target.value
        let data = this.info
        if (/\D/.test(val)) {
          data.value = ''
          this.info = data
        } else {
          data.value = val
          this.info = data
        }
      }
    }
  }
</script>

<style scoped>
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
  }

  .input label {
    font-size: 4.27vw;
    color: #333333;
  }

  .input input {
    width: 60vw;
    text-align: right;
    font-size: 4.27vw;
    color: #333333;
    border: none;
    outline: none;
    background-color: #ffffff;
  }

  .input input::-webkit-input-placeholder {
    color: #999999;
  }

  .none {
    border: none;
  }
</style>