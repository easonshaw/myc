<template>
    <div class="accountInfo">
        <div class="accountInfoMenu">
            <ul>
                <li :class="activeMenu == 'safepasswd' ? 'active' : ''"><router-link :to="{name: 'safepasswd'}"><div class="button">修改密码</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
                <li :class="activeMenu == 'safefundpasswd' ? 'active' : ''"><router-link :to="{name: 'safefundpasswd'}"><div class="button">修改资金密码</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
                <li :class="activeMenu == 'safeanswer' ? 'active' : ''"><router-link :to="{name: 'safeanswer'}"><div class="button">密保设定</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
                <li :class="activeMenu == 'safeotherlogin' ? 'active' : ''"><router-link :to="{name: 'safeotherlogin'}"><div class="button">异地登录</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
                <li :class="activeMenu == 'safegoogle' ? 'active' : ''"><router-link :to="{name: 'safegoogle'}"><div class="button">谷歌认证</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
            </ul>
        </div>
        <div class="accountInfoMain">
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser, getBalance, getNotice} from '../../service/getData'

    export default {
        data(){
            return{
                activeMenu: '',
            }
        },
        mounted(){
        },
        created() {
            this.initMenuSel();
        },
        watch: {
            '$route': function(to, from) {
                console.log(to)
                this.initMenuSel()
            }
        },
        computed: {

        },
        components:{

        },
        methods: {
            initMenuSel() {
                let pathParam = this.$route.path.split('/');
                this.activeMenu = pathParam[3];
            }
        },

    }

</script>

<style lang="scss" scoped>


</style>
