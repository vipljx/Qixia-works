<template>
  <div :class="['list',hasBorder ? 'border-none' : '']" @click="toNext">
    <h5>{{type ? info.pTitle : info.sName}}</h5>
    <div>
      <span v-if="type">{{info.createTime}}</span>
      <span v-else>{{info.d_name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PolicyStatement",
    props: {
      info: {
        type: Object,
        required: true
      },
      hasBorder: {
        type: Boolean,
        required: true
      },
      type: {
        type: Number,
        required: true
      }
    },
    methods: {
      toNext() {
        this.$emit('next', 1)
      }
    }
  }
</script>

<style scoped>
  .list {
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
    padding: 3px 0 5px;
  }

  .list h5 {
    font-size: 4vw;
    color: #333333;
    margin: 3px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .list span {
    font-size: 3.74vw;
    color: #666666;
  }

  .list span:first-child {
    margin-right: 20px;
  }

  .border-none {
    border: none;
  }
</style>