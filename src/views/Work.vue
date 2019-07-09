<template>
  <div class="bg">
    <div class="header">
      <select name="classify" v-model="classify" @change="classifySelected">
        <option
                :value="item.type"
                v-for="item in classifyList"
                :key="item.type"
        >{{item.title}}
        </option>
      </select>
      <input type="text" @click="goSearch" readonly placeholder="请输入您要搜索的关键词">
      <!--      <span class="search">搜索</span>-->
    </div>
    <div class="work-content">
      <div class="work-tab" v-show="tabShow">
        <div
                v-for="(state,index) in states"
                :key="state"
                @click="changeTab(index)"
                :class="['work-tab-item', tabIndex === index ? 'work-tab-selected' : '']"
        >{{state}}
        </div>
      </div>
      <div class="work-items" v-show="tabIndex !== 2">
        <div
                class="work-item"
                v-for="workItem in workItems"
                :key="workItem.typeId"
                @click="goList(workItem.typeId,workItem.typeName)"
        >
          <img class="work-item-icon" :src="workItem.iconPath" alt="">
          <div class="work-item-name">{{workItem.typeName}}</div>
        </div>
      </div>
      <div class="work-items" v-show="tabIndex === 2">
        <div
                class="work-item"
                v-for="workItem in workItems"
                :key="workItem.dId"
                @click="searchNext(workItem.dId,workItem.dName)">
          <img class="work-item-icon" :src="workItem.logo" alt="">
          <div class="work-item-name">{{workItem.dName}}</div>
        </div>
      </div>
    </div>
    <div class="hot-content" v-show="tabIndex !== 2">
      <div class="hot-list-title">热门事项</div>
      <div class="hot-list"
           v-for="(item,index) in hotList"
           :key="item.index"
           @click="goDetail(index)">
        <span class="name">{{item.sName}}</span>
        <img src="../assets/to-right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        states: ['个人办事', '企业办事', '部门服务'],
        classify: 0,
        classifyList: [{
          title: '区政务服务中心',
          type: 0
        }, {
          title: '街道',
          type: 1
        }],
        tabIndex: 0,
        tabShow: true,
        workItems: [],//事项
        loadObj: [
          {
            url: "/dep/leibie",
            data: {pTypeId: 3}
          },
          {
            url: "/dep/leibie",
            data: {pTypeId: 4}
          },
          {
            url: "/dep/deplist",
            data: {dId: 2}
          }
        ],
        workItemsType: [],
        hotList: []
      }
    },
    created() {
      this.loadWorkList(this.loadObj[0], 0)
      this.loadHotList()
    },
    methods: {
      classifySelected() {
        this.tabShow = this.classify === 0
        if (this.tabShow) {
          this.changeTab(0)
        } else {
          this.tabIndex = 2
          let obj = {
            url: "/dep/deplist",
            data: {dId: 3}
          }
          this.loadWorkList(obj, 2)
        }
      },
      // loadClassify() {
      //   this.$get('/dep/deplist', {dId: 3}).then((res) => {
      //     if (res.resultCode === 200) {
      //       let arr = res.data.list
      //       arr.unshift({
      //         dName: '区级',
      //         dId: 'q'
      //       })
      //       this.classifyList = arr
      //     }
      //   })
      // },
      //tab切换
      changeTab(i) {
        this.tabIndex = i
        if (this.workItemsType[i] && i !== 2) {
          this.workItems = this.workItemsType[i]
        } else {
          if (i === 2) this.loadObj[2].data = {dId: 2}
          this.loadWorkList(this.loadObj[i], i)
        }
      },
      // 加载列表
      loadWorkList(obj, index) {
        this.$get(obj.url, obj.data).then((res) => {
          if (res.resultCode === 200) {
            this.workItems = res.data.list
            this.workItemsType[index] = res.data.list
          }
        })
      },
      // 查找是否有下一项
      searchNext(id, name) {
        this.$get('/dep/deplist', {dId: id}).then((res) => {
          if (res.resultCode === 200) {
            this.workItems = res.data.list
            this.workItemsType[2] = res.data.list
          } else {
            this.goList(id, name)
          }
        })
      },
      //去事项列表
      goList(id, name) {
        let data = {
            id: id,
            title: name,
            type: this.tabIndex
        }
        sessionStorage.setItem('workListParams',JSON.stringify(data))
        this.$router.push({
          name: 'workList',
          // query: {
          //   id: id,
          //   title: name,
          //   type: this.tabIndex
          // }
        })
      },
      //加载热门事项
      loadHotList() {
        this.$post('/mynj/getHotBusList').then((res) => {
          if (res.resultCode === 200) {
            this.hotList = res.data
          }
        })
      },
      // 详情
      goDetail(i) {
        sessionStorage.setItem('sId', this.hotList[i].sId)
        sessionStorage.setItem('dId', this.hotList[i].dId)
        this.$router.push({
          name: 'workDetail',
          params: {
            title: this.hotList[i].sName
          }
        })
      },
      //搜索
      goSearch() {
        this.$router.push({
          name: 'search',
          params: {
            where: 0
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    min-height: 100vh;
    background-color: #f2f2f2;
    padding-bottom: 50px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    background-color: #ffffff;
  }

  .header select, .header input {
    height: 30px;
    border: none;
    outline: none;
  }

  .header select {
    margin-left: 2vw;
    width: 36vw;
    font-size: 3.5vw;
    color: #666666;
    background: url("../assets/ico2.png") no-repeat scroll 95% center #ebebeb;
    background-size: 4vw;
  }

  .header input {
    width: 58vw;
    padding: 0 0 0 4.5vw;
    margin-right: 2vw;
    line-height: 30px;
    box-sizing: border-box;
    background-color: #ebebeb;
    background-image: url("../assets/search.png");
    background-repeat: no-repeat;
    background-size: 2.8vw 2.8vw;
    background-position: 1.33vw center;
  }

  input::-webkit-input-placeholder {
    font-size: 4vw;
    color: #bfbfbf;
  }

  .search {
    font-size: 3.74vw;
    color: #999999;
    padding: 0 10px;
  }

  .work-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    line-height: 34px;
    background-color: #f2f2f2;
  }

  .work-tab .work-tab-item {
    width: 33.34vw;
    height: 33px;
    font-size: 3.74vw;
    color: #666666;
    text-align: center;
  }

  .work-tab .work-tab-item.work-tab-selected {
    color: #0080d6;
    border-bottom: 1px solid #0080d6;
  }

  .work-content {
    margin-bottom: 10px;
  }

  .work-items {
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;
  }

  .work-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 25vw;
    margin-bottom: 10px;
  }

  .work-item-icon {
    width: 13.33vw;
    height: 13.33vw;
    margin: 10px 0;
  }

  .work-item-name {
    font-size: 3.74vw;
    color: #666666;
  }

  .hot-content {
    margin-bottom: 10px;
  }

  .hot-content > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    padding: 0 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #cccccc;
  }

  .hot-content > div:last-child {
    border: none;
  }

  .hot-content .hot-list-title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }

  .hot-content .hot-list {
    font-size: 14px;
    color: #666666;
  }

  .hot-content .hot-list img {
    width: 7px;
    height: 14px;
  }
</style>