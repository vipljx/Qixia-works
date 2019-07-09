<template>
  <div class="signetBox" @click.self="signetCancel">
    <div class="signetContent">
      <h5>请选择您所需的公司公章</h5>
      <div class="signetBlock">
        <div class="signetImgBlock"
             v-for="(item,index) in info"
             :key="item.dUrl"
             @click="chooseThis(index)">
          <div class="delBlock">
            <img :src="item.dUrl" alt="公章">
            <img v-show="item.flag"
                 src="../assets/input-active.png"
                 class="delImg"
                 alt="">
          </div>
          <span>{{item.dName}}</span>
        </div>
        <div v-if="info.length === 0" class="no-signet">您没有公司印章，请先申请</div>
      </div>
      <div class="btnBox">
        <button @click="sealApplication">授权申请</button>
        <button @click="sure">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'

  export default {
    name: "Signet",
    props: {
      info: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        chooseIndex: ''
      }
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      // 取消
      signetCancel() {
        this.$emit('signetCancel')
      },
      // 选择
      chooseThis(i) {
        this.chooseIndex = i
        this.info.forEach(item => {
          item.flag = false
        })
        let arr = this.info[i]
        arr.flag = true
        this.$set(this.info, i, arr)
      },
      //确定
      sure() {
        if (this.chooseIndex !== '') {
          this.$emit('signetSave', this.info[this.chooseIndex].dUrl)
          this.$emit('signetCancel')
        } else {
          let str = this.info.length === 0 ? '您暂无公章' : '请选择公章'
          this.toast(str)
        }

      },
      //发起授权申请
      sealApplication() {
        MessageBox({
          title: '确认前往授权申请',
          message: '前往授权申请将丢失当前填写信息，确认前往申请?',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            this.$router.push({
              name: 'sealApplication',
              params: {}
            })
          }
        });
      }
    }
  }
</script>

<style scoped>
  .signetBox {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: rgba(50, 50, 50, 0.5);
    z-index: 100;
  }

  .signetContent {
    width: 88vw;
    margin: 10vh auto;
    background-color: #ffffff;
    max-height: 80vh;
    overflow-y: scroll;
    border-radius: 10px;
  }

  .signetContent h5 {
    font-size: 16px;
    color: #333333;
    text-align: center;
    margin: 0;
    padding: 10px 0;
  }

  .signetBlock {
    display: flex;
    flex-wrap: wrap;
  }

  .signetImgBlock {
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2vw;
  }

  .delBlock {
    transform: translate(0, 0);
  }

  .delBlock img {
    width: 20vw;
    height: 20vw;
  }

  .delBlock .delImg {
    width: 6vw;
    height: 6vw;
    position: fixed;
    bottom: 0;
    right: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .signetImgBlock span {
    font-size: 12px;
    color: #333333;
  }

  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btnBox button {
    width: 44vw;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #666666;
    border: 1px solid #f2f2f2;
    background-color: #f7f7f7;
    outline: none;
  }

  .btnBox button:last-child {
    color: #078ded;
  }

  .no-signet {
    font-size: 14px;
    padding: 5px;
    text-align: center;
    margin: 0 auto;
  }
</style>