<template>
  <div class="b">
    <h5>{{info.wWorkName}}</h5>
    <div class="line">
      <img src="../assets/hall-1.png" alt="hall-1">
      <p>{{info.wLocation}}</p>
    </div>
    <div class="line">
      <img src="../assets/hall-2.png" alt="hall-2">
      <p>{{info.wTel}}</p>
    </div>
    <div class="line">
      <img src="../assets/hall-3.png" alt="hall-3">
      <p>工作时间：{{info.wTimeStart}} - {{info.wTimeEnd}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Hall",
    props: {
      info: {
        type: Object,
        // required: true
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .b {
    padding-bottom: 3px;
  }

  h5 {
    margin: 0;
    font-size: 4.27vw;
    color: #404040;
    padding: 3px 0;
    font-weight: normal;
  }

  .line {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 3.74vw;
    color: #666666;
    padding: 1px;
  }

  div img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }

  div p {
    margin: 0;
  }
</style>