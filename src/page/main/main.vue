<template>
  	<div class="">
        <head-top activeNav='game'></head-top>
        <gamehead :gameId="gameId"></gamehead>
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
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="betRecordsData" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="name" label="投注时间"> </el-table-column>
                                <el-table-column prop="name" label="彩种"></el-table-column>
                                <el-table-column prop="name" label="期号"> </el-table-column>
                                <el-table-column prop="name" label="玩法"></el-table-column>
                                <el-table-column prop="name" label="投注内容"></el-table-column>
                                <el-table-column prop="name" label="投注金额"></el-table-column>
                                <el-table-column prop="name" label="奖金"></el-table-column>
                                <el-table-column prop="name" label="开奖号"></el-table-column>
                                <el-table-column prop="name" label="状态"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="追号记录" name="second">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="betRecordsData" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="name" label="投注时间"> </el-table-column>
                                <el-table-column prop="name" label="彩种"></el-table-column>
                                <el-table-column prop="name" label="期号"> </el-table-column>
                                <el-table-column prop="name" label="玩法"></el-table-column>
                                <el-table-column prop="name" label="投注内容"></el-table-column>
                                <el-table-column prop="name" label="投注金额"></el-table-column>
                                <el-table-column prop="name" label="奖金"></el-table-column>
                                <el-table-column prop="name" label="开奖号"></el-table-column>
                                <el-table-column prop="name" label="状态"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="盈亏报表" name="third">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="betRecordsData" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="name" label="投注时间"> </el-table-column>
                                <el-table-column prop="name" label="彩种"></el-table-column>
                                <el-table-column prop="name" label="期号"> </el-table-column>
                                <el-table-column prop="name" label="玩法"></el-table-column>
                                <el-table-column prop="name" label="投注内容"></el-table-column>
                                <el-table-column prop="name" label="投注金额"></el-table-column>
                                <el-table-column prop="name" label="奖金"></el-table-column>
                                <el-table-column prop="name" label="开奖号"></el-table-column>
                                <el-table-column prop="name" label="状态"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                        <el-tab-pane label="帐变记录" name="fourth">
                            <el-table  element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)" :data="betRecordsData" :header-row-class-name="betsRecordmethodTableRowClassName">
                                <el-table-column prop="name" label="投注时间"> </el-table-column>
                                <el-table-column prop="name" label="彩种"></el-table-column>
                                <el-table-column prop="name" label="期号"> </el-table-column>
                                <el-table-column prop="name" label="玩法"></el-table-column>
                                <el-table-column prop="name" label="投注内容"></el-table-column>
                                <el-table-column prop="name" label="投注金额"></el-table-column>
                                <el-table-column prop="name" label="奖金"></el-table-column>
                                <el-table-column prop="name" label="开奖号"></el-table-column>
                                <el-table-column prop="name" label="状态"></el-table-column>
                            </el-table>
                            <div class="viewmore"><el-button size="small" type="warning" round>查看更多</el-button></div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </div>
            <div class="WapperRight">
                <div class="recentAwards">

                </div>
                <div class="betControl">

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
import {} from '../../service/getData'

export default {
    data(){
        return{
            gameId: this.$route.params.id == undefined ? 3 : this.$route.params.id,
            recordsActive: 'first',
            betRecordsData: null,
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
            this.initMenuSel()
        }
    },
    created() {
    },
    methods:{
        initMenuSel(){
            this.gameId = this.$route.params.id;
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
    },
}

</script>

<style lang="scss" scoped></style>
