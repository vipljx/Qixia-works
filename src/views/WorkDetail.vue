<template>
  <div class="bg">
    <Header :title="title" to="/workList"></Header>
    <img :src="imgPath" alt="指南">
    <div class="button-block">
      <mt-button class="button" type="primary" @click="toBid">申办</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {
        title: '',
        sId: '',
        imgPath: ''
      }
    },
    created() {
      this.title = this.$route.params.title || ''
      this.sId = sessionStorage.getItem('sId')
      this.loadImg()
    },
    mounted() {
    },
    methods: {
      loadImg() {
        this.$post('/mynj/queryKnowsBySId', {sId: this.sId}).then((res) => {
          if (res.resultCode === 200) {
            this.imgPath = res.data[0].kPath
          }
        })
      },
      toBid() {
        this.insertBusApplys()
      },
      //当前办事新增 回调当前事项主id
      insertBusApplys() {
        this.$post('/mynj/insertBusApplys', {sId: this.sId, uId: sessionStorage.getItem('uId')}).then((res) => {
          //console.log(res)
          if (res.resultCode === 200) {
            
            let obj = {
              aId: res.data.aId,
              title:this.title 
            }
            sessionStorage.setItem('workInfo', JSON.stringify(obj))
            sessionStorage.removeItem('personInfo')
            sessionStorage.removeItem('addressInfo')
            this.$router.push({
              name: 'bid'
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
    background-color: #f2f2f2
  }

  img {
    width: 100vw
  }
</style>