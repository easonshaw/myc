<template>
    <div class="google">
        <el-form v-if="!bIsGoogleAuth" :model="googleForm" status-icon :rules="googleFormRules" ref="googleForm" label-width="150px" class="googleForm">
            <el-form-item label="输入资金密码" prop="pwdFuns">
                <el-input type="password" v-model="googleForm.pwdFuns" auto-complete="off" placeholder="请输入资金密码"></el-input>
            </el-form-item>
            <el-form-item label="输入动态密码" prop="code">
                <el-input type="password" v-model="googleForm.code" auto-complete="off" placeholder="请输入动态密码"></el-input>
            </el-form-item>
            <div class="googleFormTips">
                *该验证是谷歌推出的一款动态口令工具，可有效提供密码的安全性。
            </div>
            <el-form-item>
                <el-button type="danger" @click="submitForm('googleForm')">绑定</el-button>
            </el-form-item>
            <div class="googlecode" ><vue-q-art :config="config"></vue-q-art></div>
        </el-form>
        <div v-else class="isBindGoogle">
            谷歌验证：<el-button type="success" size="mini" round>已绑定无法做更改</el-button>
        </div>

        <div class="googleFormTips">
            *注意
            <p>密保问题、谷歌认证当成功绑定后将无法做更改</p>
        </div>
        <div class="googleFormDesc">
            <p>谷歌验证说明</p>
            <p>1. 扫描谷歌身份验证的QrCode后请立刻进行绑定。</p>
            <p>2. 当成功绑定谷歌身份验证后，绑定第二张以上的银行卡、变更密码和变更资金密码时，会强迫使用谷歌身份验证。</p>
            <p>3. 下载链接：  <el-button type="success" size="mini" round>安卓谷歌身份验证器</el-button>  <el-button type="warning" size="mini" round>苹果谷歌身份验证器</el-button>  <el-button type="primary" size="mini" round>安装谷歌身份验证器说明</el-button> </p>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getSafeInfo, getQrcode, setgooglebinding} from '../../../service/getData'
    import VueQArt from 'vue-qart'
    export default {
        data(){
            var validatepwdFuns = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('资金密码不能为空'));
                }
                callback();
            };
            var validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('动态密码不能为空'));
                }
                callback();
            };
            return{
                bIsGoogleAuth: false,
                config: {
                    value: '',
                    imagePath: './static/img/logo.png',
                    filter: 'color'
                },
                qrcode: null,
                googleForm: {
                    pwdFuns: '',
                    code: '',
                    secret: '',
                },
                googleFormRules: {
                    pwdFuns: [
                        { validator: validatepwdFuns, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            this.initData();
        },
        created() {
        },
        watch: {
            "$store.state.userInfo": function(n, o) {
                this.initData()
            }
        },
        computed: {
            ...mapState([
                'userInfo',
            ]),
        },
        components: {VueQArt},
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.setGoogleBind();
                    } else {
                        return false;
                    }
                });
            },
            async initData() {
                let fundPwdData = await getSafeInfo();
                if(fundPwdData.code == 0){
                    this.bIsGoogleAuth = fundPwdData.result.bIsGoogleAuth;
                }
                let qrcodeData = await getQrcode();
                if(qrcodeData.code == 0) {
                    this.qrcode = qrcodeData.result;
                    this.config.value = qrcodeData.result.qrcode;
                    this.googleForm.secret = qrcodeData.result.secret;
                } else {

                }
                console.log(qrcodeData);
            },
            async setGoogleBind() {
                let googleData = await setgooglebinding(
                    this.googleForm.pwdFuns,
                    this.googleForm.code,
                    this.googleForm.secret
                );
                this.fullscreenLoading = false;
                let that = this;
                if(googleData.code == 0) {
                    this.$message({
                        message: '恭喜您，谷歌认证绑定成功！',
                        type: 'success',
                        onClose: function() {
                        }
                    });

                } else {
                    this.$message.error(googleData.msg);
                }
            }
        },

    }

</script>

<style lang="scss" scoped>


</style>
