import {fetch}  from "../../config/axios.js";
import {MessageBox } from 'mint-ui'

var timer=null

function Interval(callback){
    timer=setInterval(()=>{
        queryChats(()=>{
            var clearInterval=localStorage.getItem("clearInterval")
            if(clearInterval=="true"){
                MessageBox({
                    title: '受理人发起聊天',
                    message: '是否进入聊天页面？',
                    showCancelButton: true,
                    confirmButtonText:"进入",
                    cancelButtonText:"拒绝"
                }).then(action => {
                    //console.log(action)
                    if(action=="confirm"){
                        callback()
                    }else{
                        localStorage.setItem("clearInterval",false)
                    }
                });
            }
        });

    },3000)

}
function queryChats(callBack){
    var chatList=JSON.parse(localStorage.getItem("chatList"))||[]
    fetch("/chat/queryChats", {
        toUser: sessionStorage.getItem("uId"),
        isRead:1
    }).then((res)=>{
        //console.log(res)
        if(res.resultCode=="200"){
            chatList=chatList.concat(res.data)
            localStorage.setItem("chatList",JSON.stringify(chatList))
            localStorage.setItem("toUser",res.data[0].fromUser)
            localStorage.setItem("aId",res.data[0].aId)
            localStorage.setItem("accnodeId",res.data[0].accnodeId)
            callBack();
        }
    }).catch(function(msg){
        console.log(msg);
    });
}
function clear(){
    clearInterval(timer)
}

export {clear,Interval} 