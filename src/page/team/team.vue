<template>
    <div>
        <head-top activeNav="team"></head-top>
        <div class="head-bottom-line"></div>
        <div class="wapper">
            <team-menu ></team-menu>
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </div><div class="clear"></div>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import teamMenu from '../../page/team/menu'
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
            teamMenu,
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
