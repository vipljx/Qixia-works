<template>
  <div class="signatureBox">
    <div class="canvasBox" ref="canvasHW">
      <canvas @touchstart='touchStart'
              @touchmove='touchMove'
              @touchend='touchEnd'
              ref="canvasF"
              @mousedown="mouseDown"
              @mousemove="mouseMove"
              @mouseup="mouseUp"></canvas>
      <div class="btnBox">
        <button @click="cancelWrite">取消</button>
        <button @click="overwrite" class="overwrite">重写</button>
        <button @click="save">提交签名</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "signature",
    data() {
      return {
        points: [],
        canvasTxt: null,
        canvasTxt2:null,
        canvas2:null,
        startX: 0,
        startY: 0,
        moveY: 0,
        moveX: 0,
        endY: 0,
        endX: 0,
        w: null,
        h: null,
        isDown: false
      }
    },
    created() {

    },
    mounted() {
      let canvas = this.$refs.canvasF;
      let w = window.innerWidth - 50
      let h = window.innerHeight - 20
      canvas.setAttribute('style', 'width:' + w + 'px;' + 'height:' + h + 'px');
      canvas.width = w;
      canvas.height = h;
      this.canvasTxt = canvas.getContext("2d");

      
    },
    components: {},
    methods: {
      //电脑设备事件
      mouseDown(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (1) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          };
          this.startX = obj.x;
          this.startY = obj.y;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.isDown = true;
        }
      },
      //移动设备事件
      touchStart(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clientX,
            y: ev.targetTouches[0].clientY - 10
          };
          this.startX = obj.x;
          this.startY = obj.y;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseMove(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (this.isDown) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          };
          this.moveY = obj.y;
          this.moveX = obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY = obj.y;
          this.startX = obj.x;
          this.points.push(obj);
        }
      },
      //移动设备事件
      touchMove(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clientX,
            y: ev.targetTouches[0].clientY - 10
          };
          this.moveY = obj.y;
          this.moveX = obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY = obj.y;
          this.startX = obj.x;
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseUp(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (1) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x: -1, y: -1});
          this.isDown = false;
        }
      },
      //移动设备事件
      touchEnd(ev) {
        ev = ev || event;
        ev.preventDefault();
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clientX,
            y: ev.targetTouches[0].clientY - 10
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x: -1, y: -1});
        }
      },
      // 取消
      cancelWrite() {
        this.overwrite()
        this.$emit('cancelBack')
      },
      //重写
      overwrite() {
        this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
        this.points = [];
      },
      // 获取
      save() {
        var that=this;
        let imgBase64 = this.$refs.canvasF.toDataURL("image/png");
        var p3 = new Image();
        p3.src = imgBase64;   
        p3.onload = function(){ 
          var w=p3.width
          var h=p3.height
          that.canvas2 = document.createElement("canvas");
          that.canvas2.setAttribute('style', 'width:' + h + 'px;' + 'height:' + w + 'px');
          that.canvas2.width = h;
          that.canvas2.height = w;
          that.canvasTxt2 = that.canvas2.getContext("2d");
          that.canvasTxt2.rotate(3 * 90 * Math.PI / 180);
          that.canvasTxt2.drawImage(p3,-w,0);   //绘制原始大小图
          let imgBase65 = that.canvas2.toDataURL("image/png");
        
          that.$indicator.open({
            text: '签名提交中...',
            spinnerType: 'double-bounce'
          })
          that.$post('/policy/uploadImg', {
            fileData: imgBase65,
            cerNo: 'imgBase64',
            fileName: (new Date()).getTime()
          }).then((res) => {
            if (res.resultCode === 200) {
              that.$indicator.close()
              that.$emit('saveBack', res.data)
              that.overwrite()
            } else {
              that.$indicator.close()
            }
          })
        }


        
      }
    }
  }
</script>

<style scoped>
  .signatureBox {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }

  .visaDetailTop {
    /*position: absolute;*/
    /*top: 0px;*/
    /*left: 0px;*/
    width: 100%;
    /*overflow: hidden;*/
    padding: 5px;
    box-sizing: border-box;
    z-index: 2;
    border-bottom: 1px solid #e5e5e5;
  }

  .visaDetailTop p {
    margin: 0px;
    text-align: center;
    color: #000;
    font-size: 1em;
    position: relative;
  }

  p.visaTitle {
    width: 100%;
    position: absolute;
    top: 5px;
    left: 0px;
    text-align: center;
    font-size: 1.2em;
  }

  .btnBack {
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: transparent;
    border-color: transparent;
    outline: none;
  }

  .btnDaoHang {
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 2.2em;
    width: 2em;
    z-index: 1;
    background: transparent;
    border-color: transparent;
    outline: none;
  }

  .visaDetailTop p span {
    color: #fff;
    font-size: 1.2em;
  }

  .visaDetailTop p:first-of-type {
    float: left;
  }

  .visaDetailTop p:nth-of-type(2) {
    float: right;
  }

  .canvasBox {
    padding: 10px 5px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
  }

  canvas {
    border: 1px solid #26a2ff;
  }

  .btnBox {
    width: 50px;
    height: 30px;
    padding: 5px;
    transform: translate(0, 0);
  }

  .btnBox button:first-of-type {
    position: fixed;
    left: -8px;
    top: 18px;
    width: 50px;
    transform: rotate(90deg);
    color: #26a2ff;
    border: 1px solid #26a2ff;
    background: transparent;
    border-radius: 4px;
    padding: 5px 10px;
  }

  .btnBox .overwrite {
    position: fixed;
    left: -8px;
    top: 80px;
    width: 50px;
    transform: rotate(90deg);
    color: #26a2ff;
    border: 1px solid #26a2ff;
    background: transparent;
    border-radius: 4px;
    padding: 5px 10px;
  }

  .btnBox button:last-of-type {
    position: fixed;
    left: -33px;
    top: 167px;
    width: 100px;
    transform: rotate(90deg);
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }

  @media only screen and (min-width: 750px) {
    .signatureBox {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      overflow: visible;
    }
  }
</style>