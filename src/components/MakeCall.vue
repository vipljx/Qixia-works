<template>
  <div class="bg">
    <a href="tel:96106">
      <div class="content">
        <img src="../assets/phone.png" alt="">
        <span>一键拨打咨询热线:96106</span>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "MakeCall"
  }
</script>

<style scoped>
  .bg {
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center
  }

  .content {
    width: 94vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: -webkit-linear-gradient(left top, #2f80ed, #2e80ed, #2cafdf, #2cb2de); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #2f80ed, #2e80ed, #2cafdf, #2cb2de); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #2f80ed, #2e80ed, #2cafdf, #2cb2de); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #2f80ed, #2e80ed, #2cafdf, #2cb2de); /* 标准的语法（必须放在最后） */
    border-radius: 6px;
  }

  .content img {
    width: 30px;
    height: 30px
  }

  .content span {
    font-size: 4.3vw;
    color: #ffffff
  }

  a{
    text-decoration: none;
  }
</style>