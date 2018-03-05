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
                <el-form-item>
                    <el-button :class="[istoday == 0 ? 'el-button--danger' : '']" @click="dateSel(0)">今天</el-button>
                    <el-button :class="[istoday == 1 ? 'el-button--danger' : '']" @click="dateSel(1)">昨天</el-button>
                </el-form-item>
                <el-form-item class="floatright">
                    <el-button type="warning" @click="onFilterSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="teamAnalysis" v-if="loadfiterdata">
            <div class="analysistitle">团队统计</div>
            <el-row class="summaryGrid">
                <el-col :span="4"><div class="grid-content"><span>团队余额</span><b>{{analysisData.teamBalance}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>团队总人数</span><b>{{analysisData.totalUsers}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>今日新增人数</span><b>{{analysisData.todayNewUsers}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>今日投注人数</span><b>{{analysisData.todayBetUsers}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>代理人数</span><b>{{analysisData.agentUsers}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>会员人数</span><b>{{analysisData.hyUsers}}</b></div></el-col>
            </el-row>
            <div class="analysistitle">用户统计</div>
            <el-row class="summaryGrid">
                <el-col :span="4"><div class="grid-content"><span>当前在线人数</span><b>{{analysisData.todayOnlineUsers}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>一日内登入</span><b>{{analysisData.day1Login}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>七日未登入</span><b>{{analysisData.day7NotLogin}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>三十日未登入</span><b>{{analysisData.day30NotLogin}}</b></div></el-col>
                <el-col :span="4"><div class="grid-content"><span>六十日未登入</span><b>{{analysisData.day60NotLogin}}</b></div></el-col>
                <el-col :span="4"></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getTeamAnalysis} from '../../service/getData'

    export default {
        data(){
            return{
                loadfiterdata: false,
                filterform: {
                    start: null,
                    end: null,
                },
                analysisData: {
                    teamBalance: '-',
                    totalUsers: '-',
                    todayNewUsers: '-',
                    todayBetUsers: '-',
                    agentUsers: '-',
                    hyUsers: '-',
                    todayOnlineUsers: '-',
                    day1Login: '-',
                    day7NotLogin: '-',
                    day30NotLogin: '-',
                    day60NotLogin: '-',
                },
                istoday: 2,
            }
        },
        mounted(){
        },
        components:{
        },
        created() {
            this.initdate();
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
                    let filterData = await getTeamAnalysis(
                        this.filterform.start+" 00:00",
                        this.filterform.end+" 00:00"
                    );
                    console.log(filterData)
                    if(filterData.code == 0){
                        this.analysisData = filterData.result;
                        this.loadfiterdata = true;
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
