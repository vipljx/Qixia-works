<template>
  <div class="bg">
    <Header :title="title"></Header>
    <List v-for="(item,index) in list"
          :key="item.sId"
          :title="item.sName"
          :hasBorder="(index + 1) === list.length"
          @next="toNext(item.sId, item.sName, item.dId)"
    ></List>
  </div>
</template>

<script>
  import List from '@/components/List.vue'

  export default {
    name: "",
    components: {
      List
    },
    data() {
      return {
        title: '',
        list: []
      }
    },
    created() {
      let obj = JSON.parse(sessionStorage.getItem('workListParams'))
      this.title = obj.title || ''
      this.loadList(obj.id, obj.type)
    },
    mounted() {
    },
    methods: {
      loadList(id, type) {
        if (type !== 2) {
          this.$get('/dep/relList', {typeId: id}).then((res) => {
            if (res.resultCode === 200) {
              this.list = res.data.list || []
            }
          })
        } else {
          this.$get('/dep/busListKey', {dId: id}).then((res) => {
            if (res.resultCode === 200) {
              this.list = res.data || []
            }
          })
        }

      },
      toNext(sId, title, dId) {
        this.$get('/dep/busList', {sId: sId}).then((res) => {
          if (res.resultCode === 200) {
            this.title = title
            this.list = res.data.list || []
          } else {
            sessionStorage.setItem('sId', sId)
            sessionStorage.setItem('dId', dId)
            this.$router.push({
              name: 'workDetail',
              params: {
                title: title
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    height: 100vh;
    background-color: #f2f2f2;
  }

</style>