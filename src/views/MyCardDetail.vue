<template>
  <div class="bg">
    <Header title="我的证照" to="/cardPackage"></Header>
    <div class="img">
      <div v-for="(item,index) in imgList" :key="item.dName">
        <span>{{item.dName}}</span>
        <div>
          <img :src="item.dUrl" :alt="item.dName">
          <img src="../assets/delete.png" class="delete" alt="删除" @click="deleteImg(index)">
        </div>
      </div>
    </div>
    <div v-show="(!addImg) && imgList.length === 0" class="no-info">
      <img src="../assets/noList.png" alt="no">
    </div>
    <div class="img-block" v-show="addImg">
      <my-image-cropper
              v-model="photo"
              :width="280"
              :height="280"
              :placeholder="'点击选择证照'"
              :placeholder-font-size="16"
              :accept="'image/*'"
              :prevent-white-space="false"
              :show-loading="true"
              :loading-size="40"
              :loading-color="'#606060'"
      ></my-image-cropper>
    </div>
    <div class="button-block save-button">
      <mt-button class="button" type="primary" @click="saveImg">{{addImg ? '提交' : '立即新增'}}</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyCardDetail",
    data() {
      return {
        info: {},
        photo: {},
        imgList: [],
        isUpdating: false,
        addImg: false
      }
    },
    created() {
      this.info = this.$route.params.info
      this.loadCardList()
    },
    methods: {
      //提示
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      // 记载证照列表
      loadCardList() {
        this.$get('/policy/queryByIdNoAndcTypeId', {
          idNo: JSON.parse(sessionStorage.getItem('userInfo')).card,
          cTypeId: this.info.cTypeId
        }).then((res) => {
          this.imgList = res.data
        })
      },
      // 保存图片
      saveImg() {
        //印章 => 授权申请
        if (this.info.cTypeId === 11) {
          return this.$router.push({
            name: 'sealApplication',
            params: {}
          })
        }
        if (!this.addImg) {
          this.addImg = true
          return false
        }
        if (this.photo.generateDataUrl() && !this.isUpdating) {
          this.isUpdating = true
          this.$indicator.open({
            text: '图片处理完成，提交中...',
            spinnerType: 'double-bounce'
          })
          this.$post('/policy/uploadImg', {
            fileData: this.photo.generateDataUrl(),
            cerNo: JSON.parse(sessionStorage.getItem('userInfo')).card,
            fileName: (new Date()).getTime()
          }).then((res) => {
            if (res.resultCode === 200) {
              this.update(res.data)
              // this.imgList.push(res.data)
              this.isUpdating = false;
              this.$indicator.close();
            } else {
              this.isUpdating = false;
              this.$indicator.close();
            }
          })
        }
      },
      //上传证照库
      update(src) {
        this.$post('/policy/insertQxzwCerInfo', {
          cTypeId: this.info.cTypeId,
          dName: this.info.cTypeName,
          dUrl: src,
          uId: sessionStorage.getItem('uId'),
          idNo: JSON.parse(sessionStorage.getItem('userInfo')).card
        }).then((res) => {
          if (res.resultCode === 200) {
            this.photo.remove()
            this.toast('上传成功，正在重新加载')
            this.loadCardList()
            this.isUpdating = false
          } else {
            this.isUpdating = false
          }
        })
      },
      //删除
      deleteImg(i) {
        this.$messagebox({
            title: '提示',
            message: '确定要删除吗?',
            showCancelButton: true
        }).then(action => {
            //console.log(action)
            if(action=="confirm"){
                this.$post('/policy/deleteQxzwCerInfo', {
                  dId: this.imgList[i].dId,
                }).then((res) => {
                  if (res.resultCode === 200) {
                    this.toast('删除成功，正在重新加载')
                    this.loadCardList()
                  } else {
                    this.toast('删除失败，请重试')
                  }
                })
            }
        });
        
      }
    }
  }
</script>

<style scoped>

  .img-block {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ffffff
  }

  .img > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .img > div span{
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 16px;
    background-color: #f2f2f2;
  }

  .img > div > div {
    width: 50%;
    transform: translate(0, 0);
  }

  .img img {
    width: 100%;
    margin: 10px 0;
  }

  .img .delete {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 0;
    right: 0;
  }

  .save-button {
    padding: 10px 100px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .button {
    border: 1px solid #26a2ff;
    color: #26a2ff;
    background-color: #ffffff;
  }

  .no-info {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    background-color: #ffffff;
  }

  .no-info img {
    width: 50vw;
  }
</style>