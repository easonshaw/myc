<template>
    <div class="accountMenu">
        <div class="arrowTop">
            <span class="arrowL"></span>
            <span class="arrowR"></span>
        </div>
        <div class="menuMain">
            <ul>
                <li :class="activeMenu == 'gamerecord' ? 'active' : ''"><router-link :to="{ name: 'gamerecord' }">游戏记录</router-link></li>
                <li :class="activeMenu == 'agrecord' ? 'active' : ''"><router-link :to="{ name: 'agrecord' }">真人电子投注</router-link></li>
                <li :class="activeMenu == 'chaserecord' ? 'active' : ''"><router-link :to="{ name: 'chaserecord' }">追号记录</router-link></li>
                <li :class="activeMenu == 'transaction' ? 'active' : ''"><router-link :to="{ name: 'transaction' }">账变记录</router-link></li>
                <li :class="activeMenu == 'reportlist' ? 'active' : ''"><router-link :to="{ name: 'reportlist' }">盈亏报表</router-link></li>
                <li :class="activeMenu == 'agreport' ? 'active' : ''"><router-link :to="{ name: 'agreport' }">真人电子报表</router-link></li>
     

            </ul>
        </div>
        <div class="menuShadow"></div>
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
