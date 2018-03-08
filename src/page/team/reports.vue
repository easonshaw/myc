<template>
    <div class="teamPage">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="时间">
                            <el-row>
                                <el-col :span="11">
                                    <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd H:i" v-model="filterform.start" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd H:i" v-model="filterform.end" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label=" " class="">
                            <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                            <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="用户名">
                            <el-input  v-model="filterform.userName" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="18" class="">
                        <div class="searchTeamBets"><el-button class="" type="danger" @click="onFilterSubmit">查询</el-button></div>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <div class="teamlist" >
            <el-table :data="teamreportsData" v-loading="reportstableloading" @sort-change="teambetssortchange" border style="width: 100%" :header-row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}" >
                <el-table-column
                        prop="userName"
                        label="帐号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="betTotal"
                        label="总消费"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="winTotal"
                        label="总消费派奖"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="betRebateTotal"
                        label="总返点"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="activityTotal"
                        label="总活动"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="realGainTotal"
                        label="总盈亏"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="rechargeTotal"
                        label="总充值"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="withdrawTotalOfAccept"
                        label="总提款"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="dividendTotal"
                        label="总红利/其他"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="withdrawTotalOfAccept"
                        label="投注笔数"
                        sortable>缺少数据
                </el-table-column>
            </el-table>
            <div class="teamPagination">
                <div class="block">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="filterform.page"
                            :page-size="filterform.size"
                            :page-sizes="[1, 5, 10, 20, 50, 100]"
                            :page-count="filterform.pagetotals"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="filterform.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTeamReportsList} from '../../service/getData'
    export default {
        data(){
            return{
                TIMERULE: ' 03:00',
                teamreportsData: [],
                reportstableloading: true,
                reportsTableVisabel: false,
                filterform: {
                    start: null,
                    end: null,
                    userName: '',
                    page: 1,
                    size: 10,
                    total: 0,
                    field: '',
                    direction: '',
                },
                istoday: 2,
                isgroup: 0
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
            this.initFilterData();
        },
        watch: {
        },
        computed:{
        },
        methods:{
            initFilterData() {
                var nowdate = new Date();
                var oneweekdate = new Date(nowdate-7*24*3600*1000);
                var y = oneweekdate.getFullYear();
                var m = oneweekdate.getMonth()+1;
                var d = oneweekdate.getDate();
                var yn = nowdate.getFullYear();
                var mn = nowdate.getMonth()+1;
                var dn = nowdate.getDate();
                this.filterform.start = y+'-'+m+'-'+d+this.TIMERULE;
                this.filterform.end = yn+'-'+mn+'-'+dn+this.TIMERULE;
            },
            dateSel(type) {
                this.istoday = type;
                var nowdate = new Date();
                if(type == 1){
                    var beforedate = new Date(new Date().getTime() - 1*24*3600*1000);
                    this.filterform.start = beforedate.getFullYear()+'-'+(beforedate.getMonth()+1)+'-'+beforedate.getDate()+this.TIMERULE;
                    this.filterform.end = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate()+this.TIMERULE;
                } else {
                    var afterdate = new Date(new Date().getTime() + 1* 24*60*60*1000);
                    this.filterform.start = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate()+this.TIMERULE;
                    this.filterform.end = afterdate.getFullYear()+'-'+(afterdate.getMonth()+1)+'-'+afterdate.getDate()+this.TIMERULE;
                }
            },
            async onFilterSubmit() {
                let betsData = await getTeamReportsList(
                    this.filterform.page,
                    this.filterform.size,
                    this.filterform.field,
                    this.filterform.direction,
                    this.filterform.start,
                    this.filterform.end,
                    this.filterform.type,
                    this.filterform.userName,
                    this.filterform.gtype,
                    this.filterform.issue,
                    this.filterform.billNo
                );
                if(betsData.code == 0){
                    this.filterform.total = betsData.result.total;
                    this.teamreportsData = betsData.result.rows;
                    this.reportstableloading = false;
                    this.reportsTableVisabel = true;
                }
                console.log(betsData);
            },
            handleSizeChange(val) {
                this.reportstableloading = true;
                this.filterform.page = 1;
                this.filterform.size = val;
                this.onFilterSubmit();
            },
            handleCurrentChange(val) {
                this.reportstableloading = true;
                this.filterform.page = val;
                this.onFilterSubmit();
            },
            teambetssortchange(column) {
                this.reportstableloading = true;
                this.filterform.page = 1;
                this.filterform.field = column.prop == undefined ? '' : column.prop;
                this.filterform.direction = column.order == 'descending' ? 'desc' : 'asc';
                this.onFilterSubmit();
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

<style lang="scss" scoped></style>
