<template>
    <div class="">
        <el-form :model="passwdForm" status-icon :rules="passwdFormRules" ref="passwdForm" label-width="150px" class="passwdForm">
            <el-form-item v-if="bIsGoogleAuth" label="输入谷歌验证码" prop="ggCode">
                <el-input type="text" v-model="passwdForm.ggCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="输入旧登录密码" prop="oldLoginPwd">
            <el-input type="password" v-model="passwdForm.oldLoginPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入新登录密码" prop="newLoginPwd">
                <el-input type="password" v-model="passwdForm.newLoginPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新登录密码" prop="renewLoginPwd">
                <el-input type="password" v-model="passwdForm.renewLoginPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('passwdForm')">确认修改</el-button>
                <el-button type="info"  @click="resetForm('passwdForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {setLoginPwd, getSafeInfo} from '../../../service/getData'
    export default {
        data(){
            var validateLoginPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的新登录密码'));
                } else {
                    callback();
                }
            };
            var validatenewLoginPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的旧登录密码'));
                } else {
                    callback();
                }
            };
            var validateReLoginPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwdForm.newLoginPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateggCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入谷歌动态验证码'));
                } else {
                    callback();
                }
            };
            return{
                bIsGoogleAuth: false,
                passwdForm: {
                    ggCode: '',
                    oldLoginPwd: '',
                    newLoginPwd: '',
                    renewLoginPwd: ''
                },
                passwdFormRules: {
                    ggCode: [
                        { validator: validateggCode, trigger: 'blur' }
                    ],
                    oldLoginPwd: [
                        { validator: validateLoginPwd, trigger: 'blur' }
                    ],
                    newLoginPwd: [
                        { validator: validatenewLoginPwd, trigger: 'blur' }
                    ],
                    renewLoginPwd: [
                        { validator: validateReLoginPwd, trigger: 'blur' }
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

        },
        computed: {

        },
        components:{

        },
        methods: {
            async initData() {
                let fundPwdData = await getSafeInfo();
                if(fundPwdData.code == 0){
                    this.bIsGoogleAuth = fundPwdData.result.bIsGoogleAuth;
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.setLoginPwdFunc();
                    } else {
                        return false;
                    }
                });
            },
            async setLoginPwdFunc() {
                let loginData = await setLoginPwd(
                    this.passwdForm.oldLoginPwd,
                    this.passwdForm.newLoginPwd,
                    this.passwdForm.ggCode,
                );
                this.fullscreenLoading = false;
                let that = this;
                if(loginData.code == 0) {
                    let that = this;
                    this.$message({
                        message: '密码修改成功！',
                        type: 'success',
                        onClose: function() {
                            that.$router.push({name: 'login'})
                        }
                    });

                } else {
                    this.$message.error(loginData.msg);
                }
            },
            resetForm(formName) {
                this.passwdForm.oldLoginPwd = '';
                this.passwdForm.newLoginPwd = '';
                this.passwdForm.renewLoginPwd = '';
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    } else {
                        return false;
                    }
                });
            }
        },

    }

</script>

<style lang="scss" scoped>


</style>
