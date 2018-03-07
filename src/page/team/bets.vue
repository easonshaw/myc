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
                    <el-col :span="6">
                        <el-form-item label="游戏类型">
                            <el-select v-model="filterform.type" placeholder="请选择" change="changeGametype">
                                <el-option v-for="item in filterform.types"  :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="游戏名称">
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
                            <el-input v-model="filterform.ordernum" placeholder="请输入内容"></el-input>
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
    </div>
</template>

<script>
    import {getGames, getTeamBetList} from '../../service/getData'
    export default {
        data(){
            return{
                TIMERULE: ' 03:00',
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
                    allowIssue: true,
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
            onFilterSubmit() {}
        },
    }

</script>

<style lang="scss" scoped></style>
