<template>
    <div class="teamlist">
        <div class="fiterForm">
            <el-form ref="form" :inline="true" :model="filterform" label-width="80px">
                <el-form-item label="搜寻用户">
                    <el-input v-model="filterform.userName"></el-input>
                </el-form-item>
                <el-form-item class="">
                    <el-button type="danger" round @click="onFilterSubmit" icon="el-icon-search">查询</el-button>
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
                        prop="directChildsCount"
                        label="下级"
                        sortable>
                    <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-button type="primary" size="mini" @click="filterByuserName(scope.row.userName)" round>{{ scope.row.directChildsCount }}</el-button>
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
                        label="余额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="teamBalance"
                        label="团队余额"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="onlineStatus"
                        label="登录状态">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span class="online" v-if="scope.row.onlineStatus == '在线'"> <i class="iconfont"></i>{{ scope.row.onlineStatus }}</span>
                            <span class="offline" v-else> <i class="iconfont"></i>{{ scope.row.onlineStatus }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cbStatus"
                        label="功能"
                        width="300px">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span class="opstatus_detail"><router-link :to="{name: 'updateuser', params: {uid: scope.row.id}}">详情</router-link></span>
                            <span class="opstatus_fdset"><router-link :to="{path: ''}">返点设定</router-link></span>
                            <span class="opstatus_betsrecord"><router-link :to="{path: ''}">投注记录</router-link></span>
                            <span class="opstatus_qy" v-if="scope.row.cbStatus != 0"><router-link :to="{path: ''}">契约</router-link></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cbStatus"
                        label="契约状态">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.cbStatus == 0">未开通</span>
                            <span v-if="scope.row.cbStatus == 1">已开通</span>
                            <span v-if="scope.row.cbStatus == 2">确认中</span>
                            <span v-if="scope.row.cbStatus == 3">同意</span>
                            <span v-if="scope.row.cbStatus == 4">拒绝</span>
                            <span v-if="scope.row.cbStatus == 5">停用</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="注册时间"
                        width="155px"
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
    import {getTeamMemberList} from '../../../service/getData'

    export default {
        data(){
            return{
                filterform: {
                    userName: '',
                    page: 1,
                    size: 20,
                    total: 0,
                    pagetotals: 0,
                    field: '',
                    direction: '',
                },
                listData: null,
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
            this.onFilterSubmit();
        },
        computed:{
        },
        methods:{
            async onFilterSubmit() {
                let filterData = await getTeamMemberList(
                    this.filterform.page,
                    this.filterform.size,
                    this.filterform.field,
                    this.filterform.direction,
                    this.filterform.userName,
                );
                if(filterData.code == 0){
                    this.listData = filterData.result.rows;
                    this.filterform.total = filterData.result.total;
                    this.filterform.pagetotals = filterData.result.totalPages;
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
