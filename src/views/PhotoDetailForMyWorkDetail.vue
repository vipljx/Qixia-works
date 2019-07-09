<template>
  <div class="bg">
    <Header :title="myWorkInfo.workTitle" to="/myWorkDetailNoNeedToChange"></Header>
    <div v-if="type">
      <img v-for="item in imgList" :key="item.acId" :src="item.cPath" :alt="item.cName">
    </div>
    <div v-if="!type">
      <img v-for="item in imgList" :key="item.afId" :src="item.fPath" :alt="item.fName">
    </div>
    <!--    <iframe v-if="!type && (item.fPath.slice(-4) === 'docx' || item.fPath.slice(-3) === 'doc')" v-for="item in imgList" :key="item.afId"-->
    <!--            :src="item.fPath"></iframe>-->
    <!--    <div v-if="!type && (item.fPath.slice(-4) === 'docx' || item.fPath.slice(-3) === 'doc')">-->
    <!--      暂不支持在线浏览docx文档-->
    <!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "PhotoDetailForMyWorkDetail",
    data() {
      return {
        myWorkInfo: {},
        imgList: [],
        id: '',
        type: 0
      }
    },
    created() {
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo'))
      this.id = this.$route.params.id
      this.type = this.$route.params.type
      if (this.type) {
        this.loadByCid()
      } else {
        this.loadByFid()
      }
    },
    methods: {
      loadByCid() {
        this.$post('/mynj/queryBusApplyFilesByaId', {
          aId: this.myWorkInfo.aId,
          cId: this.id
        })
            .then((res) => {
              if (res.resultCode === 200) {
                this.imgList = res.data.certs
              }
            })
      },
      loadByFid() {
        this.$post('/mynj/queryBusApplyFilesByfId', {
          aId: this.myWorkInfo.aId,
          fId: this.id
        })
            .then((res) => {
              if (res.resultCode === 200) {
                this.imgList = res.data.files
              }
            })
      }
    }
  }
</script>

<style scoped>
  .bg > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 90%;
    margin-bottom: 10px;
    border: 1px solid #cccccc;
  }
</style>