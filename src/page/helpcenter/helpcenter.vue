<template>
    <div>
        <head-top></head-top>
        <div class="head-bottom-line"></div>
        <div class="wapper">
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </div><div class="clear"></div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import {} from '../../service/getData'

    export default {
        data(){
            return{
            }
        },
        mounted(){

        },
        components:{
            headTop,
        },
    }

</script>

<style lang="scss" scoped>


</style>
