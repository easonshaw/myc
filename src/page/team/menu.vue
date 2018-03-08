<template>
    <div class="accountMenu teamMenu">
        <div class="arrowTop">
            <span class="arrowL"></span>
            <span class="arrowR"></span>
        </div>
        <div class="menuMain teammenuMain">
            <ul>
                <li :class="activeMenu == 'index' ? 'active' : ''"><router-link :to="{ name: 'teamsummary' }">团队总览</router-link></li>
                <li :class="activeMenu == 'createuser' ? 'active' : ''"><router-link :to="{ name: 'createuser' }">开户中心</router-link></li>
                <li :class="activeMenu == 'user' ? 'active' : ''"><router-link :to="{ name: 'userlist' }">会员管理</router-link></li>
                <li :class="activeMenu == 'spread' ? 'active' : ''"><router-link :to="{ name: 'spread' }">推广设定</router-link></li>
                <li :class="activeMenu == 'bets' ? 'active' : ''"><router-link :to="{ name: 'teambets' }">团队投注</router-link></li>
                <li :class="activeMenu == 'schedule' ? 'active' : ''"><router-link :to="{ name: 'teamschedule' }">团队追号</router-link></li>
                <li :class="activeMenu == 'reports' ? 'active' : ''"><router-link :to="{ name: 'teamreports' }">团队报表</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">团队充提</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">团队帐变</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">真人电子团队报表</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">真人电子团队投注</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">分红下发记录</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">日奖励下发记录</router-link></li>

            </ul>
        </div>
        <div class="menuShadow teammenuShadow"></div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser, getBalance, getNotice} from '../../service/getData'

    export default {
        data(){
            return{
                activeMenu: 'index',
                currentPath: this.$route.path
            }
        },
        mounted(){

        },
        created() {
            this.initMenuSel();
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
                this.activeMenu = pathParam[2];
            }
        },

    }

</script>

<style lang="scss" scoped>


</style>
