<template>
    <div class="">
        <el-form :model="updateNickForm" ref="updateNickForm" :rules="rules" label-width="100px" class="ruleForm">
            <el-row :gutter="12">
                <el-col :span="10"><div class="grid-content bg-purple"><el-form-item label="用户昵称" prop="nickName">
                    <el-input type="text" v-model="updateNickForm.nickName" auto-complete="off"></el-input>
                </el-form-item></div></el-col>
                <el-col :span="4"><span class="updateNickLabel">由1至10个字符组成</span></el-col>
            </el-row>



            <el-form-item>
                <el-button type="danger" @click="submitForm('updateNickForm')">修改昵称</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {setNickname} from '../../../service/getData'
    export default {
        data(){
            var validatenickName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('昵称不能为空'));
                }
                var patrn=/^[a-zA-Z0-9\u4E00-\u9FFF]{1,20}$/;
                if (!patrn.exec(value)) {
                    return callback(new Error('请输入1至10个字符组成'));
                }
                callback();
            };
            return{
                updateNickForm: {
                    nickName: '',
                },
                rules: {
                    nickName: [
                        { validator: validatenickName, trigger: 'blur' }
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
        components:{

        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
             submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.setNicknameFunc();
                    } else {
                        return false;
                    }
                });
            },
            initData() {
                if (this.userInfo) {
                    this.updateNickForm.nickName = this.userInfo.nickName;
                }
            },
            async setNicknameFunc() {
                let changeRs = await setNickname(
                    this.updateNickForm.nickName,
                );
                this.fullscreenLoading = false;
                let that = this;
                if(changeRs.code == 0) {
                    let userData = this.userInfo;
                    userData['nickName'] = this.updateNickForm.nickName;
                    this.RECORD_USERINFO(userData);
                    this.$message({
                        message: '恭喜您，昵称修改成功！',
                        type: 'success',
                        onClose: function() {

                        }
                    });

                } else {
                    this.$message.error(changeRs.msg);
                }
            }
        },

    }

</script>

<style lang="scss" scoped>


</style>
