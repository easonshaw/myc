<template>
    <div class="answer">
        <el-form v-if="!safeinfo.bIsAlredyProtect" :model="answerForm" status-icon :rules="answerFormRules" ref="answerForm" label-width="150px" class="answerForm">
            <el-form-item label="新密保问题" prop="question">
                <el-select v-model="answerForm.question" placeholder="请选择密保问题">
                    <el-option v-for="item in questionList" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新密保答案" prop="answer">
                <el-input v-model="answerForm.answer"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('answerForm')">保存</el-button>
            </el-form-item>
        </el-form>
        <div v-else class="isAlredyProtect">
            <i class="iconfont icon-yes"></i><span class="">密保已经设定</span>
            <p>密保问题是: <i>{{safeinfo.protectQuestion}}</i></p>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getSafeInfo, getSafeQuestion, setanswerQue} from '../../../service/getData'
    export default {
        data(){
            var validatequestion = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择一个密保问题'));
                } else {
                    callback();
                }
            };
            var validateanswer = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写密保答案'));
                } else {
                    callback();
                }
            };
            return{
                safeinfo: {
                    bIsAlredyProtect: true,
                },
                questionList: null,
                answerForm: {
                    question: '',
                    answer: '',
                },
                answerFormRules: {
                    question: [
                        { validator: validatequestion, trigger: 'change' },
                    ],
                    answer: [
                        { validator: validateanswer, trigger: 'blur' }
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
                       this.setanswerQueFunc();
                    } else {
                        return false;
                    }
                });
            },
            async setanswerQueFunc(){
                let answerData = await setanswerQue(this.answerForm.question, this.answerForm.answer);
                if(answerData.code == 0) {
                    let that = this;
                    this.$message({
                        message: '密保修改成功！',
                        type: 'success',
                        onClose: function() {
                            window.location.reload();
                        }
                    });

                } else {
                    this.$message.error(answerData.msg);
                }
                console.log(answerData);
            },
            async initData() {
                let fundPwdData = await getSafeInfo();
                if(fundPwdData.code == 0){
                    this.safeinfo = fundPwdData.result;
                }
                //this.safeinfo.bIsAlredyProtect = false;
                let questionData = await getSafeQuestion();
                if(questionData.code == 0) {
                    let ql = [];
                    for(var i in questionData.result){
                        ql.push(questionData.result[i]);
                    }
                    this.questionList = ql;
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
