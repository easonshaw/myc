<template>
    <div class="createUser">
        <el-form :model="userForm" inline-message   ref="userForm" label-width="120px" class="editForm">
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
                        prop="registerNum"
                        label="注册人数"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="短域名"
                        width="300px"
                        sortable>
                    <template slot-scope="scope">
                        <div slot="reference" class="urlqrcode">
                            <el-input  placeholder="" v-model="scope.row.url" :disabled="true"></el-input>
                            <div class="buttons">
                                <span class="buttonDiv" > <el-button size="mini" type="text" v-clipboard:copy="scope.row.url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button> </span>
                                <span class="buttonDiv">
                                 <el-popover trigger="hover" placement="right">
                                     <vue-q-art :config="scope.row.qrcodecf"></vue-q-art>
                                    <div slot="reference" class="name-wrapper">
                                        <el-button size="mini" type="text">二维码</el-button>
                                    </div>
                                </el-popover>
                                </span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        width="200px"
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="cbStatus"
                        label="操作"
                        width="200px">
                    <template slot-scope="scope">
                        <div slot="reference" class="opreate">
                            <span class="op_detail"><a @click="spreadDetailFunc(scope.row.id)" href="javascript:;">详情</a></span>
                            <span class="op_delete"><a @click="spreadDeleteFunc(scope.row.id)" href="javascript:;">删除</a></span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="teamPagination">
                <div class="block">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="spreadListPager.page"
                            :page-size="spreadListPager.size"
                            :page-sizes="[5, 10, 20, 50, 100]"
                            :page-count="spreadListPager.pagetotals"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="spreadListPager.total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog title="推广详情" :visible.sync="spreadDetaildialogVisible" width="60%" >
            <div class="spreadDetailTableBlock">
                <table class="spreadDetailTable" width="100%">
                    <thead>
                    <tr><th width="180">类型</th><th colspan="2">{{spreadDetail.accountType}}</th></tr>
                    </thead>
                    <tbody>
                    <tr class=""><td>注册人数</td><td colspan="2">{{spreadDetail.accountType}}</td></tr>
                    <tr class=""><td>短域名</td><td colspan="2">{{spreadDetail.url}}</td></tr>
                    <tr class=""><td>备注</td><td colspan="2">{{spreadDetail.remark}}</td></tr>
                    <tr class=""><td>时时彩</td><td>返点：{{spreadDetail.rebatePointSSC}}</td><td>奖金：{{spreadDetail.bonusSSC}}</td></tr>
                    <tr class=""><td>两分分分彩</td><td>返点：{{spreadDetail.rebatePointLFFFC}}</td><td>奖金：{{spreadDetail.bonusLFFFC}}</td></tr>
                    <tr class=""><td>秒秒彩</td><td>返点：{{spreadDetail.rebatePointMMC}}</td><td>奖金：{{spreadDetail.bonusMMC}}</td></tr>
                    <tr class=""><td>福体彩</td><td>返点：{{spreadDetail.rebatePointFTC}}</td><td>奖金：{{spreadDetail.bonusFTC}}</td></tr>
                    <tr class=""><td>11选5</td><td>返点：{{spreadDetail.rebatePoint11X5}}</td><td>奖金：{{spreadDetail.bonus11X5}}</td></tr>
                    <tr class=""><td>两分11选5</td><td>返点：{{spreadDetail.rebatePointLF11X5}}</td><td>奖金：{{spreadDetail.bonusLF11X5}}</td></tr>
                    <tr class=""><td>北京赛车</td><td>返点：{{spreadDetail.rebatePointBJSC}}</td><td>奖金：{{spreadDetail.bonusBJSC}}</td></tr>
                    <tr class=""><td>快三</td><td>返点：{{spreadDetail.rebatePointK3}}</td><td>奖金：{{spreadDetail.bonusK3}}</td></tr>
                    <tr class=""><td>真人视讯</td><td colspan="2">返点：{{spreadDetail.rebatePointZRSX}}</td></tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import VueClipboard from 'vue-clipboard2'
    import {createSpread, getSpreadList, getSpreadDetail, delSpread} from '../../service/getData'
    import VueQArt from 'vue-qart'
    Vue.use(VueClipboard);
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
                spreadDetaildialogVisible: false,
                spreadDetail: [],
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
                    rebatePointZRSX: {
                        VALUE: 0, //真人视讯返点
                        TEXT: 1700,
                        LABEL: '真人视讯',
                    },
                },
                spreadListPager: {
                    page: 1,
                    size: 5,
                    total: 0,
                    pagetotals: 0,
                    field: '',
                    direction: '',
                },
                popover: null,
            }
        },
        mounted(){
            this.loading = this.$loading({ fullscreen: true });
            this.initData();
        },
        components: {VueQArt},
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
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            async initData() {
                if(this.userInfo != null && this.userInfo.bonusSSC != undefined) {
                    this.userForm.fastPointMax = this.userInfo.rebatePointSSC * 1;
                    this.loading.close();
                    this.loadSpreadList();
                }
            },
            async loadSpreadList() {
                let getSpreadListData = await getSpreadList(this.spreadListPager.page, this.spreadListPager.size);
                if(getSpreadListData.code == 0){
                    this.spreadlistData = getSpreadListData.result.rows;
                    for(var i in this.spreadlistData){
                        this.spreadlistData[i].qrcodecf = {
                            value: this.spreadlistData[i].url,
                            imagePath: './static/img/logo.png',
                            version: 20,
                            fillType: 'scale_to_fit',
                            filter: 'threshold'
                        }
                    }
                    this.spreadListPager.total = getSpreadListData.result.total;
                }
            },
            handleSizeChange(val) {
                this.spreadListPager.page = 1;
                this.spreadListPager.size = val;
                this.loadSpreadList();
            },
            handleCurrentChange(val) {
                this.spreadListPager.page = val;
                this.loadSpreadList();
            },
            fastPointhandleChange(val) {
                let fastPoint = this.calUserPointNO(val);
                this.fastPoint = val;
                let rabetkey;
                for(rabetkey in this.rebate){
                    if(rebetkey == 'rebatePointZRSX') continue;
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
                    this.rebate.rebatePointZRSX.VALUE* 1
                );
                if(createDatas.code == 0) {
                    let that = this;
                    this.$message({
                        showClose: true,
                        message: '添加推广链接成功',
                        type: 'success',
                        onClose: function() {
                            that.loadSpreadList();
                        }
                    });
                } else {
                    this.$message.error(createDatas.msg);
                }
                console.log(createDatas)
            },
            async spreadDetailFunc(id) {
                let detailData  = await getSpreadDetail(id);
                if(detailData.code == 0) {
                    this.spreadDetail = detailData.result;
                    this.spreadDetaildialogVisible = true;
                }
            },
            async spreadDeleteFunc(id) {
                let delData = await delSpread(id);
                if(delData.code == 0) {
                    let that = this;
                    this.$message({
                        showClose: true,
                        message: '推广链接删除成功',
                        type: 'success',
                        onClose: function() {
                            that.loadSpreadList();
                        }
                    });
                }
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
            spreadDetailhandleClose(){

            },
            onCopy (){
                this.$message({
                    message: '地址复制成功',
                    type: 'success'
                });
            },
            onError () {
                this.$message.error('地址复制失败,请手动复制.');
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
