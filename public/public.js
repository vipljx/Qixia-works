import {Indicator} from 'mint-ui'
import Exif from 'exif-js'
function canvasDataURL(orientation,path, callback2) {
  let img = new Image()
  img.src = path
  img.onload = function () {
    let that = this
    let w = that.width,
        h = that.height,
        scale = w / h
    w = 750
    h = w / scale

    let quality = 1 // 默认图片质量为0.7
    //生成canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    // 创建属性节点
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    if(orientation && orientation != 1){
      switch(orientation){
          case 6://需要顺时针（向左）90度旋转
              //alert('需要顺时针（向左）90度旋转');
              rotateImg(that,'left',canvas,callback2,true);
              break;
          case 8://需要逆时针（向右）90度旋转
              //alert('需要逆时针（向右）90度旋转');
              rotateImg(that,'right',canvas,callback2,true);
              break;
          case 3://需要180度旋转
              //alert('需要180度旋转');
              rotateImg(that,'right',canvas,callback2,false);//转两次
              rotateImg(that,'right',canvas,callback2,true);
              break;
      }
    }else{
      ctx.drawImage(that, 0, 0, w, h);
      let base64 = canvas.toDataURL(quality);
      // 回调函数返回base64的值
      callback2(base64);
    }

    
  }
}

function rotateImg(img, direction,canvas,callback2,isCallBack) {
  //console.log(img)
  //alert(img);
  //最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0;
  var max_step = 3;
  //var img = document.getElementById(pid);
  if (img == null)return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  var height = img.height;
  var width = img.width;
  var scale = width / height;
  width = 750
  height = width / scale
  let quality = 1 // 默认图片质量为0.7
  //var step = img.getAttribute('step');
  var step = 2;
  if (step == null) {
      step = min_step;
  }
  if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
  } else {
      step--;
      step < min_step && (step = max_step);
  }
  //旋转角度以弧度值为参数
  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext('2d');
  // console.log(step)
  switch (step) {
      case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
      case 1:
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height,width,height);
          break;
      case 2:
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height,width,height);
          break;
      case 3:
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0,width,height);
          break;
  }

  if(isCallBack){
    let base64 = canvas.toDataURL(quality);
    // 回调函数返回base64的值
    callback2(base64);
  }
  
}

export function getBase64(e, callback) {
  Indicator.open({
    text: '图片处理中...',
    spinnerType: 'double-bounce'
  })
  let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
  Exif.getData(e, function(){
      Orientation = Exif.getTag(this, 'Orientation');
      //console.log(Orientation)
      let reader = new FileReader()
      reader.onload = () => {
          canvasDataURL(Orientation,reader.result, (data) => {
          Indicator.close();
          callback(data)
        })

      }
      reader.readAsDataURL(e)
  });
  
}
