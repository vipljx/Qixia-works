import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/js/jquery-3.3.1.min'

import '../public/global.css'
import 'mint-ui/lib/style.css'
import '../public/ljx.css'

import Header from './components/Header.vue'
import Header2 from './components/Header2.vue'
import { getBase64 } from "../public/public"


import MintUI from 'mint-ui'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css';
import { post, post2, fetch } from "../config/axios.js";
import Storage from './model/storage'
import {clear,Interval}  from './model/Interval'

Vue.use(MintUI)

Vue.use(Croppa, { componentName: 'my-image-cropper' })

Vue.component('Header', Header)
Vue.component('Header2', Header2)

import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
});


Validator.extend('mobile', {
    getMessage(field, args) {
        return '联系电话格式不正确'
    },
    validate(value) {
        return value.length == 11 && /^1[3456789]\d{9}$/.test(value)
    }
});

Validator.extend('tel', {
    getMessage(field, args) {
        return '电话格式不正确'
    },
    validate(value) {
        return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)
    }
});

Validator.extend('idCard', {
    getMessage(field, args) {
        return '身份证格式不正确'
    },
    validate(value) {
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)
    }
});

Validator.extend('regNo', {
    getMessage(field, args) {
        return '身份证或社会信用代码格式不正确'
    },
    validate(value) {
        var reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
        var reg2 = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;

        return reg1.test(value) || reg2.test(value);
    }
});

Validator.extend('code', {
    getMessage(field, args) {
        return '邮编格式不正确'
    },
    validate(value) {
        return /^[0-9][0-9]{5}$/.test(value)
    }
});


const dictionary = {
    zh_CN: {
        messages: {
            email: () => '邮箱格式不正确'
        },

    }
};

const dictionary2 = {
    zh_CN: {
        messages: {
            max: () => '字号不能超过6个字符'
        },

    }
};
Validator.localize(dictionary);
Validator.localize(dictionary2);

import Vconsole from 'vconsole'
let vConsole =new Vconsole()
export default vConsole


Vue.config.productionTip = false


Vue.prototype.$get = fetch;
Vue.prototype.$post = post;
Vue.prototype.$post2 = post2;
Vue.prototype.$storage = Storage;
Vue.prototype.$getBase64 = getBase64

router.beforeEach((to, from, next) => {
    //console.log(to)
    //console.log(from)
    //聊天弹出框
    clear();
    if(to.path=='/chat'){
        localStorage.setItem("clearInterval",false)
    }else{
        localStorage.setItem("clearInterval",true)
    }
    if(sessionStorage.getItem("uId")){
        Interval(()=>{
            router.push("/chat")
        });
    }
    
    //签字跳转sessionStorage丢失问题
    if(to.path=='/u' && to.query.isLogin){
        sessionStorage.setItem('userInfo',localStorage.getItem("userInfo"))
    }
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('userInfo')) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/loginOne',
            })
        }
    } else {
        next();
    }
})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
