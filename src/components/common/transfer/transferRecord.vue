 <template>
    <div class="transfer">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-form-item label="时间">
                   <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" v-model="filterform.start" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" v-model="filterform.end" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="平台">
                    <el-select v-model="type"  placeholder="请选择">
                        <el-option v-for="item in typeList"  :key="item.type" :label="item.name" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="floatright">
                    <el-button class="transfer-buttons" @click="onFilterSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
         <div class="transferlist paddinglf" v-show="listDataShow">
            <el-table :data="listData" border style="width: 100%"   @sort-change="tableChange" :header-row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}" >
                <el-table-column
                        prop="userName"
                        label="账号"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="operateTime"
                        label="时间"
                        sortable>
                </el-table-column>
                 <el-table-column
                        prop="direction"
                        label="类别"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="变动金额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="currentBalance"
                        label="转变后金额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注"
                        sortable>
                </el-table-column>
            </el-table>
        </div>
        <div class="teamPagination" v-show="listDataShow">
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
     import {getExchangeList} from '../../../service/getData'

    export default {
        data(){
            return{
                filterform: {
                    start: null,
                    end: null,
                    page: 1,
                    field:"",
                    direction:"",
                    size: 10,
                    total: 0,
                    pagetotals: 0,
                },
                type:1,
                typeList:[{
                    type:1,
                    name:"彩票",
                },{
                    type:2,
                    name:"AG",
                }],
                istoday: 2,
                listData: null,
                listDataShow:false,
            }
        },
        created() {
            this.initdate();
        },
        methods:{
            initdate() {
                var nowdate = new Date(new Date().setHours(3,0,0,0));
                var oneweekdate = new Date(nowdate-7*24*3600*1000);
                this.filterform.start = oneweekdate;
                this.filterform.end = nowdate;
            },
            dateToStr(time){
                var time = new Date(time);
                var y = time.getFullYear();//年
                var m = time.getMonth() + 1;//月
                var d = time.getDate();//日
                var h = time.getHours();//时
                var mm = time.getMinutes();//分
                return y+"-"+m+"-"+d+" "+h+":"+mm;
            },
            async onFilterSubmit() {
                if(this.filterform.start != '' && this.filterform.end != ''){
                    //接口请求数据
                    let filterData = await getExchangeList(
                        this.filterform.page,
                        this.filterform.size,
                        this.filterform.field,
                        this.filterform.direction,
                        this.type,
                        this.dateToStr(this.filterform.start),
                        this.dateToStr(this.filterform.end),
                    );
                    console.log(filterData);
                    //查询错误给出提示
                    if (filterData.code!=0) {
                        this.listDataShow = false;
                        this.$alert(filterData.msg, '提示信息', {
                            confirmButtonText: '确定',
                        });
                    }
                    //查询到数据
                    if(filterData.code == 0){
                        this.listDataShow = true;
                        this.listData = filterData.result.rows;
                        this.filterform.total = filterData.result.total;
                        this.filterform.pagetotals = filterData.result.totalPages;
                    }
                }
            },
             handleSizeChange(val) {
                this.filterform.page = 1;
                this.filterform.size = val;
                this.onFilterSubmit();
            },
            handleCurrentChange(val) {
                this.filterform.page = val;
                this.onFilterSubmit();
            },
            tableChange(column){
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
            }
        },
    }
</script>

<style lang="scss" scoped>
.transfer-buttons{
    background: #0BA7A3;
    color: #fff;
}
</style>
