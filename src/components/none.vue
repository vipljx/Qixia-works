<template>
    <div class="none" v-if="isShow">
        <div class="none-tp"><img src="../assets/images/a_4.png" alt=""></div>
        <div class="none-bt">{{note}}</div>
    </div>
</template>
<script>
export default {
    props:['isShow','note']
    
}
</script>