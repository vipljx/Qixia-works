<template>
  <div class="bg">
    <Header title="上传材料" to="/bid"></Header>
    <div class="title" style="margin-top: -10px;">拍摄材料</div>
    <div class="img-block">
      <div class="photo" @click="chooseFile">
        <div class="photo-tp">
          <img src="../assets/photo.png" alt="">
        </div>
        <div class="photo-bt">单击拍摄材料</div>
      </div>
      <my-image-cropper
              v-model="photo"
              :width="280"
              :height="280"
              :placeholder="'点击拍摄材料'"
              :placeholder-font-size="16"
              :accept="'image/*'"
              :prevent-white-space="false"
              :initial-image=photoPath
              :show-loading="true"
              :loading-size="40"
              :loading-color="'#606060'"
               @file-choose="handleCroppaFileChoose"
      v-show="false"></my-image-cropper>
    </div>
    <div class="height10" v-show="imgList.length>0"></div>
    <div class="img-show">
      <div
              v-for="(item,index) in imgList"
              :key="index"
              class="img-father">
        <img :src="item.src" alt="">
        <img src="../assets/delete.png" @click="deleteImg(item.acId || item.afId,index)" class="delete" alt="" v-if="myWorkInfo.state!=2">
      </div>
    </div>
    <div class="button-block">
      <mt-button v-if="myWorkInfo.state!=2" class="button" type="primary" @click="upLoad">上传</mt-button>
      <mt-button v-if="myWorkInfo.state==2" class="button2" type="default" @click="back">返回</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        photo: {},
        photoPath: '',
        imgList: [],
        options: {},
        isUpdating: false,
        myWorkInfo:{}
      }
    },
    components: {},
    created() {
      this.options = this.$route.params
      this.photoPath = this.$route.params.photoPath || ''
      this.myWorkInfo = JSON.parse(sessionStorage.getItem('myWorkInfo')) || {code: ''}
      let img = JSON.parse(sessionStorage.getItem('workInfo'))['material_' + this.options.index]
      if (img) {
        this.imgList = img
      }
    },
    methods: {
      back(){
        this.$router.push({
          name: 'bid'
        })
      },
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      chooseFile(){
        this.photo.chooseFile()
          
      },
      handleCroppaFileChoose(e){
        this.$getBase64(e,(data) => {
            // console.log(e)
            this.saveImg(data);
        })     
      },
      saveImg(data) {
        if (data && !this.isUpdating) {
          this.isUpdating = true
          this.$indicator.open({
            text: '图片处理完成，提交中...',
            spinnerType: 'double-bounce'
          })
          this.$post('/policy/uploadImg', {
            fileData: data,
            cerNo: this.options.cardNum,
            fileName: (new Date()).getTime()
          }).then((res) => {
            if (res.resultCode === 200) {
              this.imgList.push({
                src: res.data,
                acId: ''
              })
              // this.imgList.push(res.data)
              this.photo.remove()
              this.isUpdating = false
              this.$indicator.close();
            } else {
              this.isUpdating = false
              this.$indicator.close();
            }
          })
        }
      },
      deleteImg(acId, i) {
        this.$messagebox({
            title: '提示',
            message: '确定要删除吗?',
            showCancelButton: true
        }).then(action => {
            //console.log(action)
            if(action=="confirm"){
                if (acId) {
                  if (this.options.type) {
                    this.deleteImgF(acId, i)
                  } else {
                    this.deleteImgC(acId, i)
                  }
                  // this.$post('/mynj/delCretsKey', {
                  //   acId: acId
                  // }).then((res) => {
                  //   if (res.resultCode === 200) {
                  //     let arr = this.imgList
                  //     let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
                  //     let materialArr = obj['material_' + this.options.index]
                  //     arr.splice(i, 1)
                  //     this.imgList = arr
                  //     materialArr.splice(i, 1)
                  //     obj['material_' + this.options.index] = materialArr
                  //     sessionStorage.setItem('workInfo', JSON.stringify(obj))
                  //     this.toast('删除成功')
                  //   } else {
                  //     this.toast(res.message)
                  //   }
                  // })
                } else {
                  let arr = this.imgList
                  arr.splice(i, 1)
                  this.imgList = arr
                  this.toast('删除成功')
                }
            }
        });
        
      },
      deleteImgF(acId, i) {
        this.$post('/mynj/delFilesKey', {
          afId: acId
        }).then((res) => {
          if (res.resultCode === 200) {
            let arr = this.imgList
            let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
            let materialArr = obj['material_' + this.options.index]
            arr.splice(i, 1)
            this.imgList = arr
            materialArr.splice(i, 1)
            obj['material_' + this.options.index] = materialArr
            sessionStorage.setItem('workInfo', JSON.stringify(obj))
            this.toast('删除成功')
          } else {
            this.toast(res.message)
          }
        })
      },
      deleteImgC(acId, i) {
        this.$post('/mynj/delCretsKey', {
          acId: acId
        }).then((res) => {
          if (res.resultCode === 200) {
            let arr = this.imgList
            let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
            let materialArr = obj['material_' + this.options.index]
            arr.splice(i, 1)
            this.imgList = arr
            materialArr.splice(i, 1)
            obj['material_' + this.options.index] = materialArr
            sessionStorage.setItem('workInfo', JSON.stringify(obj))
            this.toast('删除成功')
          } else {
            this.toast(res.message)
          }
        })
      },
      upLoad() {
        if (this.imgList.length === 0) {
          return this.toast('请上传材料')
        }
        let filPath = ''
        this.imgList.forEach(item => {
          filPath += (item.src + '#')
        })
        if (this.options.type) {
          this.uploadForm(filPath)
        } else {
          this.uploadCard(filPath)
        }
        // this.$post('/mynj/uploadCerti', {
        //   filePath: filPath.slice(0, -1),
        //   uId: JSON.parse(sessionStorage.getItem('uId')),
        //   aId: JSON.parse(sessionStorage.getItem('workInfo')).aId,
        //   cId: this.options.cId,
        // }).then((res) => {
        //   if (res.resultCode === 200) {
        //     let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
        //     let materialArr = []
        //     res.data.forEach(item => {
        //       materialArr.push({acId: item.acId, src: item.cPath})
        //     })
        //     obj['material_' + this.options.index] = materialArr
        //     sessionStorage.setItem('workInfo', JSON.stringify(obj))
        //     this.$indicator.close()
        //     this.toast('上传成功')
        //     setTimeout(() => {
        //       this.$router.push({
        //         name: 'bid'
        //       })
        //     }, 2000)
        //   } else {
        //     this.$indicator.close()
        //     this.toast(res.message)
        //   }
        // })
      },
      uploadCard(filPath) {
        this.$indicator.open({
          text: '上传中...',
          spinnerType: 'double-bounce'
        });
        this.$post('/mynj/uploadCerti', {
          filePath: filPath.slice(0, -1),
          uId: JSON.parse(sessionStorage.getItem('uId')),
          aId: JSON.parse(sessionStorage.getItem('workInfo')).aId,
          cId: this.options.cId,
        }).then((res) => {
          if (res.resultCode === 200) {
            let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
            let materialArr = []
            res.data.forEach(item => {
              materialArr.push({acId: item.acId, src: item.cPath})
            })
            obj['material_' + this.options.index] = materialArr
            sessionStorage.setItem('workInfo', JSON.stringify(obj))
            this.$indicator.close()
            this.toast('上传成功')
            setTimeout(() => {
              this.$router.push({
                name: 'bid'
              })
            }, 2000)
          } else {
            this.$indicator.close()
            this.toast(res.message)
          }
        })
      },
      uploadForm(filPath) {
        this.$indicator.open({
          text: '上传中...',
          spinnerType: 'double-bounce'
        });
        // this.$post('/mynj/uploadFiles', {
        this.$post('/mynj/uploadMoreFiles', {
          filePath: filPath.slice(0, -1),
          uId: JSON.parse(sessionStorage.getItem('uId')),
          aId: JSON.parse(sessionStorage.getItem('workInfo')).aId,
          fId: this.options.cId,
        }).then((res) => {
          if (res.resultCode === 200) {
            let obj = JSON.parse(sessionStorage.getItem('workInfo')) || {}
            let materialArr = []
            res.data.forEach(item => {
              materialArr.push({acId: item.afId, src: item.fPath})
            })
            // materialArr.push({acId: res.data.afId, src: res.data.fPath})
            obj['material_' + this.options.index] = materialArr
            sessionStorage.setItem('workInfo', JSON.stringify(obj))
            this.$indicator.close()
            this.toast('上传成功')
            setTimeout(() => {
              this.$router.push({
                name: 'bid'
              })
            }, 2000)
          } else {
            this.$indicator.close()
            this.toast(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .height10{
    height: 10px;
  }
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

  .img-block {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff;
    text-align: center
  }

  .save-button {
    padding: 10px 100px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .img-show {
    display: flex;
    flex-wrap: wrap;
    padding: 2vw;
    background-color: #ffffff
  }

  .img-show img {
    width: 30vw;
    height: 30vw
  }

  .img-father {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
    width: 30vw;
    height: 30vw;
    margin: 1vw
  }

  .img-father .delete {
    position: fixed;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: #ffffff
  }
</style>