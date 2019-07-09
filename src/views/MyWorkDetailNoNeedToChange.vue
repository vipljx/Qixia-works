<template>
  <div class="bg">
    <Header :title="myWorkInfo.workTitle" :to="myWorkInfo.where ? '/TwoNavBar' : '/myWorkReceipt'"
            :has-margin="false"></Header>
    <section class="mt">申请人信息</section>
    <div class="block">
      <div class="row"><span>姓名</span><span>{{infoList[0]}}</span></div>
      <div class="row"><span>证件号</span><span>{{infoList[2]}}</span></div>
      <div class="row"><span>手机号</span><span>{{infoList[3]}}</span></div>
      <div class="row"><span>申请时间</span><span>{{aTime}}</span></div>
      <div class="row"><span>办件状态</span><span class="b">{{myWorkInfo.title}}</span></div>
    </div>
    <section>所属材料</section>
    <div class="block">
      <div class="row" v-for="(item,index) in materialHandling" :key="item.cName" @click="toDetail(index)"><span>{{item.cName}}</span><img
              src="../assets/to-right.png" alt=""></div>
    </div>
    <section>收件方式</section>
    <div class="block">
      <div class="row"><span>{{mail === 1 ? '自取' : 'EMS邮政'}}</span></div>
      <div class="row" v-if="mail === 2"><span>{{infoList[4]}}</span></div>
    </div>
    <!--    已办结评价-->
    <div v-if="myWorkInfo.code === 0">
      <div v-if="isEvaluate || hasEvaluate">
        <section>我的评价</section>
        <div class="evaluate">
          <div v-for="(item,index) in evaluate" :key="item" @click="chooseEvaluate(index)">
            <img v-if="evaluateLevel === (index+1)" :src="require('../assets/eva-c-' + index + '.png')" :alt="item">
            <img v-else :src="require('../assets/eva-' + index + '.png')" :alt="item">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="button-block" v-if="!hasEvaluate && !reviewed">
        <mt-button class="button" type="primary" @click="makeEvaluate">{{isEvaluate ? '提交' : '我要评价'}}</mt-button>
      </div>
    </div>
    <!--    待签字-->
    <div v-if="myWorkInfo.code === 10">
      <div class="button-block">
        <mt-button class="button" type="primary" @click="toSign">去签字</mt-button>
      </div>
    </div>
    <!--    待补正-->
    <div v-if="myWorkInfo.code === 5">
      <div class="button-block">
        <mt-button class="button" type="primary" @click="toBZ">去补正</mt-button>
      </div>
    </div>
    <!--    已过号-->
    <div v-if="myWorkInfo.code === 8">
      <div class="button-block">
        <mt-button class="button" type="primary" @click="restart">重申请</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyWorkDetailNoNeedToChange",
    data() {
      return {
        myWorkInfo: {},
        infoList: [],
        uName: '',
        cardNo: '',
        mobile: '',
        mail: '',
        aTime: '',
        sId: '',
        materialHandling: [],
        //评价
        hasEvaluate: false,//是否已经评价
        evaluate: ['满意', '一般', '不满意'],//评价类型
        isEvaluate: false,//是否在评价
        evaluateLevel: 1,//评价等级
        reviewed: false //已评价
      }
    },
    created() {
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo'))
      this.loadInfo()
      this.loadEvaluate()
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      //加载申请人信息
      loadInfo() {
        this.$post('/mynj/queryBusApplyByaId', {
          aId: this.myWorkInfo.aId
        }).then((res) => {
          if (res.resultCode === 200) {
            let data = res.data
            let arr = data.agent.split(',')
            let infoList = []
            arr.forEach(item => {
              infoList.push(item.split(':')[1])
            })
            this.uName = data.uName
            this.cardNo = data.cardNo
            this.mobile = data.mobile
            this.sId = data.sId
            this.aTime = data.aTime
            this.mail = data.mail
            this.infoList = infoList
            this.loadMaterialList()
          }
        })
      },
      //加载材料列表
      loadMaterialList() {
        this.$post('/mynj/getFilesBysId', {
          sId: this.sId,
          idNo: this.infoList[2]
        })
            .then((res) => {
              if (res.resultCode === 200) {
                let fList = res.data.fList
                let cList = res.data.cList
                fList.forEach(item => {
                  item.cName = item.fName
                })
                this.materialHandling = fList.concat(cList)
              }
            })
      },
      // 是否以评价
      loadEvaluate() {
        this.$get('/acc/isApply', {
          aId: this.myWorkInfo.aId
        }).then((res) => {
          if (res.resultCode === 200 && res.data.eva === 0) {
            this.hasEvaluate = true
            this.evaluateLevel = res.data.obj.evaluateLevel
          }
        })
      },
      // 材料详情
      toDetail(i) {
        // photoDetailForMyWorkDetail
        this.$router.push({
          name: 'photoDetailForMyWorkDetail',
          params: {
            type: this.materialHandling[i].fName ? 0 : 1,
            id: this.materialHandling[i].fName ? this.materialHandling[i].fId : this.materialHandling[i].cId
          }
        })
      },
      // 选择评价等级
      chooseEvaluate(i) {
        if (!this.hasEvaluate && !this.reviewed) {
          this.evaluateLevel = i + 1
        }
      },
      // 评价
      makeEvaluate() {
        if (this.isEvaluate) {
          this.$get('/acc/eva', {
            aId: this.myWorkInfo.aId,
            uId: sessionStorage.getItem('uId'),
            evaluateLevel: this.evaluateLevel
          }).then((res) => {
            if (res.resultCode === 200) {
              this.reviewed = true
              this.$toast({
                message: '评价成功',
                position: 'middle',
                duration: 2000
              })
            }
          })
        } else {
          this.isEvaluate = true
        }
      },
      //去签字
      toSign() {
        this.$get('/acc/QsignsigndocMyMp', {
          aId: this.myWorkInfo.aId
        }).then((res) => {
          if (res.resultCode === 200) {
            let apiId = res.data.apiid;
            let key = res.data.key;
            let signed = res.data.signed;
            let content = res.data.content;
            window.location.href = 'https://qsign.njnotary.cn/witness/api/v2/qxcz/signdoc?apiid=' + apiId + '&key=' + encodeURIComponent(key) + '&content=' + encodeURIComponent(content) + '&signed=' + encodeURIComponent(signed)
          }
        })
      },
      //补正
      toBZ() {
        this.$post('/mynj/updateBusApplysBz', {
          aId: this.myWorkInfo.aId,
          source: 3
        }).then((res) => {
          if (res.resultCode === 200) {
            this.toast('补正成功')
            setTimeout(() => {
              this.$router.push({
                name: 'myWork'
              })
            }, 2000)
          }
        })
      },
      //已过号
      restart() {

      }
    }
  }
</script>

<style scoped>
  .mt {
    margin-top: 40px;
  }

  section {
    /*height: 40px;*/
    /*line-height: 40px;*/
    font-size: 4.26vw;
    color: #1a1a1a;
    padding: 10px 4vw
  }

  .block {
    padding: 0 4vw;
    background-color: #ffffff;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    color: #333333;
    padding: 15px 0;
  }

  .block .row:last-child {
    border: none;
  }

  .row .b {
    color: #3785ea;
  }

  .row img {
    width: 7px;
    height: 14px;
  }

  .evaluate {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    padding: 20px 0;
  }

  .evaluate > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .evaluate img {
    width: 45px;
    height: 45px;
    margin-bottom: 10px;
  }

  .evaluate span {
    font-size: 15px;
    color: #666666;
  }
</style>