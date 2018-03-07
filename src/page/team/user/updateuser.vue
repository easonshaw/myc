<template>
    <div class="updateUser" >
        <el-form :model="userForm" inline-message :rules="userFormRules" ref="userForm" label-width="120px" class="editForm">
            <div class="title">修改用户</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户类型">
                        <el-radio-group v-model="userForm.accountType" size="medium">
                            <el-radio v-if="userForm.accountTypeInit == 4" border label="4">代理</el-radio>
                            <el-radio border label="5">会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用户名" prop="userName">
                        <el-input disabled v-model="userForm.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
            <div class="title">返点设置</div>
            <el-col :span="24">
                <el-col :span="20">
                    <el-form-item label="快速返点设置" class="fastSetPoint">
                        <el-slider
                                :min="userForm.fastPointMin"
                                :max="userForm.fastPointMax"
                                :step="0.1"
                                @change="fastPointhandleChange"
                                v-model="userForm.fastPoint"
                                show-input>
                        </el-slider>
                    </el-form-item>

                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="2"></el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="8" v-for="(item, key) in rebate">
                    <el-form-item :label="item.LABEL" :prop="key">
                        <el-input v-model="item.VALUE"></el-input>
                        <span class="pointText">{{item.TEXT}}</span>
                    </el-form-item>
                </el-col>
            </el-col>
            <el-col :span="24" class="userSubmit">
                    <el-button type="danger" @click="submitForm('userForm')">确认修改</el-button>
            </el-col>
            <div class="clear"></div>
        </el-form>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getUserbeforeUpdate, updateUser} from '../../../service/getData'
    export default {
        data(){
            var validateuserName = (rule, value, callback) => {
                console.log(value)
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,14}$/;
                if (!patrn.exec(value)) {
                    return callback(new Error('请输入5至15个字符组成'));
                }
                callback();
            };
            var validaterebatePoint = (rule, value, callback) => {
                if (!value) {
                    console.log(value)
                    return callback(new Error('返点值不能为空'));
                }
                if (value < 0 || value > this.fastPointMax) {
                    return callback(new Error('请输入合法数值'));
                }
                callback();
            };
            return{
                loading: null,
                userForm: {
                    accountType: "",
                    accountTypeInit: "",
                    userName: '',
                    passwd: 'sky888',
                    fastPoint: 0,
                    fastPointMin: 0,
                    fastPointMax: 12.8,
                    fastPointMinLABEL: 1700,
                    fastPointMaxLABEL: 1956,
                },
                rebate: {
                    rebatePointSSC: {
                        VALUE: 0, //时时彩返点
                        TEXT: 1700,
                        LABEL: '时时彩',
                    },
                    rebatePointLFFFC: {
                        VALUE: 0, //分分彩返点
                        TEXT: 1700,
                        LABEL: '两分分分彩',
                    },
                    rebatePointMMC: {
                        VALUE: 0, //秒秒彩返点
                        TEXT: 1700,
                        LABEL: '秒秒彩',
                    },
                    rebatePointFTC: {
                        VALUE: 0, //福体彩返点
                        TEXT: 1700,
                        LABEL: '福体彩',
                    },
                    rebatePoint11X5: {
                        VALUE: 0, //11选5返点
                        TEXT: 1700,
                        LABEL: '11选5',
                    },
                    rebatePointLF11X5: {
                        VALUE: 0, //分分11选5返点
                        TEXT: 1700,
                        LABEL: '两分11选5',
                    },
                    rebatePointBJSC: {
                        VALUE: 0, //北京赛车返点
                        TEXT: 1700,
                        LABEL: '11选5',
                    },
                    rebatePointK3: {
                        VALUE: 0, //快三返点
                        TEXT: 1700,
                        LABEL: '快三',
                    },
                    rebatePointBLYZ: {
                        VALUE: 0, //霸来运转返点
                        TEXT: 1700,
                        LABEL: '霸来运转',
                    },
                    rebatePointZRSX: {
                        VALUE: 0, //真人视讯返点
                        TEXT: 1700,
                        LABEL: '真人视讯',
                    },
                },
                userFormRules: {
                    userName: [
                        { validator: validateuserName, trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
            this.loading = this.$loading({ fullscreen: true });
            this.initData();
        },
        components:{
        },
        created() {

        },
        watch: {
            "$store.state.userInfo": function(n, o) {
                this.initData();
            }
        },
        computed:{
            ...mapState([
                'userInfo',
            ]),
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            async initData() {
                if(this.userInfo != null && this.userInfo.bonusSSC != undefined) {
                    this.userForm.fastPointMax = this.userInfo.rebatePointSSC * 1;
                    this.loading.close();
                }
                let updateUserData = await getUserbeforeUpdate(this.$route.params.uid);
                if(updateUserData.code == 0){
                    this.userForm.fastPoint =  updateUserData.result.rebatePointSSC;
                    this.userForm.userName = updateUserData.result.userName;
                    this.userForm.accountType = updateUserData.result.accountType+"";
                    this.userForm.accountTypeInit = updateUserData.result.accountType+"";
                    let rabetkey;
                    for(rabetkey in this.rebate){
                        let val = updateUserData.result[rabetkey];
                        this.rebate[rabetkey].VALUE = val;
                        this.rebate[rabetkey].TEXT =  this.calUserPointNO(val);
                    }
                } else {
                    this.$message.error(updateUserData.msg);
                    this.$router.go(-1);
                }
            },
            fastPointhandleChange(val) {
                let fastPoint = this.calUserPointNO(val);
                this.fastPoint = val;
                let rabetkey;
                for(rabetkey in this.rebate){
                    this.rebate[rabetkey].VALUE = val;
                    this.rebate[rabetkey].TEXT = fastPoint;
                }
                console.log(val, fastPoint)
            },
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateUserFunc();
                    } else {
                        return false;
                    }
                });
            },
            async updateUserFunc() {
                let updateData = await updateUser(
                    this.$route.params.uid,
                    this.userForm.accountType,
                    this.rebate.rebatePointSSC.VALUE,
                    this.rebate.rebatePointLFFFC.VALUE,
                    this.rebate.rebatePointMMC.VALUE,
                    this.rebate.rebatePointFTC.VALUE,
                    this.rebate.rebatePoint11X5.VALUE,
                    this.rebate.rebatePointLF11X5.VALUE,
                    this.rebate.rebatePointBJSC.VALUE,
                    this.rebate.rebatePointK3.VALUE,
                    this.rebate.rebatePointBLYZ.VALUE,
                    this.rebate.rebatePointZRSX.VALUE,
                    '0',
                    '0',
                    '0'
                );
                if(updateData.code == 0) {
                    this.$router.push({'name': 'userlist'});
                } else {
                    this.$message.error(updateData.msg);
                }
                console.log(updateData)
            },
            resetForm(formName) {
            },
            calUserPointNORate(val) {
                //返点=100%*（奖励号-最低赔率）/2000
                return (val-1700)*100/2000;
            },
            calUserPointNO(val) {
                return 1700 + ((2000-1700)/15) * val;
            },
            validaterebatePoint(v){
                //console.log(v)
            }
    },
}
</script>

<style lang="scss" scoped>
</style>
