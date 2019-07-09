import {
  baseUrl, //引入baseUrl
} from "../config/env"
import axios from 'axios'

let url = baseUrl

function getOpenId() {
  //获取code
  const local_url = window.location.href;
  const appid = 'wxcb742ae8c5045a26'
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + local_url + "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
}

//保存openid
function saveId(code) {
  axios.get(url + '/getOpenId', {
    params: {
      code: code
    }
  }).then(res => {
    let response = res.data
    if (response.resultCode === 200) {
      localStorage.setItem('openId', response.data.openid)
      localStorage.setItem('unionid', response.data.unionid)
      getUserInfo(response.data.unionid)
    }
  })
  //     .catch(err => {
  //
  // })
}

function getUserInfo(id) {
  axios.get(url + '/login/queryUsersByUnionid', {
    params: {
      unionid: id
    }
  }).then(res => {
    let response = res.data
    if (response.resultCode === 200) {
      let data = {
        card: response.data.cardNo,
        name: response.data.uName,
        phone: response.data.mobile
      }
      localStorage.setItem('userInfo', JSON.stringify(data))
      sessionStorage.setItem('userInfo', JSON.stringify(data))
      sessionStorage.setItem('uId', response.data.uId)
    }
  })
  // .catch(err => {
  //
  // })
}

// 获取url中的参数
function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}

export function login() {
  //人脸认证回调不执行登录
  if (getUrlParam("flag") !== null) {
    return false
  }
  let code = getUrlParam("code")
  !code ? getOpenId() : saveId(code)
}

