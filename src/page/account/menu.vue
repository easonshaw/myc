<template>
    <div class="accountMenu">
        <div class="arrowTop">
            <span class="arrowL"></span>
            <span class="arrowR"></span>
        </div>
        <div class="menuMain">
            <ul>
                <li :class="activeMenu == 'info' ? 'active' : ''"><router-link :to="{ name: 'updateNickname' }">个人资料</router-link></li>
                <li :class="activeMenu == 'bindbankcard' ? 'active' : ''"><router-link :to="{ name: 'bankCardList' }">银行卡设置</router-link></li>
                <li :class="activeMenu == 'safe' ? 'active' : ''"><router-link :to="{ name: 'safepasswd' }">账户安全</router-link></li>
                <li :class="activeMenu == 'lotterys' ? 'active' : ''"><router-link :to="{ name: 'accountLotterys' }">彩种信息</router-link></li>
                <li :class="activeMenu == 'contract' ? 'active' : ''"><router-link :to="{ name: 'accountContract' }">我的契约</router-link></li>
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
                activeMenu: 'info',
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
