<template>
  <div class="bg">
    <Header title="实体大厅指南"></Header>
    <div class="hall-list"
         v-for="item in list"
         :key="item.wWorkName">
      <Hall :info="item"></Hall>
    </div>
  </div>
</template>

<script>
  import Hall from '@/components/Hall.vue'

  export default {
    name: "HallList",
    components: {
      Hall
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      let hall = JSON.parse(sessionStorage.getItem('hall'))
      if (hall) {
        this.list = hall
      } else {
        this.loadHall()
      }
    },
    methods: {
      //加载大厅指南
      loadHall() {
        this.$get('/policy/queryQxzwWorkHall').then((res) => {
          if (res.resultCode === 200) {
            this.list = res.data
          } else {
            this.list = []
          }
        })
      },
    }
  }
</script>

<style scoped>
  .hall-list {
    padding: 5px 5.33vw;
    background-color: #ffffff;
    border-top: 1px solid #e3e3e3;
    margin-bottom: 5px
  }
</style>