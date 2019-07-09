<template>
  <div class="list-content">
    <div :class="['list',hasBorder ? 'border-none' : '']" @click="toNext">
      <div>{{title}}</div>
      <img src="../assets/to-right.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      title: {
        type: String,
        required: true
      },
      hasBorder: {
        type: Boolean,
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
  .list-content {
    padding: 0 10px;
    background-color: #ffffff;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #cccccc;
  }

  .border-none {
    border: none;
  }

  .list div {
    width: 60vw;
    font-size: 3.74vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list img {
    width: 7px;
    height: 14px;
  }
</style>