<template>
  <div class="bg">
    <Header :title="workInfo.title ? workInfo.title : '在线申办'" :to="to"></Header>
    <div>
      <div class="title" style="margin-top: -10px;">申请人信息</div>
      <div class="input-block">
        <input-line v-for="(item,index) in applicantInformation"
                    :key="item.placeholder"
                    :info="item"
                    :hasBottom="(index + 1) === applicantInformation.length"
        ></input-line>
      </div>
      <div class="block" v-if="workInfo.aTime">
        <div class="row" style="border-top: 1px solid #cccccc"><span>申请时间</span><span>{{workInfo.aTime}}</span></div>
        <div class="row"><span>办件状态</span><span class="b">{{myWorkInfo.title}}</span></div>
      </div>
    </div>
    <div v-if="materialHandling.length">
      <div class="title">所需材料</div>
      <div class="input-block">
        <material-handling v-for="(item,index) in materialHandling"
                           :key="item.label"
                           :info="item"
                           :index="index"
                           :hasBottom="(index + 1) === materialHandling.length"
                           @clickCallBack="clickCallBack"
        ></material-handling>
      </div>
    </div>
    <div>
      <div class="title">收件方式</div>
      <mt-radio v-model="receivingMethod"
                :options="receivingMethodOptions">
      </mt-radio>
      <div class="input-block" v-show="showAddress">
        <input-line v-for="(item,index) in address"
                    :key="item.placeholder"
                    :info="item"
                    :hasBottom="(index + 1) === address.length"
        ></input-line>
      </div>
    </div>
    <div class="button-block">
      <mt-button v-if="myWorkInfo.state!=2" class="button" type="primary" @click="update">{{myWorkInfo.code === 5 ? '补正' : '提交'}}</mt-button>
      <mt-button v-if="myWorkInfo.state==2"  class="button2" type="default" @click="back">返回</mt-button>
    </div>
  </div>
</template>

<script>
  import InputLine from '@/components/InputLine.vue'
  import MaterialHandling from '@/components/MaterialHandling.vue'

  export default {
    name: "",
    data() {
      return {
        sId: '',
        aId: '',
        userName: '',
        cardNum: '',
        phone: '',
        to: '/workList',
        applicantInformation: [
          {
            label: '姓名',
            type: 'text',
            value: '',
            placeholder: '请输入姓名'
          },
          {
            label: '身份证号',
            type: 'tel',
            value: '',
            placeholder: '请输入身份证号',
            reg:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
          },
          // {
          //   label: '性别',
          //   type: 'text',
          //   value: '',
          //   placeholder: '请输入性别（男 / 女）'
          // },
          {
            label: '手机号',
            type: 'number',
            value: '',
            placeholder: '请输入手机号',
            reg:/^1[3456789]\d{9}$/
          }
        ],
        materialHandling: [],
        receivingMethod: '1',
        receivingMethodOptions: [{
          label: '自取',
          value: '1'
        },
          {
            label: 'EMS邮政',
            value: '2'
          }
        ],
        address: [
          {
            label: '收件地址',
            type: 'text',
            value: '',
            placeholder: '请输入收件地址'
          }
        ],
        showAddress: false,
        workInfo: {},
        myWorkInfo: {},
        isMaterialDown: false//材料加载是否完成
      }
    },
    components: {
      InputLine,
      MaterialHandling
    },
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.workInfo = JSON.parse(sessionStorage.getItem('workInfo'))
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo')) || {code: ''}
      this.applicantInformation[0].value = userInfo.name
      this.applicantInformation[1].value = userInfo.card
      this.applicantInformation[2].value = userInfo.phone
      this.sId = sessionStorage.getItem('sId')
      this.loadMaterialList()
    },
    methods: {
      back(){
        this.$router.push("/myWorkList")
      },
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      //判断是否已经上传材料 有则回显
      checkMaterial() {
        let info = JSON.parse(sessionStorage.getItem('workInfo'))
        this.materialHandling.forEach((item, index) => {
          // if (item.cName !== '申请人的身份证') {
          if (item.cType !== 4) {
            item.status = info['material_' + index] && info['material_' + index].length !== 0 ? 1 : 0
          }
        })
      },
      //判断是否已经上传身份证 有则回显
      checkIDCard() {
        let info = JSON.parse(sessionStorage.getItem('workInfo'))
        this.to = info.where || '/workList'
        if (info.IDCardInfo) {
          if (info.IDCardInfo.frontInfo) {
            this.materialHandling[info.IDCardInfo.index].status = 1
          }
        }
      },
      //如果有个人信息 则加载
      reloadPersonInfo() {
        let personInfo = JSON.parse(sessionStorage.getItem('personInfo'))
        if (!personInfo) {
          return false
        }
        this.applicantInformation = [
          {
            label: '姓名',
            type: 'text',
            value: personInfo.name,
            placeholder: '请输入姓名'
          },
          {
            label: '身份证号',
            type: 'tel',
            value: personInfo.card,
            placeholder: '请输入身份证号',
            reg:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
          },
          {
            label: '手机号',
            type: 'number',
            value: personInfo.phone,
            placeholder: '请输入手机号',
            reg:/^1[3456789]\d{9}$/
          }
        ]

      },
      //加载地址信息
      loadAddress() {
        let address = sessionStorage.getItem('addressInfo')
        if (address) {
          this.receivingMethod = JSON.parse(address).mail.toString()
          if (JSON.parse(address).mail === 2) {
            this.address = [
              {
                label: '收件地址',
                type: 'text',
                value: JSON.parse(address).address,
                placeholder: '请输入收件地址'
              }
            ]
          }
        }
      },
      //加载材料列表
      loadMaterialList() {
        this.$post('/mynj/getFilesBysId', {
          sId: this.sId,
          idNo: this.applicantInformation[1].value
        })
            .then((res) => {
              if (res.resultCode === 200) {
                this.isMaterialDown = true
                let fList = res.data.fList
                let cList = res.data.cList
                fList.forEach(item => {
                  item.type = 1
                  item.status = 0
                  item.cName = item.fName
                })
                cList.forEach(item => {
                  item.type = 0
                  item.status = 0
                })
                this.materialHandling = fList.concat(cList)
                this.checkIDCard()
                this.checkMaterial()
                this.reloadPersonInfo()
                this.loadAddress()
                console.log(this.materialHandling)
              }
            })
      }
      ,
      clickCallBack(i, info) {
        //有formid => 填写
        if (info.fromId) {
          let personInfo = {
            name: this.applicantInformation[0].value,
            card: this.applicantInformation[1].value,
            phone: this.applicantInformation[2].value
          }
          sessionStorage.setItem('personInfo', JSON.stringify(personInfo))
          sessionStorage.setItem('fId', info.fId)
          sessionStorage.setItem('fName', info.fName)
          this.$router.push({
            name: 'dynaactionform',
            query: {
              id: info.fromId,
              index: i
            }
          })
          //上传身份证
        } else if (this.materialHandling[i].cType === 4) {
          let personInfo = {
            name: this.applicantInformation[0].value,
            card: this.applicantInformation[1].value,
            phone: this.applicantInformation[2].value
          }
          sessionStorage.setItem('personInfo', JSON.stringify(personInfo))
          let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
          let frontPath = ''
          let backPath = ''
          obj.IDCardInfo
              ? obj.IDCardInfo.index = i
              : obj.IDCardInfo = {
                index: i
              }
          sessionStorage.setItem('workInfo', JSON.stringify(obj))
          //有则取session里（本次拍的） 无则取接口返回（证照库）
          info.dataItemList.forEach(item => {
            if (item.dName === '身份证正面') {
              frontPath = obj.IDCardInfo.frontInfo || item.dUrl
            } else {
              backPath = obj.IDCardInfo.backInfo || item.dUrl
            }
          })
          this.$router.push({
            name: 'takeIDCardForWriteWorkInfo',
            params: {
              IDCardFrontPath: frontPath,
              IDCardBackPath: backPath,
              cId: info.type ? info.fId : info.cId
            }
          })
          //表单没有formid和证件类材料 拍照
        } else {
          let personInfo = {
            name: this.applicantInformation[0].value,
            card: this.applicantInformation[1].value,
            phone: this.applicantInformation[2].value
          }
          sessionStorage.setItem('personInfo', JSON.stringify(personInfo))
          this.$router.push({
            name: 'takePhotoForWriteWorkInfo',
            params: {
              index: i,
              cardNum: this.applicantInformation[1].value,
              cId: info.type ? info.fId : info.cId,
              type: info.fName ? 1 : 0
            }
          })
        }
      },
      toBZ() {
        this.$post('/mynj/updateBusApplysBz', {
          aId: this.myWorkInfo.aId,
          source: 3
        }).then((res) => {
          if (res.resultCode === 200) {
            this.toast('补正成功')
            this.$indicator.close()
            setTimeout(() => {
              this.$router.push({
                name: 'myWork'
              })
            }, 2000)
          }
        })
      },
      update() {
        if (!this.isMaterialDown) {
          return this.toast('所需材料加载中')
        }
        let errMsg = ''//缺失提示文字
        // 校验申请人信息
        for (let j = 0; j < this.applicantInformation.length; j++) {
          if (this.applicantInformation[j].label === '身份证号') {
            if (!this.applicantInformation[j].value || !this.applicantInformation[j].reg.test(this.applicantInformation[j].value)) {
              // return this.toast('请填写' + this.applicantInformation[j].label)
              return this.toast(this.applicantInformation[j].label + '为空或格式不对')
            }
          } else if (this.applicantInformation[j].label === '手机号') {
            if (!this.applicantInformation[j].value || !this.applicantInformation[j].reg.test(this.applicantInformation[j].value)) {
              // return this.toast('请填写' + this.applicantInformation[j].label)
              return this.toast(this.applicantInformation[j].label + '为空或格式不对')
            }
          } else {
            if (!this.applicantInformation[j].value) {
              return this.toast('请填写' + this.applicantInformation[j].label)
            }
          }
        }
 
        let workInfo = JSON.parse(sessionStorage.getItem('workInfo'))
        let hasIDCard = false//所需材料是否包含身份证
        let cId = ''//身份证cId
        //console.log(this.materialHandling)
        //console.log(workInfo)
        // for (let i = 0; i < this.materialHandling.length; i++) {
        //   //4 即包含身份证
        //   if (this.materialHandling[i].cType === 4) {
        //     cId = this.materialHandling[i].cId
        //     hasIDCard = true
        //     break
        //   }
        //   //是否上传所需材料
        //   if (workInfo['material_' + i]) {
        //     if (workInfo['material_' + i].length === 0) {
        //       errMsg = this.materialHandling[i].cName + '缺失'
        //       break
        //     }
        //   } else if (!workInfo['material_' + i]) {
        //     errMsg = this.materialHandling[i].cName + '缺失'
        //     break
        //   }
        // }
        var ifMaterial=true;
        for (let i = 0; i < this.materialHandling.length; i++) {
          //苗洪彬 2019-6-24 修改 （需求变更）
          // 修改为 需要且已上传身份证 则校验身份证信息
          //4 即包含身份证 
          if (this.materialHandling[i].cType === 4 && workInfo.IDCardInfo) {
            cId = this.materialHandling[i].cId
            hasIDCard = true
            break
          }
          //是否上传所需材料
          if (workInfo['material_' + i]) {
            // if (workInfo['material_' + i].length > 0) {
              //2019-6-24 填写是文档类型或者上传图片后删除 判断条件出错
            if (workInfo['material_' + i].length !== undefined ? workInfo['material_' + i].length > 0 : workInfo['material_' + i]) {
              ifMaterial=false
              break
            }
          } 
        }
        //console.log(ifMaterial)
        if(ifMaterial && !hasIDCard){
          //console.log(1)
          errMsg = '请填写或上传一项所需材料'
        }
        
        if (this.receivingMethod === '2' && this.address[0].value === '' && errMsg === '') {
          errMsg = '请输入收件地址'
        }
        if (errMsg) {
          return this.toast(errMsg)
        }
        if (hasIDCard) {
          // 校验身份证信息
          if (!workInfo.IDCardInfo) {
            // this.$indicator.close()
            return this.toast('请上传身份证')
          }
          if (!(workInfo.IDCardInfo.frontInfo && workInfo.IDCardInfo.backInfo)) {
            // this.$indicator.close()
            return this.toast('请上传身份证')
          } else {
            this.$indicator.open({
              text: '提交中...',
              spinnerType: 'double-bounce'
            })
            //校验身份证信息
            this.$get('policy/isMySelf',
                {
                  name: this.applicantInformation[0].value,
                  no: this.applicantInformation[1].value,
                  flag: 1,
                  froPath: workInfo.IDCardInfo.frontInfo,
                  backPath: workInfo.IDCardInfo.backInfo
                })
                .then((res) => {
                  if (res.resultCode === 200) {
                       //上传身份证
                    this.$post('/mynj/uploadCerti', {
                      filePath: (workInfo.IDCardInfo.frontInfo + '#' + workInfo.IDCardInfo.backInfo),
                      uId: JSON.parse(sessionStorage.getItem('uId')),
                      aId: JSON.parse(sessionStorage.getItem('workInfo')).aId,
                      cId: cId,
                    }).then((resC) => {
                      if (resC.resultCode === 200) {
                        if (this.myWorkInfo.code === 5) {
                          this.toBZ()
                        } else {
                          //提交事项
                          this.$post('/mynj/updateBusApplys', {
                            aId: workInfo.aId,
                            sId: sessionStorage.getItem('sId'),
                            uId: sessionStorage.getItem('uId'),
                            name: this.applicantInformation[0].value,
                            objcId: this.applicantInformation[1].value,
                            mobile: this.applicantInformation[2].value,
                            sex: '男',
                            mail: this.receivingMethod,
                            address: this.address[0].value,
                            source: 3
                          }).then((updateRes) => {
                            if (updateRes.resultCode === 200) {
                              this.$indicator.close()
                              this.toast('申办成功')
                              setTimeout(() => {
                                this.$router.push({
                                  name: 'home'
                                })
                              }, 2000)
                            } else {
                              this.$indicator.close()
                              this.toast(updateRes.message)
                            }
                          })
                        }
                      } else {
                        this.toast(resC.message)
                      }
                    })
                  } else {
                    this.$indicator.close()
                    this.toast(res.message)
                  }
                })
          }
        } else {
          if (this.myWorkInfo.code === 5) {
            this.toBZ()
          } else {
            this.$post('/mynj/updateBusApplys', {
              aId: workInfo.aId,
              sId: sessionStorage.getItem('sId'),
              uId: sessionStorage.getItem('uId'),
              name: this.applicantInformation[0].value,
              objcId: this.applicantInformation[1].value,
              mobile: this.applicantInformation[2].value,
              sex: '男',
              mail: this.receivingMethod,
              address: this.address[0].value,
              source: 3
            }).then((updateRes) => {
              if (updateRes.resultCode === 200) {
                this.$indicator.close()
                this.toast('申办成功')
                setTimeout(() => {
                  this.$router.push({
                    name: 'home'
                  })
                }, 2000)
              } else {
                this.$indicator.close()
                this.toast(updateRes.message)
              }
            })
          }
        }
      }
    },
    watch: {
      receivingMethod() {
        this.showAddress = this.receivingMethod === '2'
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: #f2f2f2
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 4.26vw;
    color: #333333;
    padding: 0 4vw
  }

  .input-block {
    padding: 0 4vw;
    background-color: #ffffff;
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
</style>