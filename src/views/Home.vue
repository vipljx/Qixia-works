<template>
  <div>
    <tab></tab>
  </div>
</template>

<script>
// @ is an alias to /src
import Tab from '@/components/Tab.vue'

export default {
  created() {
    //this.$toast('申办成功')
  },
  name: 'home',
  components: {
    Tab
  }
}
</script>
