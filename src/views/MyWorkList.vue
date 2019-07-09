<template>
  <div class="bg">
    <Header :title="myWorkInfo.title" to="/myWork"></Header>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <List v-for="(item,index) in list"
            :key="item.aTime"
            :title="item.sName"
            :hasBorder="(index + 1) === list.length"
            @next="toNext(index)"
      ></List>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import axios from 'axios'

  export default {
    name: "MyWorkList",
    components: {
      List
    },
    data() {
      return {
        list: [],
        loading: false,
        page: 1,
        hasNextPage: true,
        hasReceipt: [0, 4, 5, 10]
      }
    },
    created() {
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo'))
      this.load(this.page)
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      load(page) {
        this.$post('mynj/queryApplyBusByState', {
          uId: sessionStorage.getItem('uId'),
          state: this.myWorkInfo.code,
          currentPage: page,
          size: 10
        }).then((res) => {
          
          if (res.resultCode === 200) {
            let arr = this.list
            this.list = arr.concat(res.data.list)
            if (res.data.list.length < 10) {
              this.hasNextPage = false
            }
            console.log(res.data.list)
          }
        })
      },
      toNext(i) {
        let myWorkInfo = this.myWorkInfo
        myWorkInfo.workTitle = this.list[i].sName
        myWorkInfo.aId = this.list[i].aId
        myWorkInfo.state = this.list[i].state
        sessionStorage.setItem('myWorkInfo', JSON.stringify(myWorkInfo))
        //待审批 待补正 已办结
        if (this.hasReceipt.indexOf(this.myWorkInfo.code) !== -1) {
          this.$router.push({
            name: 'myWorkReceipt'
          })
        }
        // else if (this.myWorkInfo.code === 10 || this.myWorkInfo.code === 8) {
        //   this.$router.push({
        //     name: 'myWorkDetailNoNeedToChange'
        //   })
        // }
        else if (this.myWorkInfo.code === 2 || this.myWorkInfo.code === 5) {
          this.toWait(i)
        }
      },
      //待受理
      toWait(i) {
        this.$post('/mynj/queryBusApplyByaId', {
          aId: this.list[i].aId
        }).then((res) => {
          if (res.resultCode === 200) {
            let aId, sId, dId, title, aTime
            let data = res.data
            let arr = data.agent.split(',')
            let userInfoList = []
            //申办人信息
            arr.forEach(item => {
              userInfoList.push(item.split(':')[1])
            })
            aId = data.aId
            sId = data.sId
            title = data.sName
            aTime = data.aTime

            // dId = data.dId
            //事项所需材料
            this.$post('/mynj/getFilesBysId', {
              sId: sId,
              idNo: userInfoList[2]
            }).then((res) => {
              if (res.resultCode === 200) {
                let fList = res.data.fList
                let cList = res.data.cList
                let allList = []
                fList.forEach(item => {
                  item.cName = item.fName
                })
                //所需材料
                allList = fList.concat(cList)
                //遍历材料 加载每项材料信息
                let axiosArr = []
                allList.forEach(item => {
                  if (item.cId) {
                    axiosArr.push(this.$post('/mynj/queryBusApplyFilesByaId', {
                      aId: aId,
                      cId: item.cId
                    }))
                  } else {
                    axiosArr.push(this.$post('/mynj/queryBusApplyFilesByfId', {
                      aId: aId,
                      fId: item.fId
                    }))
                  }
                })
                //console.log(allList)
                axios.all(axiosArr)
                    .then((res) => {
                      //每项材料的已上传内容
                      let resp = res
                      let workInfo = {}
                      allList.forEach((item, index) => {
                        if (item.fromId) {
                          workInfo['material_' + index] = resp[index].data.files[0]
                        } else if (item.cType === 4 && resp[index].data.certs.length > 0) {
                          workInfo['IDCardInfo'] = {
                            index: index,
                            frontInfo: resp[index].data.certs[0].cPath.slice(-6, -5) === 'Z' ? resp[index].data.certs[0].cPath : resp[index].data.certs[1].cPath,
                            backInfo: resp[index].data.certs[0].cPath.slice(-6, -5) === 'F' ? resp[index].data.certs[0].cPath : resp[index].data.certs[1].cPath
                          }
                        } else {
                          if (item.fId) {
                            resp[index].data.files.forEach(item => {
                              item.src = item.fPath
                            })
                            workInfo['material_' + index] = resp[index].data.files
                          } else {
                            resp[index].data.certs.forEach(item => {
                              item.src = item.cPath
                            })
                            workInfo['material_' + index] = resp[index].data.certs
                          }
                        }
                      })
                      //办件信息
                      workInfo.aId = aId
                      workInfo.where = '/myWorkList'
                      workInfo.title = title
                      workInfo.aTime = aTime
                      //申请人信息
                      let personInfo = {
                        name: userInfoList[0],
                        card: userInfoList[2],
                        phone: userInfoList[3]
                      }
                      //邮寄信息
                      let addressInfo = {
                        address: userInfoList[4],
                        mail: data.mail
                      }
                      sessionStorage.setItem('sId', sId)
                      sessionStorage.setItem('dId', dId)
                      sessionStorage.setItem('workInfo', JSON.stringify(workInfo))
                      sessionStorage.setItem('personInfo', JSON.stringify(personInfo))
                      sessionStorage.setItem('addressInfo', JSON.stringify(addressInfo))
                      this.$router.push({
                        name: 'bid'
                      })
                    })
              }
            })
          }
        })

      },
      loadMore() {
        if (this.hasNextPage) {
          this.page = this.page + 1
          this.load(this.page)
        } else {
          this.toast('没有更多数据了')
        }
      }
    }
  }
</script>

<style scoped>

</style>