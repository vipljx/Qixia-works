<template>
  <div class="p">
    <div :class="['content',hasBorder ? 'border-none' : '']" @click="goDetail(info)">
      <div>
        <h5>{{wType === 3 ? info.cContent : wType === 5 ? info.pTitle : wType === 4 ? info.sName : info.aContent}}</h5>
        <span>{{wType === 3 ? info.createTime.split(' ')[0] : wType === 5 ? info.createTime : wType === 4 ? info.evaluateTime ? info.evaluateTime : info.aTime : info.aTime.split(' ')[0]}}</span>
      </div>
      <div class="img-block"
           v-if="!isEvaluate && wType !== 5">
        <img src="../assets/to-right.png" alt="to-right">
      </div>
      <div class="img-block"
           v-if="isEvaluate">
        <span v-if="info.evaluateLevel">{{evaluate[info.evaluateLevel - 1]}}</span>
        <button v-else class="evaluate">去评价</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TitleTimeList",
    props: {
      hasBorder: {
        type: Boolean,
        required: true
      },
      isEvaluate: {
        type: Boolean,
        default: false
      },
      wType: {
        type: Number
      },
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        evaluate: ['满意', '一般', '不满意']
      }
    },
    methods: {
      goDetail(info) {
        switch (this.wType) {
            // case 1:
            //   this.goNewsDetail(info)
            //   break
          case 2:
            this.goCDetail(info, 0)
            break
          case 3:
            this.goCDetail(info, 1)
            break
          case 4:
            this.goEvaluateDetail(info)
            break
          case 5:
            this.goPolicy(info)
            break
        }
      },
      // goNewsDetail(info) {
      //
      // },
      goCDetail(info, type) {
        this.$router.push({
          name: 'cOrCDetail',
          params: {
            info: info,
            type: type
          }
        })
      },
      goEvaluateDetail(info) {
        let data = {
          aId: info.aId,
          code: 0,
          title: "已办结",
          workTitle: info.sName,
          where: 'evaluate'
        }
        sessionStorage.setItem('myWorkInfo', JSON.stringify(data))
        this.$router.push({
          name: 'myWorkDetailNoNeedToChange'
        })
      },
      goPolicy(info) {
        this.$router.push({
          name: 'newsDetail',
          params: {
            title: info.pTitle,
            time: info.createTime,
            content: info.pContent,
            type: 1
          }
        })
      }
    }
  }
</script>

<style scoped>
  .p {
    padding: 0 20px;
    background-color: #ffffff
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #cccccc;
  }

  .border-none {
    border: none;
  }

  .content h5 {
    font-size: 4.27vw;
    color: #333333;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 50vw
  }

  .content span {
    font-size: 3.74vw;
    color: #999999;
    margin: 10px 0;
    line-height: 20px
  }

  .content img {
    width: 7px;
    height: 14px;
    margin-left: 5px
  }

  .img-block {
    display: flex;
    align-items: center
  }

  .evaluate {
    font-size: 3.74vw;
    color: #3785ea;
    border: 1px solid #3785ea;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    padding: 5px 10px;
    background-color: #ffffff;
    outline: none
  }
</style>