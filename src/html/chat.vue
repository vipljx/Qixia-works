<template>
  <div>
    <Header2 title="实时沟通" :hasMargin="false" to="/a"></Header2>
    <div class="chat-main">
      <div class="chat-top">
        <ul class="chat-top-ul">
          <li v-for="(tmp,index) in list" :key="index">
            <div class="chat-top-li1 flex align-items-center" v-if="tmp.userType==1">
              <div class="chat-top-ico">
                <img src="../assets/chat-ico1.png" alt>
              </div>
              <div class="chat-top-triangle">
                <span v-show="tmp.chatContent.indexOf('http')==-1"></span>
              </div>
              <div class="chat-top-note flex1" v-show="tmp.chatContent.indexOf('http')==-1">
                <p>{{tmp.chatContent}}</p>
              </div>
              <div class="chat-top-tp" v-show="tmp.chatContent.indexOf('http')==0">
                <img :src="tmp.chatContent" alt>
              </div>
            </div>
            <div class="chat-top-li2 flex align-items-center justify-content-flex-end" v-if="tmp.userType==2">
              <div class="chat-top-tp" v-show="tmp.chatContent.indexOf('http')==0">
                <img :src="tmp.chatContent" alt>
              </div>
              <div class="chat-top-note flex1" v-show="tmp.chatContent.indexOf('http')==-1">
                <p>{{tmp.chatContent}}</p>
              </div>
              <div class="chat-top-triangle">
                <span v-show="tmp.chatContent.indexOf('http')==-1"></span>
              </div>
              <div class="chat-top-ico">
                <img src="../assets/chat-ico1.png" alt>
              </div>
            </div>
          </li>
          <!-- <li class="chat-top-li1 flex align-items-center">
                        <div class="chat-top-ico">
                            <img src="../assets/chat-ico1.png" alt="">
                        </div>
                        <div class="chat-top-triangle"></div>
                        <div class="chat-top-tp"><img src="../assets/chat-tp1.png" alt=""></div>
                    </li>
                    <li class="chat-top-li2 flex align-items-center justify-content-flex-end">
                        <div class="chat-top-note flex1"><p>你好    </p></div>
                        <div class="chat-top-triangle"><span></span></div>
                        <div class="chat-top-ico">
                            <img src="../assets/chat-ico1.png" alt="">
                        </div>
                    </li>
                    <li class="chat-top-li2 flex align-items-center justify-content-flex-end">
                        <div class="chat-top-tp"><img src="../assets/chat-tp1.png" alt=""></div>
                        <div class="chat-top-triangle"></div>
                        <div class="chat-top-ico">
                            <img src="../assets/chat-ico1.png" alt="">
                        </div>
          </li>-->
        </ul>
      </div>
      <div class="chat-bottom">
        <div class="chat-bottom-cont flex align-items-center">
          <div class="chat-bottom-ico" @click="chooseFile">
            <img src="../assets/chat-ico3.png" alt>
          </div>
          <div class="chat-bottom-textarea flex1">
            <textarea name id v-model="chatContent"></textarea>
          </div>
          <button class="chat-bottom-btn" @click="send">发送</button>
        </div>
        <my-image-cropper
          v-model="photo"
          :width="106"
          :height="110"
          :placeholder="'点击上传'"
          :placeholder-font-size="16"
          :accept="'image/*'"
          :prevent-white-space="false"
          :disable-click-to-choose="true"
          @file-choose="handleCroppaFileChoose"
          v-show="false"
        ></my-image-cropper>
      </div>
    </div>
  </div>
</template>
<script>
import { otherUrlC } from "../../config/env";
import { setInterval, clearInterval } from 'timers';
export default {
  data() {
    return {
      photo: {},
      list: [],
      param: {
        fromUser: "",
        toUser: "",
        aId: "",
        accnodeId: "",
        chatDesc: "我是申请人",
        userType: 2,
        chatContent: ""
      },
      chatContent:"",
      timer:null
    };
  },
  created() {
    this.param.fromUser = sessionStorage.getItem("uId");
    this.param.toUser=localStorage.getItem("toUser")
    this.param.aId=localStorage.getItem("aId")
    this.param.accnodeId=localStorage.getItem("accnodeId")
    this.queryChats();
  },
  methods: {
    queryChats() {
      this.list=JSON.parse(localStorage.getItem("chatList")) || [];
      this.timer=setInterval(()=>{
        this.list=JSON.parse(localStorage.getItem("chatList"))|| [];
      },1000)
      
    },
    chooseFile() {
      this.photo.chooseFile();
    },
    handleCroppaFileChoose(e) {
      this.$getBase64(e, data => {
        this.$indicator.open({
            text: '图片处理完成，提交中...',
            spinnerType: 'double-bounce'
        })
        this.$post("/policy/uploadImg", {
          fileData: data,
          cerNo: "1111",
          fileName: new Date().getTime()
        })
          .then(res => {
            if (res.resultCode == "200") {
              this.param.chatContent = res.data;
              this.insert();
            }
          })
          .catch(function(msg) {
            console.log(msg);
          });
      });
    },
    send() {
      this.param.chatContent=this.chatContent;
      this.insert();
    },
    insert() {
      this.chatContent="";
      console.log(this.param)
      this.$get("/chat/insert", this.param)
        .then(res => {
          if (res.resultCode == "200") {
              this.list.push(this.param);
              localStorage.setItem("chatList",JSON.stringify(this.list));
              this.$indicator.close();
          }
        })
        .catch(function(msg) {
          console.log(msg);
        });
    }
  },
  destroyed(){
    clearInterval(this.timer)
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.justify-content-center {
  justify-content: center;
}
.justify-content-space-between {
  justify-content: space-between;
}
.justify-content-flex-end {
  justify-content: flex-end;
}

.align-items-center {
  align-items: center;
}
.chat-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.chat-top {
  flex: 1;
  padding-top: 40px;
  overflow-y:auto
}
.chat-top-ul {
  width: 95%;
  margin: 0 auto;
}
.chat-top-ul li {
  padding: 1.6rem 0;
}

.chat-top-li1 .chat-top-note p {
  display: inline-block;
  background: #ffffff;
  border-radius: 0.8rem;
  padding: 1.1rem 0.8rem;
}

.chat-top-li2 .chat-top-note p {
  display: inline-block;
  background: #3785ea;
  color: #fff;
  border-radius: 0.8rem;
  padding: 1.1rem 0.8rem;
  float: right;
}
.chat-top-triangle {
  width: 1.2rem;
}
.chat-top-li1 .chat-top-triangle {
  text-align: right;
}
.chat-top-li1 .chat-top-triangle span {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 0.6rem solid transparent;
  border-right: 0.8rem solid white;
  border-bottom: 0.6rem solid transparent;
}
.chat-top-li2 .chat-top-triangle {
  text-align: left;
}
.chat-top-li2 .chat-top-triangle span {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 0.6rem solid transparent;
  border-left: 0.8rem solid #3785ea;
  border-bottom: 0.6rem solid transparent;
}
.chat-top-tp {
  width: 30%;
}
.chat-top-tp img {
  width: 100%;
}
.chat-top-ico {
  width: 11.2%;
}
.chat-top-ico img {
  width: 100%;
}

.chat-bottom {
  height: 5rem;
  background: #ffffff;
}
.chat-bottom-cont {
  width: 95%;
  height: 100%;

  margin: 0 auto;
}
.chat-bottom-ico {
  width: 9.2%;
}
.chat-bottom-ico img {
  width: 100%;
}
.chat-bottom-textarea {
  margin: 0 10px;
  display: flex;
}
.chat-bottom-textarea textarea {
  height: 3.2rem;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #d9d9d9;
  align-self: center;
}
.chat-bottom-btn {
  width: 12%;
  background: #3785ea;
  color: #fff;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
}
</style>
