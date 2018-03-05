<template>
    <div class="loginContainer">
        <div class="logo">
            <img src="../../images/login_logo.png" />
        </div>
        <ul class="loginNav">
            <li class=""><router-link :to="{path: '/login'}">用户登录</router-link></li>
            <li><router-link :to="{path: '/home'}">线路检测</router-link></li>
            <li><a @click="downAppdialogVisible = true">下载中心</a></li>
        </ul>
        <el-form  v-if="forgetWay == 'normal'" :model="forgetNormalForm" status-icon :rules="forgetNormalRule" ref="forgetNormalForm" label-width="100px" class="forgetForm">
                <p>密保认证</p>
                <el-form-item label="银行卡姓名" prop="bankCardName">
                    <el-input class="forgetForm-input" placeholder="请输入银行卡姓名" type="text" v-model="forgetNormalForm.bankCardName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资金密码" prop="fundsPwd">
                    <el-input class="forgetForm-input" placeholder="请输入资金密码" type="text" v-model="forgetNormalForm.fundsPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密保答案" prop="answer">
                    <el-input class="forgetForm-input" placeholder="请输入密保答案" type="text" v-model="forgetNormalForm.answer" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwdLogin">
                    <el-input class="forgetForm-input" placeholder="请输入新密码" type="text" v-model="forgetNormalForm.newPwdLogin" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" prop="renewPwdLogin">
                    <el-input class="forgetForm-input" placeholder="请输入新密码" type="text" v-model="forgetNormalForm.renewPwdLogin" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" class="forgetSubmit" @click="submitForm('forgetNormalForm')">资料认证</el-button>
                </el-form-item>

        </el-form>
        <el-form  v-if="forgetWay == 'google'" :model="forgetGoogleForm" status-icon :rules="forgetGoogleRule" ref="forgetNormalForm" label-width="100px" class="forgetForm">
                <p>Google 验证</p>
                <el-form-item label="银行卡姓名" prop="forgetGoogleForm.code">
                    <el-input class="forgetForm-input" placeholder="请输入号码" type="text" v-model="forgetGoogleForm.code" auto-complete="off"></el-input>
                </el-form-item>
        </el-form>

        <el-form  v-if="forgetWay == 'denied'"  status-icon  label-width="100px" class="forgetForm">
            <div class="denied">
                <p>忘记密码资料验证</p>
                <div class="deniedmsg">{{deniedmsg}}</div>
            </div>
        </el-form>

        <footcopyright></footcopyright>
        <dialogDownApp :downAppdialogVisible="downAppdialogVisible" @on-downapp-result-change="ondownAppResultChange"></dialogDownApp>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {userPassgetWay, changePassword} from '../../service/getData'
    import footcopyright from 'src/components/footer/footCopyright.vue'
    import dialogDownApp from 'src/components/common/dialogDownApp.vue'
    export default {
        data(){
            var validatenotempty = (rule, value, callback) => {
                if (!value) { return callback(new Error('不能为空')); }
                callback();
            };
            var validateRepass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请再次输入密码'));
                } else if (value !== this.forgetNormalForm.newPwdLogin) {
                    return callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                forgetWay: null,
                deniedmsg: '',
                forgetNormalForm: {
                    userName: this.$router,
                    bankCardName: null,
                    fundsPwd: null,
                    answer: null,
                    newPwdLogin: null,
                    renewPwdLogin: null,
                },
                forgetGoogleForm: {
                    code: null,
                },
                forgetNormalRule: {
                    bankCardName: [{ validator: validatenotempty, trigger: 'blur' }],
                    fundsPwd: [{ validator: validatenotempty, trigger: 'blur' }],
                    answer: [{ validator: validatenotempty, trigger: 'blur' }],
                    newPwdLogin: [{ validator: validatenotempty, trigger: 'blur' }],
                    renewPwdLogin: [{ validator: validateRepass, trigger: 'blur' }],
                },
                forgetGoogleRule: {
                    code: [{ validator: validatenotempty, trigger: 'blur' }],
                },
                fullscreenLoading: false,
                downAppdialogVisible: false,
            }
        },
        created(){
            this.getWay();
        },
        components: {
            footcopyright,
            dialogDownApp,
        },
        mounted() {
            
        },
        computed: {
            
        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.fullscreenLoading = true;
                        this.changePassword();
                    } else {
                        return false;
                    }
                });

            },
            ondownAppResultChange(val) {
                this.downAppdialogVisible = val;
            },
            async getWay() {
                let username = this.forgetNormalForm.userName = this.$route.params.username;
                let way = await userPassgetWay(username);

                if(way.code == 0) {
                    if(way.result.bIsGoogleAuth) {
                        this.forgetWay = 'google';
                    }
                    if(way.result.bIsAlredyProtect) {
                        this.forgetWay = 'normal';
                    }

                } else {
                    this.forgetWay = 'denied';
                    this.deniedmsg = way.msg;
                }

            },
            async changePassword() {
                let changeRs = await changePassword(
                    this.forgetNormalForm.userName,
                    this.forgetNormalForm.bankCardName,
                    this.forgetNormalForm.fundsPwd,
                    this.forgetNormalForm.answer,
                    this.forgetNormalForm.newPwdLogin
                );
                this.fullscreenLoading = false;
                let that = this;
                if(changeRs.code == 0) {
                    this.$message({
                        message: '恭喜您，密码修改成功！前往登录页面中...',
                        type: 'success',
                        onClose: function() {
                            that.$router.push('/login');
                        }
                    });

                } else {
                    this.$message.error(changeRs.msg);
                }
            },
            download (){

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.1.0/lib/theme-chalk/index.css");
    .loginContainer{
        width: 100%;
        height: 100%;
        background: url(../../images/login-bg.png) no-repeat 50%;
        background-size: cover;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .logo{
            padding-top: 0px;
            text-align: center;
        }
        .loginNav{
            width: 500px;
            margin: 0px auto;
            height: 45px;
            margin-top: 0px;
        }
        .loginNav li{
            width: 160px;
            height: 45px;
            float: left;
            margin-right: 10px;
        }
        .loginNav li:last-child{
            margin-right: 0;
        }
        .loginNav li a{
            background: #c9caca;
            color: #727171;
            display: block;
            height: 40px;
            line-height: 40px;
            margin-bottom: 5px;
            text-decoration: none;
            cursor: pointer;
            font-size: 18px;
            border-radius: 5px 5px 0 0;
            text-align: center;
        }
        .loginNav li.current a{
            background: #fff;
            height: 45px;
            line-height: 40px;
            margin-bottom: 5px;
            margin-bottom: 0;
            color: #eb6464;
        }
        .forgetForm{
            width: 500px;
            padding: 30px 0 5px 0;
            margin: 0px auto;
            background: #fff;
            border-radius: 0 0 5px 5px;
            margin-bottom: 20px;

        }

        .forgetForm  p{
            font-size: 23px;
            padding: 0 0 20px 0;
            color: #d8584a;
            text-align: center;
        }
        .forgetForm  .forgetForm-input,
        .forgetForm  .forgetForm-input{
            width: 350px;
            height: 40px;
        }
        .forgetForm .forgetSubmit{
            width: 300px;
            height: 45px;
            color: #fff;
            font-size: 18px;
            margin: 10px auto;
        }
        .forgetForm .denied{
            padding: 20px 0 40px 0;
            text-align: center;
        }
        .forgetForm .denied p{
            font-size: 23px;
            padding: 0 0 20px 0;
            color: #d8584a;
            text-align: center;
        }
        .forgetForm .denied .deniedmsg{
            padding: 5px 0 20px 20px;
            text-align: center;
            color: #3c3c3c;
        }

    }

</style>
