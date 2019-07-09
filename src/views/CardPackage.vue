<template>
  <div class="bg">
    <Header title="我的证照"></Header>
    <div class="block" v-for="(block,i) in cardInfo" :key="block.name">
      <section>{{block.name}}</section>
      <div class="content">
        <div v-for="(card,j) in block.child"
             :key="card.cTypeId"
             @click="toCardDetail(i,j)">
          <!--          <img src="http://source.tanyangnet.com/sd/structure/1557308012090.png" alt="">-->
          <img :src="card.cerInfoList2 ? card.cIco : card.cIcoNo" :alt="card.cTypeName">
          <span>{{card.cTypeName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CardPackage",
    data() {
      return {
        cardInfo: []
      }
    },
    created() {
      this.loadCardInfo()
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      loadCardInfo() {
        this.$get('/policy/queryQxzwCerInfos', {
          idNo: JSON.parse(sessionStorage.getItem('userInfo')).card
        }).then((res) => {
          if (res.resultCode === 200) {
            this.cardInfo = res.data
          }
        })
      },
      toCardDetail(i, j) {
        let info = this.cardInfo[i].child[j]
        //身份证
        if (info.cTypeId === 4) {
          this.$indicator.open({
            text: '加载身份证信息',
            spinnerType: 'double-bounce'
          })
          this.$get('/policy/queryByIdNoAndcTypeId', {
            idNo: JSON.parse(sessionStorage.getItem('userInfo')).card,
            cTypeId: info.cTypeId
          }).then((res) => {
            if (res.resultCode === 200) {
              let zPath = '', fPath = ''
              res.data.forEach(item => {
                if (item.dName === '身份证正面') {
                  zPath = item.dUrl
                } else {
                  fPath = item.dUrl
                }
              })
              this.$router.push({
                name: 'iDCardModify',
                params: {
                  IDCardFrontPath: zPath,
                  IDCardBackPath: fPath,
                  type: 1
                }
              })
              this.$indicator.close()
            } else {
              this.$indicator.close()
              this.toast(res.message)
            }
          })
        } else {
          //其他证照
          this.$router.push({
            name: 'myCardDetail',
            params: {
              info: info
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .block {
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .block section {
    height: 40px;
    line-height: 40px;
    font-size: 4vw;
    color: #333333;
    padding: 0 4.3vw;
    border-bottom: 1px solid #cccccc;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4.3vw;
  }

  .content > div {
    width: 22.8vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 10px
  }

  .content img {
    width: 12vw;
    height: 12vw;
    margin: 10px 0;
  }

  .content span {
    font-size: 3.74vw;
    color: #666666;
  }
</style>