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
                <el-form-item label="游戏类型">
                    <el-select v-model="filterform.type" placeholder="请选择">
                        <el-option v-for="item in filterform.types"  :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏名称">
                    <el-select v-model="filterform.name" placeholder="请选择">
                        <el-option v-for="item in filterform.names"  :key="item.id" :label="item.groupName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="filterform.ordernum" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="期数">
                    <el-input v-model="filterform.issue" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
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
                        prop="userName"
                        label="用户名"
                        sortable>
                </el-table-column>
                 <el-table-column
                        prop="createdDate"
                        label="投注时间"
                        width="155px"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="bonusSSC"
                        label="游戏名称"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="accountBalance"
                        label="投注金额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="teamBalance"
                        label="奖金"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="cbStatus"
                        label="累积奖池中奖金额"
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
    import {gamesList,gamesType,betList} from '../../service/getData'

    export default {
        data(){
            return{
                filterform: {
                    start: null,
                    end: null,
                    type:'彩票',
                    types:[{
                        value: '1',
                        label: '彩票'
                        }, {
                        value: '2',
                        label: 'AG'
                    }, {
                        value: '3',
                        label: 'VR真人视讯'
                    }],//游戏类型
                    names:[],//游戏名称
                    name:'所有游戏',
                    issue:'', //期号
                    ordernum:'', //订单号
                    page: 1,
                    size: 20,
                    total: 0,
                    pagetotals: 0,
                },
                istoday: 2,
                listData: null,
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
            this.initdate();
            this.init();
        },
        computed:{

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
            async init() {
                let names = await gamesList();
                this.filterform.names = names.result;
                // console.log(names.result);
                // let types = await gamesType();
                 let res = await betList(
                    this.filterform.page,
                    this.filterform.size,
                    this.filterform.type,
                 );
                 console.log(res);
                
                // console.log(types.result);
            },
            dateSel(type) {
                this.istoday = type;
                var nowdate = new Date();
                if(type == 1){
                    var beforedate = new Date(nowdate-1*24*3600*1000);
                    this.filterform.start = beforedate.getFullYear()+'-'+(beforedate.getMonth()+1)+'-'+beforedate.getDate();
                    this.filterform.end = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate();
                } else {
                    var afterdate = new Date(nowdate+24*60*60*1000);
                    this.filterform.start = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate();
                    this.filterform.end = afterdate.getFullYear()+'-'+(afterdate.getMonth()+1)+'-'+afterdate.getDate();
                }
            },
            async onFilterSubmit() {
                if(this.filterform.start != '' && this.filterform.end != ''){
                    // let filterData = await getTeamAnalysis(
                    //     this.filterform.start+" 00:00",
                    //     this.filterform.end+" 00:00"
                    // );
                    console.log(this.filterform)
                    // if(filterData.code == 0){
                    //     this.analysisData = filterData.result;
                    //     this.loadfiterdata = true;
                    // }
                }
            },
            filterByuserName(name){
                this.filterform.userName = name;
                this.onFilterSubmit();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'header-row';
                }
                return 'body-row';
            },
            formatterByfunc(row, column) {
                console.log(row,column)
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
