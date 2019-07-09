<template>
  <div>
    <p v-for="item in items" :key="item.id">{{item.message}}</p>
    <button class="btn" @click="btn2Click()">动态赋值</button>
    <br />
    <br />
    <button class="btn" @click="btn3Click()">为data新增属性</button>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      items: [
        { message: "Test one", id: "1" },
        { message: "Test two", id: "2" },
        { message: "Test three", id: "3" }
      ]
    };
  },
  methods: {
    btn2Click: function() {
      //Vue methods中的this 指向的是Vue的实例，这里可以直接在this中找到items
      this.items.push({
           message: "Test four", id: "4"
      })
    },
    btn3Click: function() {
      var itemLen = this.items.length;
      Vue.set(this.items, itemLen, { message: "Test add attr", id: itemLen });
    }
  }
};
</script>
<style scoped>
</style>

