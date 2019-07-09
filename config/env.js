//根据不同的环境更改不同的baseUrl
let baseUrl = '';
let formBaseUrl = '';
let otherUrlA= '';
let otherUrlB= '';
let otherUrlC= '';
let otherUrlD= '';
let wxUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.101.37:9091';//http://192.168.101.37:9091
  // formBaseUrl = 'http://192.168.101.37:8081';//http://192.168.101.110:9091
  // otherUrlA = 'http://222.190.145.130:8068';
  // otherUrlB = 'http://222.190.145.130:8163';
  // otherUrlC = 'http://192.168.101.37:8163';//http://192.168.101.110:8063
  // otherUrlD = 'http://222.190.145.130:8162';
  // wxUrl = 'http://face.wohewomen.com';
  // baseUrl = 'http://qxzwtestapi.zhengebang.com';
  formBaseUrl = 'http://101.37.64.109:9094';//http://192.168.101.110:9091
  otherUrlA = 'https://mynjcancel.zhengebang.com';
  otherUrlB = 'https://mynjindex.zhengebang.com';
  otherUrlC = 'https://mynjindex.zhengebang.com';//http://192.168.101.110:8063
  otherUrlD = 'https://qxgsadmin.zhengebang.com';
  wxUrl = 'http://face.wohewomen.com';

} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://qxzwapi.zhengebang.com';
  formBaseUrl = 'https://qxzwbform.zhengebang.com';//http://192.168.101.110:9091
  otherUrlA = 'https://mynjcancel.zhengebang.com';
  otherUrlB = 'https://mynjindex.zhengebang.com';
  otherUrlC = 'https://mynjindex.zhengebang.com';//http://192.168.101.110:8063
  otherUrlD = 'https://qxgsadmin.zhengebang.com';
  wxUrl = 'http://face.wohewomen.com';
}

export {
  baseUrl,
  formBaseUrl,
  otherUrlA,
  otherUrlB,
  otherUrlC,
  otherUrlD,
  wxUrl
}