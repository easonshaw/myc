<template>
    <div class="otherlogin">
        <div class="otherloginTips">
            <i class="iconfont icon-tishi"></i>
            <span>提示：异地登录校验防止帐号被盗用，保护账户安全(设定密保才可用)。</span>
        </div>
        <div class="otherloginstatus">设定状态: <span v-bind:class="{ active: isOtherLogin}"><i class="iconfont icon-circle"></i>  <span class="statustext" v-if="isOtherLogin">开启</span><span class="statustext" v-else>关闭</span></span></div>
        <div class="otherloginbutton">
            <el-button @click="setStatus(0)" type="danger" v-if="isOtherLogin">关闭异地登录功能</el-button>
            <el-button @click="setStatus(1)"  type="success" v-else>开启异地登录功能</el-button>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getSafeInfo, setotherLogin} from '../../../service/getData'
    export default {
        data(){
            return{
                isOtherLogin: false,
                safeinfo: {
                    bIsAlredyProtect: true,
                },
            }
        },
        mounted(){
            this.initData();
        },
        created() {
        },
        watch: {
        },
        computed: {
        },
        components:{
        },
        methods: {
            async setStatus(status) {
                let statusData = await  setotherLogin(status);
                console.log(statusData)
                if(statusData.code == 0) {
                    this.isOtherLogin = status;
                } else {
                    this.$message.error(statusData.msg);
                }
            },
            async initData() {
                let fundPwdData = await getSafeInfo();
                if(fundPwdData.code == 0){
                    this.safeinfo = fundPwdData.result;
                    this.isOtherLogin = this.safeinfo.bIsYDLogin;
                }
            },
        },

    }

</script>

<style lang="scss" scoped>


</style>
