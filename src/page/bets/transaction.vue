 <template>
    <div class="teamsummary">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-form-item label="时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="filterform.start" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="filterform.end" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="filterform.type" placeholder="全部">
                        <el-option v-for="item in filterform.types"  :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注单编号">
                    <el-input v-model="filterform.billNo" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item style="margin-left:50px;">
                    <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                    <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                </el-form-item>
                <el-form-item class="floatright">
                    <el-button type="danger" @click="onFilterSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
         <div class="teamList">
            <el-table :data="listData" border style="width: 100%" :header-row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}" >
                 <el-table-column
                        prop="betTime"
                        label="时间"
                        width="155px"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="gameName"
                        label="注单编号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="betTotal"
                        label="类型"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="winAmount"
                        label="变动金额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="issue"
                        label="余额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="issue"
                        label="备注"
                        sortable>
                </el-table-column>
            </el-table>
        </div>
        <div class="teamPagination">
            <div class="block">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="filterform.page"
                        :page-size="filterform.size"
                        :page-count="filterform.pagetotals"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="filterform.total">
                </el-pagination>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {transaction} from '../../service/getData'

    export default {
        data(){
            return{
                filterform: {
                    start: null,
                    end: null,
                    type:'',
                    types:[{ value: '', label: '全部'}, {
                        value: '0',
                        label: '充值'
                    },{
                        value: '1',
                        label: '提款'
                    },{
                        value: '2',
                        label: '消费'
                    },{
                        value: '3',
                        label: '派奖'
                    },{
                        value: '4',
                        label: '返点'
                    },{
                        value: '5',
                        label: '活动'
                    },{
                        value: '6',
                        label: '红利其他'
                    },{
                        value: '7',
                        label: '撤单'
                    },{
                        value: '8',
                        label: '转入'
                    },{
                        value: '9',
                        label: '转出'
                    },{
                        value:'10',
                        label:'其他'
                    }],
                    billNo:'', //注单编号
                    page: 1,
                    size: 20,
                    total: 0,
                    pagetotals: 0,
                },
                istoday: 2,
                listData: null,
            }
        },
        created() {
            this.initdate();
        },
        methods:{
            initdate() {
                var nowdate = new Date();
                var oneweekdate = new Date(nowdate-7*24*3600*1000);
                var y = oneweekdate.getFullYear();
                var m = oneweekdate.getMonth()+1;
                var d = oneweekdate.getDate();
                var yn = nowdate.getFullYear();
                var mn = nowdate.getMonth()+1;
                var dn = nowdate.getDate();
                this.filterform.start = y+'-'+m+'-'+d;
                this.filterform.end = yn+'-'+mn+'-'+dn;
            },
            dateSel(type) {
                this.istoday = type;
                var nowdate = new Date();
                if(type == 1){
                    var beforedate = new Date(nowdate-1*24*3600*1000);
                    this.filterform.start = beforedate.getFullYear()+'-'+(beforedate.getMonth()+1)+'-'+beforedate.getDate();
                    this.filterform.end = beforedate.getFullYear()+'-'+(beforedate.getMonth()+1)+'-'+beforedate.getDate();
                } else {
                    var afterdate = new Date(nowdate+24*60*60*1000);
                    this.filterform.start = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate();
                    this.filterform.end = afterdate.getFullYear()+'-'+(afterdate.getMonth()+1)+'-'+afterdate.getDate();
                }
            },
            async onFilterSubmit() {
                if(this.filterform.start != '' && this.filterform.end != ''){
                    //接口请求数据
                    let filterData = await transaction(
                        this.filterform.start+' 00:00',
                        this.filterform.end+' 23:59',
                        this.filterform.billNo,
                        this.filterform.page,
                        this.filterform.size,
                        this.filterform.type,
                    );
                    //查询错误给出提示
                    if (filterData.code!=0) {
                        this.$alert(filterData.msg, '提示信息', {
                            confirmButtonText: '确定',
                        });
                    }
                    //查询到数据
                    if(filterData.code == 0){
                        this.listData = filterData.result.rows;
                        this.filterform.total = filterData.result.total;
                        this.filterform.pagetotals = filterData.result.totalPages;
                    }
                }
            },
            handleSizeChange(val) {
                this.filterform.size = val;
            },
            handleCurrentChange(val) {
                this.filterform.page = val;
                this.onFilterSubmit();
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
