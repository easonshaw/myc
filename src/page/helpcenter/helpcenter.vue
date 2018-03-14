<template>
    <div>
        <head-top></head-top>
        <div class="head-bottom-line"></div>
        <div class="helpeWapper">
            <div class="helpeMenu">
                <router-link :to="{ name: 'deposit' }"><div class="title" :class="activeMenu == 'deposit' ? 'active' : ''">如何存款</div></router-link>
                <router-link :to="{ name: 'problem' }"><div class="title" :class="activeMenu == 'problem' ? 'active' : ''">常见问题</div></router-link>
                <router-link :to="{ name: 'palyways' }"><div class="title" :class="activeMenu == 'palyways' ? 'active' : ''">玩法介绍</div></router-link>
            </div>
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
                activeMenu: 'deposit',
            }
        },
         watch: {
            '$route': function(to, from) {
                this.initMenuSel()
            }
        },
        mounted(){

        },
        components:{
            headTop,
        },
        methods: {
            initMenuSel() {
                let pathParam = this.$route.path.split('/');
                this.activeMenu = pathParam[2];
            }
        },
    }
</script>

<style lang="scss" scoped>
.help-content{
    width: 100%;
    height: 900px;
    background: #fff;
    padding: 25px 35px;
}
.helpeWapper{
    width: 1270px;
    margin: 0 auto;
    min-height: 800px;
    color: #282828;
}
.helpeWapper .helpeMenu {
    width: 1270px;
    height: 53px;
    margin: 0 auto;
    margin-top: 30px;    
    border-bottom: 8px solid #FF6666;
}
.helpeWapper .helpeMenu .title{
    width: 160px;
    height: 45px;  
    border: 1px solid #898989;
    border-radius: 5px 5px 0px 0px;
    background: #C9CACA;
    float: left;
    color: #898989;
    text-align: center;
    margin-left: 30px;
    line-height: 45px;
}
.helpeWapper .helpeMenu .active{
    background: #FF6666;
    border: 1px solid #FF6666;
    color: #fff;
}
</style>
