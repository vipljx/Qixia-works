<template>
  <div class="bg">
    <Header :title="title" to="/bid"></Header>
    <div class="form-block">
      <form-item v-for="(item,index) in fromItems"
                 :key="item.from_item_id"
                 :info="item"
                 :hasBottom="(index + 1) === fromItems.length">
      </form-item>
    </div>

    <div class="button-block">
      <mt-button v-if="myWorkInfo.state!=2" class="button" type="primary" @click="upLoad">提交</mt-button>
      <mt-button v-if="myWorkInfo.state==2" class="button2" type="default" @click="back">返回</mt-button>
    </div>
  </div>
</template>

<script>
  import FormItem from '@/components/FormItem.vue'

  export default {
    name: "",
    data() {
      return {
        updateOnce: true,//防止多次点击提交
        formId: '',
        title: '',
        fromItems: [],
        myWorkInfo:{},
        overcome: ['take_photo', 'dividing_line', 'time_input', 'date_input']//不需要渲染的表单类型
      }
    },
    components: {
      FormItem
    },
    created() {
     // console.log(this.$route.params)
      this.$indicator.open({
        text: '表单加载中...',
        spinnerType: 'double-bounce'
      })
      let workInfo = JSON.parse(sessionStorage.getItem('workInfo'));
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo')) || {code: ''}
      this.formId = this.$route.query.id
      //console.log(this.$route.query.id)
      this.$get('/api/form/query_from_info',
          {from_id: this.formId},
          true)
          .then((res) => {
            //console.log(res)
            if (res.status === "000000") {
              
              this.title = res.data.from_name
              console.log(workInfo)
              //判断是否需要加载已填数据
              if (workInfo['material_' + this.$route.query.index]) {
                
                let material = workInfo['material_' + this.$route.query.index]
                this.$get('/api/form/queryTablesByIdAndTableName',
                    {
                      tableName: material.bus_table_name,
                      id: material.bus_id
                    },
                    true)
                    .then((valueRes) => {
                      if (valueRes.status === "000000" && valueRes.data !== null) {
                        let valueObj = valueRes.data
                        let fromItems = res.data.zgbFromItems
                        fromItems.forEach(item => {
                          if (this.overcome.indexOf(item.from_item_type) === -1) {
                            item.value = valueObj[item.from_item_fname]
                          }
                        })
                        this.fromItems = fromItems
                        //console.log(this.fromItems)
                        this.$indicator.close()
                      } else {
                        this.$indicator.close()
                      }
                    })
              } else {
                // let formObj = res.data.zgbFromItems
                // formObj.forEach(item => {
                //   item.value = ''
                // })
                this.fromItems = res.data.zgbFromItems
                this.$indicator.close()
                //console.log(this.fromItems)
              }
            } else {
              this.$indicator.close()
            }
          })
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      upLoad() {
        if (!this.updateOnce) {
          return false
        }
        this.updateOnce = false
        let hasError = false
        let errorMsg = ''
        let updateData = {}
        for (let i = 0; i < this.fromItems.length; i++) {
          // 判断类型不为标头并且没有错误
          if (this.overcome.indexOf(this.fromItems[i].from_item_type) === -1 && !hasError) {
            // if (this.fromItems[i].from_item_type !== 'dividing_line' && !hasError) {
            // 遍历当前项的校验规则
            for (let j = 0; j < this.fromItems[i].rule_attrs.length; j++) {
              //必填项校验
              if (this.fromItems[i].rule_attrs[j].key === 'required' && this.fromItems[i].rule_attrs[j].value === 'true') {
                if (this.fromItems[i].value === '' || this.fromItems[i].value.length === 0) {
                  hasError = true
                  errorMsg = this.fromItems[i].from_item_name + '是必填项'
                  break
                }
              } else if (this.fromItems[i].rule_attrs[j].key === 'min_number') {//最小长度校验
                if (this.fromItems[i].value.length < parseInt(this.fromItems[i].rule_attrs[j].value)) {
                  hasError = true
                  errorMsg = this.fromItems[i].from_item_name + '最小长度为' + this.fromItems[i].rule_attrs[j].value
                  break
                }
              } else if (this.fromItems[i].rule_attrs[j].key === 'max_number') {//最大长度校验
                if (this.fromItems[i].value.length > parseInt(this.fromItems[i].rule_attrs[j].value)) {
                  hasError = true
                  errorMsg = this.fromItems[i].from_item_name + '最大长度为' + this.fromItems[i].rule_attrs[j].value
                  break
                }
              }
            }
            if (hasError) break
            updateData[this.fromItems[i].from_item_fname] = this.fromItems[i].value
          }
        }
        //是否有错
        if (!hasError) {
          this.$indicator.open({
            text: '提交中...',
            spinnerType: 'double-bounce'
          })
          this.$post('/api/form/save_from_data', {
                from_id: this.formId,
                json: JSON.stringify(updateData)
              },
              true)
              .then((res) => {
                if (res.status === '000000' && res.data.file_path) {
                  let uploadFilesByFormData = {
                    busId: res.data.id,
                    busTableName: res.data.table_name,
                    fPath: res.data.file_path,
                    dId: sessionStorage.getItem('dId'),
                    sId: sessionStorage.getItem('sId'),
                    SFZ2: '32032319960401',
                    uId: sessionStorage.getItem('uId'),
                    index: '',
                    aId: JSON.parse(sessionStorage.getItem('workInfo')).aId,
                    fId: sessionStorage.getItem('fId'),
                    fName: sessionStorage.getItem('fName'),
                  }
                  this.$post('/fileX/uploadFilesByForm', uploadFilesByFormData)
                      .then((res) => {
                        if (res.resultCode === 200) {
                          let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
                          obj['material_' + this.$route.query.index] = res.data
                          sessionStorage.setItem('workInfo', JSON.stringify(obj))
                          sessionStorage.removeItem('fId')
                          sessionStorage.removeItem('fName')
                          this.$indicator.close()
                          this.toast('提交成功')
                          setTimeout(() => {
                            this.$router.push({
                              name: 'bid'
                            })
                          }, 2000)
                        } else {
                          this.updateOnce = true
                        }
                      })
                  this.$indicator.close()
                } else {
                  this.updateOnce = true
                  this.toast(res.msg)
                  this.$indicator.close()
                }
              })
        } else {
          this.updateOnce = true
          this.toast(errorMsg)
        }
      },
      back(){
        this.$router.push({
          name: 'bid'
        })
      },
    }
  }
</script>

<style scoped>
  .bg {
    background-color: #f2f2f2
  }

  .form-block {
    padding: 0 4vw;
    background-color: #ffffff;
  }

</style>