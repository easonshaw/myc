<template>
  	<div class="">
        <head-top activeNav='game'></head-top>
        <gamehead :gameId="gameId" :recent="lotteryhistorynew" :issue="curissue" :platform="platform" @refreshIssue="refreshPageData"></gamehead>
        <div class="GameWapper">
            <div class="WapperLeft">
                <div class="betMain">
                    <bet :gameId="gameId"></bet>
                </div>
                <div class="betList">
                    <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="betRecordsData" :header-row-class-name="betsListmethodTableRowClassName">
                        <el-table-column prop="name" width="300" label="玩法与投注号码"> </el-table-column>
                        <el-table-column prop="name" label="模式"></el-table-column>
                        <el-table-column prop="name" label="资金模式"> </el-table-column>
                        <el-table-column prop="name" label="注数"></el-table-column>
                        <el-table-column prop="name" label="倍投"></el-table-column>
                        <el-table-column prop="name" label="金额"></el-table-column>
                        <el-table-column prop="name" label="全删"></el-table-column>
                    </el-table>
                </div>



                <div class="betRecords">
                    <el-tabs v-model="recordsActive" type="card" @tab-click="betRecordshandleClick">
                        <el-tab-pane label="投注记录" name="first">
                            <el-table height="350"  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="mydata.latelybetList" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="betTime" width="135" label="投注时间"> </el-table-column>
                                <el-table-column prop="gameName" label="彩种"></el-table-column>
                                <el-table-column prop="issue" width="100" label="期号"> </el-table-column>
                                <el-table-column prop="playName" width="120" label="玩法"></el-table-column>
                                <el-table-column prop="betNumber" width="100" label="投注内容"></el-table-column>
                                <el-table-column prop="betTotal" label="投注金额"></el-table-column>
                                <el-table-column prop="winAmount" label="奖金"></el-table-column>
                                <el-table-column prop="lotteryNumber" width="120" label="开奖号"></el-table-column>
                                <el-table-column prop="orderStatus" label="状态">
                                    <template slot-scope="scope">
                                        <div slot="reference">
                                            <span class="status_black" v-if="scope.row.orderStatus == 1">未开奖</span>
                                            <span class="status_black" v-if="scope.row.orderStatus == 1">已封盘</span>
                                            <span class="status_warning" v-if="scope.row.orderStatus == 2">已撤单</span>
                                            <span class="status_success" v-if="scope.row.orderStatus == 3">已中奖</span>
                                            <span class="status_black" v-if="scope.row.orderStatus == 4">未中奖</span>
                                            <span class="status_danger" v-if="scope.row.orderStatus == 5">系统撤单</span>
                                            <p><el-button  class="table_button_mini" type="primary" round>详情</el-button></p>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button @click.native="fastgoto('gamerecord')" size="mini" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="追号记录" name="second">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="mydata.chaseList" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="betTime" width="135" label="追号时间"> </el-table-column>
                                <el-table-column prop="gameName" label="彩种"></el-table-column>
                                <el-table-column prop="billNo" width="130" label="开始期号"> </el-table-column>
                                <el-table-column prop="name" label="游戏玩法"></el-table-column>
                                <el-table-column prop="name" label="投注号码"></el-table-column>
                                <el-table-column prop="name" label="总金额"></el-table-column>
                                <el-table-column prop="name" label="完成金额"></el-table-column>
                                <el-table-column prop="name" label="取消金额"></el-table-column>
                                <el-table-column prop="name" label="中奖后停止"></el-table-column>
                                <el-table-column prop="name" width="150" label="状态（点击查看）"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button @click.native="fastgoto('chaserecord')" size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="盈亏报表" name="third">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="mydata.profitlossList" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="betTotal" label="总投注"> </el-table-column>
                                <el-table-column prop="winTotal" label="总奖金"></el-table-column>
                                <el-table-column prop="betRebateTotal" label="总返点"> </el-table-column>
                                <el-table-column prop="activityTotal" label="总活动"></el-table-column>
                                <el-table-column prop="realGainTotal" label="总盈亏"></el-table-column>
                                <el-table-column prop="dividendTotal" label="总红利"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button @click.native="fastgoto('reportlist')" size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="帐变记录" name="fourth">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="mydata.amountchangeList" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="transactionTime" label="时间"> </el-table-column>
                                <el-table-column prop="billNo" width="200" label="注单编号"></el-table-column>
                                <el-table-column prop="transactionType" label="类型">
                                    <template slot-scope="scope">
                                        <div slot="reference">
                                            <span class="status_black" v-if="scope.row.transactionType == 0">充值</span>
                                            <span class="status_black" v-if="scope.row.transactionType == 1">提款</span>
                                            <span class="status_warning" v-if="scope.row.transactionType == 2">消费</span>
                                            <span class="status_success" v-if="scope.row.transactionType == 3">派奖</span>
                                            <span class="status_black" v-if="scope.row.transactionType == 4">返点</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 5">活动</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 6">红利其他</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 7">撤单</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 8">转入</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 9">转出</span>
                                            <span class="status_danger" v-if="scope.row.transactionType == 10">其他</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="transactionAmount" label="变动金额"></el-table-column>
                                <el-table-column prop="currentBalance" label="余额"></el-table-column>
                                <el-table-column prop="transactionSubclass" label="备注"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button @click.native="fastgoto('transaction')" size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </div>
            <div class="WapperRight">
                <div class="recentAwards">
                    <div class="title"><i></i>近期开奖<i></i></div>
                    <ul >
                        <li v-for="i in lotteryhistoryData">
                            <div class="recentItem">
                                <div class="serialNumber">{{i.issue}}期</div>
                                <div class="serialText">
                                    <span v-for="j in i.lotteryNumber.split('')">{{j}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="moreRecents">
                        <a  v-bind:class="{ active: recentCount == 15}" @click="recentViewToggle"  href="javascript:;">更多</a>
                    </div>
                </div>
                <div class="betControl">
                    <div class="betControlContent">
                        <el-row :gutter="10" class="selList">
                            <el-col :span="6"><a @click="bet.priceUnit = 2" v-bind:class="{ active: bet.priceUnit == 2}" href="javascript:;">2元</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.2" v-bind:class="{ active: bet.priceUnit == 0.2}" href="javascript:;">2分</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.02" v-bind:class="{ active: bet.priceUnit == 0.02}" href="javascript:;">2角</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.002" v-bind:class="{ active: bet.priceUnit == 0.002}" href="javascript:;">2厘</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 1" v-bind:class="{ active: bet.priceUnit == 1}" href="javascript:;">1元</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.1" v-bind:class="{ active: bet.priceUnit == 0.1}" href="javascript:;">1分</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.01" v-bind:class="{ active: bet.priceUnit == 0.01}" href="javascript:;">1角</a></el-col>
                            <el-col :span="6"><a @click="bet.priceUnit = 0.001" v-bind:class="{ active: bet.priceUnit == 0.001}" href="javascript:;">1厘</a></el-col>
                        </el-row>
                        <div class="multiple">
                            <div class="label">倍数：</div>
                            <div class="changetimes"><el-input-number size="mini"  v-model="bet.times" @change="betTimeshandleChange" :min="1" :max="10" label="倍数"></el-input-number></div>
                        </div>
                        <div class="betsubmit">
                            <el-button size="medium"  type="danger" round>立即投注</el-button>
                        </div>
                        <div class="betinfo">
                            <p>已选<em>{{bet.times}}</em>注 共<em class="status_danger">{{bet.total}}</em>元</p>
                            <p>若中奖，实际盈利<em class="status_danger">{{bet.times}}</em>元</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import {localapi, proapi, imgBaseUrl} from 'src/config/env'
import {mapState, mapActions, mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import bet from '../../page/main/bet'
import gamehead from '../../components/header/gamehead'
import {getLotteryHistory, getCurIssue, getLotteryMissCold, getlatelybetList, chaseRecord, getReport, transaction} from '../../service/getData'

export default {
    data(){
        return{
            gameId: null,
            platform: null,
            recordsActive: 'first',
            betRecordsData: null,
            lotteryhistorynew: null,
            lotteryhistoryData: null,
            lotteryhistoryfull: null,
            lotteryhistorycurr: null,
            recentCount: 10,
            curissue: null,
            bet:{
                priceUnit: 2,
                times: 1,
                total: 0,
            },
            mydata:{
                latelybetList: [], //近期投注记录
                chaseList: [], //追号记录
                profitlossList: [], //盈亏报表
                amountchangeList: [], //账户变动
            }

        }
    },
	mounted(){

    },
    components:{
        headTop,
        gamehead,
        bet
    },
    computed:{
       
    },
    watch: {
        '$route': function(to, from) {
            this.initMenuSel();
            this.loadlotteryhistory();
            this.loadissue();
            this.loadlotterymissclod();
        }
    },
    created() {
	    this.initMenuSel();
        this.loadlotteryhistory();
        this.loadissue();
        this.loadmydata();
        this.loadlotterymissclod();
    },
    methods:{
        initMenuSel(){
            this.gameId = this.$route.params.id == undefined ? 3 : this.$route.params.id;
            this.platform = this.$route.params.platform == undefined ? 1 : this.$route.params.platform;
        },
        betRecordshandleClick(tab, event){
        },
        betsListmethodTableRowClassName({row, rowIndex}) {
            if (rowIndex === 0) {
                return 'betsList-header-row';
            }
            return 'betsList-body-row';
        },
        betsRecordmethodTableRowClassName({row, rowIndex}) {
            if (rowIndex === 0) {
                return 'betRecords-header-row';
            }
            return 'betRecords-body-row';
        },
        recentViewToggle() {
            this.recentCount = this.recentCount == 10 ? 15 : 10;
            this.lotteryhistoryData = this.recentCount == 10 ? this.lotteryhistorycurr : this.lotteryhistoryfull;
        },
        betTimeshandleChange (val) {

        },
        fastgoto(val) {
            console.log(val)
            this.$router.push({name: val})
        },
        async loadmydata() {
            let latelybetData = await getlatelybetList(8);
            if(latelybetData.code == 0){
                this.mydata.latelybetList = latelybetData.result;
            }
            console.log('#近期投注记录#', latelybetData);

            let chaseData = await chaseRecord('', '', '', 1, 8, '', '');
            if(chaseData.code == 0){
                this.mydata.chaseList = chaseData.result.rows;
            }
            console.log('#追号记录#', chaseData);

            let profitlossData = await getReport('', '', 1, 8, '', '', '', '');
            if(profitlossData.code == 0){
                this.mydata.profitlossList.push(profitlossData.result);
            }
            console.log('#盈亏记录#', profitlossData);

            let amountchangeData = await transaction('', '', '', 1, 8, '', '', '', '');
            if(amountchangeData.code == 0){
                this.mydata.amountchangeList = amountchangeData.result.rows;;
            }
            console.log('#帐变记录#', amountchangeData);
        },
        async loadlotteryhistory() {
            let historyData = await getLotteryHistory(this.gameId);
            if(historyData.code == 0){
                this.lotteryhistoryfull = historyData.result;
                this.lotteryhistorycurr = this.lotteryhistoryfull.slice(0, 10);
                this.lotteryhistoryData = this.lotteryhistorycurr;
                let ar = this.lotteryhistoryfull.slice(0, 1);
                this.lotteryhistorynew = ar[0];
            }
        },
        async loadissue() {
            let issueData = await getCurIssue(this.gameId);
            if(issueData.code == 0){
                this.curissue = issueData.result;
            }
        },
        async loadlotterymissclod() {
            let misscoldData = await  getLotteryMissCold(this.gameId);
            if(misscoldData.code == 0) {
                let hotcold = JSON.parse(misscoldData.result[0].hotCold);
                let miss = JSON.parse(misscoldData.result[0].missTimes);
                //console.log('#冷热遗漏#', hotcold, miss);
            }

        },
        refreshPageData() {
            console.log('$emit')
            let that = this;
            setTimeout(function() {
                that.loadlotteryhistory();
            }, 5000)
            this.loadissue();
        },


    },
}

</script>

<style lang="scss" scoped></style>
