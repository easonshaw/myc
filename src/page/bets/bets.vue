<template>
    <div>
        <head-top activeNav="bets"></head-top>
        <div class="head-bottom-line"></div>
        <div class="wapper">
            <bets-menu ></bets-menu>
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </div><div class="clear"></div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import betsMenu from '../../page/bets/menu'
    import {} from '../../service/getData'

    export default {
        data(){
            return{
                currentAccMenu: ''
            }
        },
        mounted(){

        },
        components:{
            headTop,
            betsMenu,
        },
        created() {

        },
        computed:{

        },

        methods:{
            //点击图标刷新页面
            reload(){
                window.location.reload();
            }
        },
    }

</script>

<style lang="scss" scoped>


</style>
