<template>
    <div class="createUser">
        <el-form :model="userForm" :rules="userFormRules" ref="userForm" label-width="120px" class="demo-ruleForm">
        <div class="title">新增用户</div>
        <el-row :gutter="20">
            <el-col :span="12">
                    <el-form-item label="推广类型">
                        <el-radio-group v-model="userForm.accountType" size="medium">
                            <el-radio border label="4">代理</el-radio>
                            <el-radio border label="5">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="userForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="预设密码" >
                        <el-input v-model="userForm.passwd" :disabled="true"></el-input>
                    </el-form-item>

            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <div class="title">返点设置</div>
        <el-col :span="24">
            <el-col :span="8">
                <el-input-number v-model="fastPoint" @change="handleChange" :min="1" :max="10" label="快速返点设置"></el-input-number>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-col>
        <el-col :span="24">
        <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
        </el-col>
        </el-form>
        <div class="clear"></div>
    </div>
</template>

<script>

    export default {
        data(){
            var validateuserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,14}$/;
                if (!patrn.exec(value)) {
                    return callback(new Error('请输入5至15个字符组成'));
                }
                callback();
            };
            return{
                userForm: {
                    accountType: "4",
                    userName: '',
                    passwd: 'sky888',
                },
                userFormRules: {
                    userName: [
                        { validator: validateuserName, trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
        },
        computed:{

        },

        methods:{
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
