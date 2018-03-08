<template>
    <div class="accountMenu">
        <div class="arrowTop">
            <span class="arrowL"></span>
            <span class="arrowR"></span>
        </div>
        <div class="menuMain">
            <ul>
                <li :class="activeMenu == 'recharge' ? 'active' : ''"><router-link :to="{ name: 'recharge' }">充提记录</router-link></li>
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
