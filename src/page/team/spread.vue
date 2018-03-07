<template>
    <div class="createUser">
        <el-form :model="userForm" inline-message :rules="userFormRules" ref="userForm" label-width="120px" class="editForm">
            <div class="title">新增推广</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户类型">
                        <el-radio-group v-model="userForm.accountType" size="medium">
                            <el-radio border label='4'>代理</el-radio>
                            <el-radio border label='5'>会员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="">
                        <el-input v-model="userForm.remark" type="textarea"
                                  :rows="2"></el-input>
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
                <el-button type="danger" @click="submitForm('userForm')">确认新增</el-button>
            </el-col>
            <div class="clear"></div>
        </el-form>
        <div class="spreadlist">
            <el-table :data="spreadlistData" border style="width: 100%" :header-row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}" >
                <el-table-column
                        prop="accountType"
                        label="类型">
                    <template slot-scope="scope">
                        <div slot="reference">
                            <span v-if="scope.row.accountType == 1">平台</span>
                            <span v-if="scope.row.accountType == 2">招商</span>
                            <span v-if="scope.row.accountType == 3">直属</span>
                            <span v-if="scope.row.accountType == 4">代理</span>
                            <span v-if="scope.row.accountType == 5">会员</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bonusSSC"
                        label="时时彩奖金"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="accountBalance"
                        label="注册人数"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="teamBalance"
                        label="短域名"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="onlineStatus"
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="cbStatus"
                        label="操作"
                        width="200px">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span class="opstatus_detail"><router-link :to="{path:''}">详情</router-link></span>
                            <span class="opstatus_fdset"><router-link :to="{name: 'updateuser', params: {uid: scope.row.id}}">返点设定</router-link></span>
                            <span class="opstatus_betsrecord"><router-link :to="{path: ''}">投注记录</router-link></span>
                            <span class="opstatus_qy" v-if="scope.row.cbStatus != 0"><router-link :to="{path: ''}">契约</router-link></span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {createSpread, getSpreadList} from '../../service/getData'
    export default {
        data(){
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
                userForm: {
                    accountType: '4',
                    remark: '',
                    fastPoint: 0,
                    fastPointMin: 0,
                    fastPointMax: 12.8,
                    fastPointMinLABEL: 1700,
                    fastPointMaxLABEL: 1956,
                },
                spreadlistData:[],
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
                        LABEL: '时时彩',
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
                let getSpreadListData = await getSpreadList();
                console.log(getSpreadListData);
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
                            this.createSpread();
                        } else {
                            return false;
                        }
                });
            },
            async createSpread() {
                let createDatas = await createSpread(
                    this.userForm.remark,
                    this.userForm.accountType * 1,
                    this.rebate.rebatePointSSC.VALUE * 1,
                    this.rebate.rebatePointLFFFC.VALUE * 1,
                    this.rebate.rebatePointMMC.VALUE * 1,
                    this.rebate.rebatePointFTC.VALUE * 1,
                    this.rebate.rebatePoint11X5.VALUE * 1,
                    this.rebate.rebatePointLF11X5.VALUE * 1,
                    this.rebate.rebatePointBJSC.VALUE * 1,
                    this.rebate.rebatePointK3.VALUE * 1,
                    this.rebate.rebatePointBLYZ.VALUE * 1,
                    this.rebate.rebatePointZRSX.VALUE* 1
                );
                if(createDatas.code == 0) {
                    this.$router.push({'name': 'userlist'});
                } else {
                    this.$message.error(createDatas.msg);
                }
                console.log(createDatas)
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
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
