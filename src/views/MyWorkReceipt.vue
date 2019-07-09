<template>
  <div class="bg">
    <Header :title="myWorkInfo.workTitle" to="/myWorkList"></Header>
    <img :src="imgPath" alt="受理回执">
    <div class="button-block">
      <mt-button class="button" type="primary" @click="goMyWorkDetail">查看详情</mt-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "MyWorkReceipt",
    data() {
      return {
        myWorkInfo: {},
        imgPath: ''
      }
    },
    created() {
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo'))
      this.loadReceipt()
    },
    methods: {
      loadReceipt() {
        this.$post('/mynj/queryAccRecsByaId', {
          aId: this.myWorkInfo.aId
        }).then((res) => {
          if (res.resultCode === 200) {
            this.imgPath = res.data.accus.receiptPath
          }
        })
      },
      goMyWorkDetail() {
        if (this.myWorkInfo.code === 5) {
          this.toWait()
        } else {
          this.$router.push({
            name: 'myWorkDetailNoNeedToChange'
          })
        }
      },
      //待受理
      toWait() {
        this.$post('/mynj/queryBusApplyByaId', {
          aId: this.myWorkInfo.aId
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
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>