<template>
    <div class="main">
        <div class="cate flex align-items-center justify-content-space-between">
            <div class="cate-left flex1">{{name}}</div>
            <router-link :to="to">
                <div class="cate-right" v-if="isShow">
                    更多
                </div>
            </router-link>
            <div class="cate-ico"  v-if="isShow"><img src="../assets/images/ico1.png" alt=""></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        name: {
            type: String,
            required: true
        },
        isShow: {
            type: Boolean,
            required: true
        },
        to: {
            type: String,
            default: '/'
        },

    }
}
</script>