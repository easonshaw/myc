<template>
    <div class="fundpasswd">
        <div class="fundpasswdTips">
            <i class="iconfont icon-tishi"></i>
            <span>提示：请妥善保管您的提款密码，如有遗忘请联系在线客服处理。</span>
        </div>
        <el-form :model="fundPwdForm" status-icon :rules="fundPwdFormRules" ref="fundPwdForm" label-width="150px" class="fundPwdForm">
            <el-form-item v-if="bIsGoogleAuth" label="输入谷歌验证码" prop="ggCode">
                <el-input type="text" v-model="fundPwdForm.ggCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="输入旧资金密码" prop="oldFundPwd">
                <el-input type="password" v-model="fundPwdForm.oldFundPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入新资金密码" prop="newFundPwd">
                <el-input type="password" v-model="fundPwdForm.newFundPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新资金密码" prop="renewFundPwd">
                <el-input type="password" v-model="fundPwdForm.renewFundPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('fundPwdForm')">确认修改</el-button>
                <el-button type="info"  @click="resetForm('fundPwdForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {setFundPwd, getSafeInfo} from '../../../service/getData'
    export default {
        data(){
            var validatenewFundPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的新资金密码'));
                } else {
                    callback();
                }
            };
            var validateoldFundPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的旧资金密码'));
                } else {
                    callback();
                }
            };
            var validateReFundPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.fundPwdForm.newFundPwd) {
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
                fundPwdForm: {
                    ggCode: '',
                    oldFundPwd: '',
                    newFundPwd: '',
                    renewFundPwd: ''
                },
                fundPwdFormRules: {
                    ggCode: [
                        { validator: validateggCode, trigger: 'blur' }
                    ],
                    oldFundPwd: [
                        { validator: validateoldFundPwd, trigger: 'blur' }
                    ],
                    newFundPwd: [
                        { validator: validatenewFundPwd, trigger: 'blur' }
                    ],
                    renewFundPwd: [
                        { validator: validateReFundPwd, trigger: 'blur' }
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
                let fundPwdData = await setFundPwd(
                    this.fundPwdForm.oldFundPwd,
                    this.fundPwdForm.newFundPwd,
                    this.fundPwdForm.ggCode,
                );
                this.fullscreenLoading = false;
                let that = this;
                if(fundPwdData.code == 0) {
                    let that = this;
                    this.$message({
                        message: '资金密码修改成功！',
                        type: 'success',
                        onClose: function() {
                            window.location.reload();
                        }
                    });

                } else {
                    this.$message.error(fundPwdData.msg);
                }
            },
            resetForm(formName) {
                this.fundPwdForm.oldFundPwd = '';
                this.fundPwdForm.newFundPwd = '';
                this.fundPwdForm.renewFundPwd = '';
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
