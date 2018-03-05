<template>
    <div class="accountInfo">
        <div class="accountInfoMenu">
            <ul>
                <li :class="activeMenu == 'updateNickname' ? 'active' : ''"><router-link :to="{name: 'updateNickname'}"><div class="button">修改昵称</div><span class="arrowRight"><i class="iconfont icon-arrow-right"></i></span></router-link></li>
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
                activeMenu: 'updateNickname',
            }
        },
        mounted(){
        },
        created() {
        },
        watch: {
            '$route': function(to, from) {
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
