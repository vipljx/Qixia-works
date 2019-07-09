import {
  baseUrl, //引入baseUrl
  formBaseUrl, //引入baseUrl
  otherUrlA,//引入52地址
  otherUrlB,
  wxUrl,
} from "../config/env"
import axios from 'axios'
import Qs from 'qs'
import {Indicator} from 'mint-ui'

axios.defaults.timeout = 50000; //设置请求时间
// axios.defaults.baseURL = baseUrl;//设置默认接口地址
axios.async = false;


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}, isForm) {
  //axios.defaults.baseURL = isForm==true ? formBaseUrl : isForm=="3" ? otherUrlA : isForm=="4" ? otherUrlB :baseUrl
  if (isForm === true) {
    axios.defaults.baseURL = formBaseUrl
  } else if (isForm === 'wx') {
    axios.defaults.baseURL = wxUrl
  } else if (isForm == '3') {
    axios.defaults.baseURL = otherUrlA
  } else if (isForm == '4') {
    axios.defaults.baseURL = otherUrlB
  } else {
    axios.defaults.baseURL = baseUrl
  }
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      Indicator.close()
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, isForm,isQs=true) {
  //axios.defaults.baseURL = isForm ? formBaseUrl : baseUrl
  if (isForm === true) {
    axios.defaults.baseURL = formBaseUrl
  } else if (isForm === 'wx') {
    axios.defaults.baseURL = wxUrl
  } else {
    axios.defaults.baseURL = baseUrl
  }
  return new Promise((resolve, reject) => {
    if(isQs){
      data=Qs.stringify(data)
      //console.log(data)
    }
    axios({
      url: url,
      method: "post",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    })
    .then(res => {
        //成功
        resolve(res.data)
    })
    .catch(res => {
        //失败
        reject(res)
    })  
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post2(url, data = {}, isForm,isQs=true) {
  axios.defaults.baseURL = isForm ? formBaseUrl : baseUrl
  return new Promise((resolve, reject) => {
    if(isQs){
      data=Qs.stringify(data)
     // console.log(data)
    }
    axios({
      url: url,
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
        data: data
    })
    .then(res => {
        //成功
        resolve(res.data)
    })
    .catch(res => {
        //失败
        reject(res)
    })
          
  })
}
