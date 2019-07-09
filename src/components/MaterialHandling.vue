<template>
  <div :class="['input',{'none' : hasBottom},'flex']">
    <label class="cName flex1">{{info.cName}}</label>
    <div>
      <button
              :class="['button',info.type ? 'w' : 't']"
              v-if="!info.status"
              @click="callBack(index)"
      >
        {{info.type ? '填写' : '上传'}}
      </button>
      <div
              v-if="info.status"
              class="hasDown"
              @click="callBack(index)"
      >
        <span>{{info.type ? '已填写' : '已上传'}}</span>
        <img src="../assets/to-right.png" alt="">
      </div>
    </div>
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
      },
      index: {
        type: Number,
        required: true
      }
    },
    methods: {
      callBack(i) {
        this.$emit('clickCallBack', i, this.info)
      }
    }
  }
</script>

<style scoped>
  .flex{
    display: flex
  }
  .flex1{
    flex: 1
  }
  .cName{
    text-align: left
  }
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
  }

  .input label {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .none {
    border: none;
    padding: 0;
  }

  .button {
    /*width: 14.67vw;*/
    width: auto;
    padding: 0 2vw;
    height: 30px;
    font-size: 3.74vw;
    color: #ffffff;
    border: none;
    outline: none;
  }

  .w {
    background-color: #5f9dee;
  }

  .t {
    background-color: #5ac999;
  }

  .hasDown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 14.67vw;
    height: 30px;
    font-size: 3.74vw;
    color: #666666;
  }

  .hasDown img {
    width: 7px;
    height: 14px;
  }
</style>