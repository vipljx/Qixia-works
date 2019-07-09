<template>
  <div class="bg">
    <Header title="便民服务" left="" :has-margin="false"></Header>
    <div class="weather-block">
      <span class="temperature">{{weather.num}}<i>℃</i></span>
      <div class="weather">
        <span>栖霞区</span>
        <span>{{weather.weather}}</span>
        <span>{{weather.wind}}</span>
      </div>
    </div>
    <div class="title">生活服务</div>
    <div class="serve">
      <div class="serve-block"
           :style="{'background-image':'url(' + item.sBackground + ')'}"
           v-for="item in serveList"
           :key="item.sId"
           @click="goServe(item.sUrl)">
        <span v-html="item.sWord"></span>
        <img :src="item.sIco" alt="">
      </div>
    </div>
    <div class="title">大厅指南</div>
    <div class="hall-list" @click="goHall">
      <Hall :info="hall"></Hall>
    </div>
  </div>
</template>

<script>
  import Hall from '@/components/Hall.vue'

  export default {
    name: "Serve",
    components: {
      Hall
    },
    data() {
      return {
        serveList: [],
        hall: {},
        weather: {}
      }
    },
    created() {
      this.loadServe()
      this.loadHall()
      this.loadWeather()
    },
    methods: {
      toast(msg) {
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
      },
      //天气
      loadWeather() {
        this.$get('/policy/getWeather', {
          location: '118.88,32.12'
        }).then((res) => {
          if (res.resultCode === 200) {
            // let data = JSON.parse(res.data)
            let data = res.data
            this.weather = {
              num: data.results[0].weather_data[0].date.split('：')[1].slice(0, -2),
              weather: data.results[0].weather_data[0].weather,
              wind: data.results[0].weather_data[0].wind
            }
          }
        })
      },
      //服务列表
      loadServe() {
        this.$get('/policy/queryServiceInfo').then((res) => {
          if (res.resultCode === 200) {
            this.serveList = res.data
          }
        })
      }
      ,
      //加载大厅指南
      loadHall() {
        this.$get('/policy/queryQxzwWorkHall').then((res) => {
          if (res.resultCode === 200) {
            this.hall = res.data[0]
          }
        })
      }
      ,
      //办事大厅
      goHall() {
        this.$router.push({
          name: 'hallList'
        })
      }
      ,
      goServe(url) {
        window.location.href = url
      }
    }
  }
</script>

<style scoped>
  .bg {
    padding-bottom: 50px
  }

  .weather-block {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("../assets/serve-banner.png") no-repeat;
    background-size: cover;
    margin: 40px 0 8px 0
  }

  .temperature {
    font-size: 34px;
    color: #ffffff;
    margin-bottom: 10px
  }

  .temperature i {
    font-style: normal;
    font-size: 18px;
    margin-left: 5px
  }

  .weather {
    font-size: 16px;
    color: #ffffff
  }

  .weather span {
    display: inline-block;
    height: 18px;
    line-height: 18px;
    padding: 0 8px;
    border-right: 1px solid #ffffff
  }

  .weather span:last-child {
    border: none
  }


  .title {
    height: 40px;
    line-height: 40px;
    padding: 0 4vw;
    color: #333333;
    font-size: 4.27vw;
    font-weight: 600;
    background-color: #ffffff
  }

  .hall-list {
    padding: 0 4vw;
    background-color: #ffffff;
    border-top: 1px solid #e3e3e3
  }

  .serve {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4vw 10px;
    background-color: #ffffff;
    margin-bottom: 8px
  }

  .serve-block {
    width: 45vw;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/serve-bg.png") no-repeat;
    background-size: cover;
    margin-right: 1vw
  }

  .serve-block span {
    display: inline-block;
    width: 21vw;
    font-size: 4.8vw;
    color: #ffffff;
    margin-right: 10px
  }

  .serve-block img {
    height: 35px;
  }

</style>