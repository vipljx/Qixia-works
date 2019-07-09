<template>
  <div>
    <mt-header fixed :title="title">
      <router-link :to="to" :slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="h50" v-if="hasMargin"></div>

  </div>
</template>

<script>
  export default {
    name: "Header",
    props: {
      title: {
        type: String,
        required: true
      },
      to: {
        type: String,
        default: '/'
      },
      left: {
        type: String,
        default: 'left'
      },
      hasMargin: {
        type: Boolean,
        default: true
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .h50 {
    height: 50px;
  }
  
</style>