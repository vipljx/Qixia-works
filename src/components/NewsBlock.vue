<template>
  <div class="content" @click="goDetail">
    <div class="content-top">
      <div><h5>{{info.n_title}}</h5><img src="../assets/to-right.png" alt=""></div>

      <!--      <p>尊敬的用户，您有一项授权申请，具体请查看详情， 并尽快处理，谢谢！</p>-->
      <span>{{info.create_date}}</span>
    </div>
    <!--    <div class="content-bottom">-->
    <!--      <span>受理详情</span>-->
    <!--      <img src="../assets/to-right.png" alt="">-->
    <!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "newsBlock",
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    methods: {
      goDetail() {
        if (this.info.n_title === "授权申请") {
          this.$router.push({
            name: 'sealApplicationHandle',
            params: {
              cId: this.info.c_id
            }
          })
        } else {
          this.$router.push({
            name: 'newsDetail',
            params: {
              title: this.info.n_title,
              time: this.info.create_date,
              content: this.info.n_content
            }
          })
        }
      },
    }
  }
</script>

<style scoped>
  .content {
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 10px 20px;
  }

  .content-top {
    padding-bottom: 3px;
    /*border-bottom: 1px dashed #dfdfdf*/
  }

  .content-top > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content-top > div img {
    width: 7px;
    height: 14px
  }

  .content-top h5, .content-top p, .content-top span {
    margin: 5px 0
  }

  .content-top h5 {
    font-size: 4.27vw;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .content-top p, .content-top span {
    color: #666666
  }

  .content-top p {
    font-size: 4.27vw
  }

  .content-top span {
    font-size: 3.74vw
  }

  .content-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px
  }

  .content-bottom span {
    font-size: 4.27vw;
    color: #333333;
    font-weight: 600
  }

  .content-bottom img {
    width: 7px;
    height: 14px
  }
</style>