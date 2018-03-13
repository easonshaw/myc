<template>
    <div class="teamPage">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="时间">
                            <el-row>
                                <el-col :span="11">
                                    <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm"  v-model="filterform.start" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="11">
                                    <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm"  v-model="filterform.end" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="">
                            <el-select v-model="filterform.type" placeholder="请选择" change="changeGametype">
                                <el-option v-for="item in filterform.types"  :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="">
                            <el-select v-model="filterform.gtype" placeholder="所有游戏">
                                <el-option v-for="item in filterform.gtypes"  :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户名">
                            <el-input :disabled="!isgroup" v-model="filterform.userName" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单号">
                            <el-input v-model="filterform.billNo" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="期数">
                            <el-input :disabled="filterform.allowIssue" v-model="filterform.issue" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label=" " class="">
                            <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                            <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label=" " class="uytpes">
                            <el-button :class="[isgroup == 0 ? 'el-button--danger' : '']" @click="utypeSel(0)">个人</el-button>
                            <el-button :class="[isgroup == 1 ? 'el-button--danger' : '']" @click="utypeSel(1)">团队</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="searchTeamBets">
                            <el-button class="" type="danger" @click="onFilterSubmit">查询</el-button>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <div class="teamlist" v-if="betsTableVisabel">
            <el-table :data="teambetslistData" v-loading="betstableloading" @sort-change="teambetssortchange" border style="width: 100%" :header-row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}" >
                <el-table-column
                        prop="userName"
                        label="用户名"
                        >
                </el-table-column>
                <el-table-column
                        prop="betTime"
                        label="投注时间"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="billNo"
                        label="订单号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="gameName"
                        label="彩种"
                        >
                </el-table-column>
                <el-table-column
                        prop="issue"
                        label="期号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="playName"
                        label="玩法"
                        >
                </el-table-column>
                <el-table-column
                        prop="betNumber"
                        label="投注内容"
                        >
                </el-table-column>
                <el-table-column
                        prop="betTotal"
                        label="投注金额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="orderStatus"
                        label="状态">
                    <template slot-scope="scope">
                        <div slot="reference" class="">
                            <span class="" v-if="scope.row.orderStatus == 0">未开奖</span>
                            <span class="status_warning" v-if="scope.row.orderStatus == 1">已封盘</span>
                            <span class="status_warning" v-if="scope.row.orderStatus == 2">已撤单</span>
                            <span class="status_success" v-if="scope.row.orderStatus == 3">已中奖</span>
                            <span class="" v-if="scope.row.orderStatus == 4">未中奖</span>
                            <span class="status_warning" v-if="scope.row.orderStatus == 5">系统撤单</span>
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
    import {getGames, getTeamBetList} from '../../service/getData'
    export default {
        data(){
            return{
                TIMERULE: ' 03:00',
                teambetslistData: [],
                betstableloading: true,
                betsTableVisabel: false,
                filterform: {
                    start: null,
                    end: null,
                    userName: '',
                    type: '1',
                    issue: '',
                    types:[{
                        value: '1',
                        label: '彩票'
                    }, {
                        value: '2',
                        label: 'AG'
                    }, {
                        value: '3',
                        label: 'VR真人视讯'
                    }],//平台类型
                    gtype: '',
                    gtypes: [{id: '', name: '全部游戏'}],
                    billNo: '',
                    allowIssue: true,
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
            'filterform.gtype': function(to, from) {
                this.changeGametype(to)
            }
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
                this.getGameList();
            },
            utypeSel(type) {
                this.isgroup = type;
                if(type) {

                } else {
                    this.filterform.userName = '';
                }
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
            changeGametype(val){
                this.filterform.allowIssue = val == '' ? true : false;
                if(val == '') { this.filterform.issue = ''; }
            },
            async getGameList() {
                let dataList = await getGames();
                if (dataList.code==0) {
                    dataList.result.forEach(element => {
                        element.gamePermission.forEach(data => {
                            this.filterform.gtypes.push(data);
                        });
                    });
                }
            },
            async onFilterSubmit() {
                let betsData = await getTeamBetList(
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
                    this.teambetslistData = betsData.result.rows;
                    this.betstableloading = false;
                    this.betsTableVisabel = true;
                }
                console.log(betsData);
            },
            handleSizeChange(val) {
                this.betstableloading = true;
                this.filterform.page = 1;
                this.filterform.size = val;
                this.onFilterSubmit();
            },
            handleCurrentChange(val) {
                this.betstableloading = true;
                this.filterform.page = val;
                this.onFilterSubmit();
            },
            teambetssortchange(column) {
                this.betstableloading = true;
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
