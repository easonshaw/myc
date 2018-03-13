<template>
    <div class="header">
        <div class="top">
            <div class="container container-top">
                <div class="notice">
                    <span class="notice-icon"><i class="iconfont icon-wenxintishi"></i></span>
                    <marquee class="lat_scroll" direction="left" scrollamount="5" onmouseover="this.stop()" style="width: 400px;" onmouseout="this.start()">
                        {{noticeScrollHtml}}
                    </marquee>
                </div>
                <div class="top-right">
                    <span class="r-kefu"><i class="iconfont icon-zaixiankefu"></i>  <a href="javascript:;">在线客服</a></span>
                    <span class="r-msg"><i class="iconfont icon-xiaoxi"></i>  <a href="javascript:;">消息</a></span>
                    <span class="r-notice"><i class="iconfont icon-gonggao"></i>  <a @click="call_notice" href="javascript:;">公告</a></span>
                    <span class="r-help"><i class="iconfont icon-bangzhuzhongxin"></i>  <a @click="toHepleCenter" href="javascript:;">帮助中心</a></span>
                    <span class="r-feedback"><i class="iconfont icon-yonghufankui"></i>  <a href="javascript:;">用户反馈</a></span>
                    <span class="r-user" v-if="user"><i class="iconfont icon-user"></i>  <a href="javascript:;">{{usernickNameText}}</a></span>
                    <span class="r-money" ><a href="javascript:;">￥余额: <em>{{accountBalance}}</em></a></span>
                    <span class="r-logout"><i class="iconfont icon-dengchu"></i>  <a href="javascript:;" @click="logout">退出</a></span>
                </div>
            </div>
        </div>
        <div class="container container-menu">
            <router-link :to="{ name: 'main' }" class="logo"><img src="../../images/logo.png" /> </router-link>
            <ul class="menu-list">
                <li id="GameMenu" v-on:mouseenter="disGameMenu" v-on:mouseleave="hideGameMenu" :class="activeNav == '' || activeNav == 'game' ? 'active' : ''"><router-link :to="{ name: 'main' }"><i class="iconfont icon-youxidating"></i> <p>游戏大厅</p></router-link>
                </li>
                <li :class="activeNav == 'externalgame' ? 'active' : ''"><router-link :to="{name: ''}"  @click.native="JumpToThird(59, 2)"><i class="iconfont icon-zhenrentingshi"></i> <p>真人厅室</p></router-link></li>
                <li :class="activeNav == 'account' ? 'active' : ''"><router-link :to="{name: 'updateNickname'}"><i class="iconfont icon-wodezhanghu"></i> <p>我的账户</p></router-link></li>
                <li :class="activeNav == 'team' ? 'active' : ''"><router-link :to="{ name: 'teamsummary' }"><i class="iconfont icon-dailiguanli"></i> <p>代理管理</p></router-link></li>
                <li :class="activeNav == 'cashflow' ? 'active' : ''"><router-link :to="{ name: 'cashflow' }"><i class="iconfont icon-cuntijilu"></i> <p>存提记录</p></router-link></li>
                <li :class="activeNav == 'bets' ? 'active' : ''"><router-link :to="{ name: 'gamerecord' }"><i class="iconfont icon-dingdanbaobiao"></i> <p>订单报表</p></router-link></li>
                <li :class="activeNav == 'finance' ? 'active' : ''"><router-link :to="{ name: 'recharge' }"><i class="iconfont icon-caiwuguanli"></i> <p>财务管理</p></router-link></li>
                <li :class="activeNav == 'activity' ? 'active' : ''">
                    <a data-v-9d92c9cc="" href="javascript:;" @click="showActivity" class="router-link-active"><i data-v-9d92c9cc="" class="iconfont icon-youhuihuodong"></i> <p data-v-9d92c9cc="">优惠活动</p></a>
                    <!-- <router-link :to="{ name: 'activity' }"><i class="iconfont icon-youhuihuodong"></i> <p>优惠活动</p></router-link> -->
                </li>
            </ul>
            <div class="menu-right">
                <a href="javascript:;" class="button button-recharge" @click="rechargedialogVisible = true">充&nbsp;&nbsp;&nbsp;&nbsp;值</a>
                <a href="javascript:;" class="button button-postal" @click="withdrawdialogVisible = true">提&nbsp;&nbsp;&nbsp;&nbsp;现</a>
                <a href="javascript:;" class="button button-transfer" @click="transferdialogVisible = true">快速转账</a>
            </div>
        </div>
        <!-- 优惠活动 -->
         <dialogActivity :activitydialogVisible="activitydialogVisible" @on-activity-result-change="onactivityResultChange"></dialogActivity>

        <dialogRecharge :rechargedialogVisible="rechargedialogVisible" @on-recharge-result-change="onrechargeResultChange"></dialogRecharge>
        <dialogWithdraw 
        :accountBalance="accountBalance" 
        :withdrawdialogVisible="withdrawdialogVisible"
        :usernickNameText="usernickNameText"
        @on-withdraw-result-change="onrewithdrawResultChange">
        </dialogWithdraw>
        <dialogTransfer :transferdialogVisible="transferdialogVisible" @on-transfer-result-change="ontransferResultChange"></dialogTransfer>



        <dialogDownApp :downAppdialogVisible="downAppdialogVisible" @on-downapp-result-change="ondownAppResultChange"></dialogDownApp>
        <dialogTestSpeed :testspeeddialogVisible="testSpeeddialogVisible" @on-testspeed-result-change="ontestspeedResultChange"></dialogTestSpeed>

        <el-dialog title="系统公告" :visible.sync="noticeDialogVisible" width="40%" :before-close="noticehandleClose">
            <el-dialog custom-class="noticeAritcleDialog" width="30%" :title="noticeArticleTitle" :visible.sync="noticeinnerVisible" append-to-body>
                {{noticeArticleHtml}}
            </el-dialog>
            <ul class="notice_list">
                <li v-for="(item,index) in notice"><a href="javascript:;" @click="noticeArticleShow(index)"><span>{{item.beginTime}}</span>{{item.title}} </a></li>
            </ul>
            <el-pagination
                    background
                    small
                    @size-change="notice_handleSizeChange"
                    @current-change="notice_handleCurrentChange"
                    :current-page="notice_currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="notice_total">
            </el-pagination>
        </el-dialog>
        <div class="floatButtons">
            <a href="javascript:;" @click="downAppdialogVisible = true"><i class="iconfont icon-xiazai"></i>下<br/>载<br/>中<br/>心</a>
            <a href="javascript:;" @click="testSpeeddialogVisible = true"><i class="iconfont icon-cesu"></i>重<br/>新<br/>测<br/>速</a>
        </div>

        <div id="gameTypeDiv" v-if="user" v-on:mouseenter="disGameMenu" v-on:mouseleave="hideGameMenu" ref="gameTypeDiv" v-show="menuActive" v-bind:style="{left: menuPos.left + 'px', top: menuPos.top + 'px' }" class="gameTypeDiv">
            <div class="arrowTop"><i class="el-icon-caret-top"></i></div>
            <div class="gamegroup" v-for="item in menuData">
                <dl class="">
                    <dt><img :src="item.gamethumb" />{{item.groupName}}</dt>
                    <dd v-for="gitem in item.gamePermission">
                        <router-link v-if="gitem.platform == 1" :to="{name: 'main', params:{id: gitem.id, platform: gitem.platform}}">{{gitem.name}}</router-link>
                        <a v-else href="javascript:;" @click="JumpToThird(gitem.id, gitem.platform)">{{gitem.name}}</a>
                    </dd>
                    <span class="clear"></span>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser, getBalance, getNotice, getGames, getVrLoginUrl, getAgLoginUrl} from '../../service/getData'
    import dialogDownApp from 'src/components/common/dialogDownApp.vue'
    import dialogTestSpeed from 'src/components/common/dialogTestSpeed.vue'
    import dialogRecharge from 'src/components/common/dialogRecharge.vue'
    import dialogWithdraw from 'src/components/common/dialogWithdraw.vue'
    import dialogTransfer from 'src/components/common/dialogTransfer.vue'
    import dialogActivity from 'src/components/common/dialogActivity.vue'    


     export default {
        data(){
            return{
                user: null,
                accountBalance: null,
                usernickNameText: '',
                downAppdialogVisible: false, // 下载中心
                testSpeeddialogVisible: false, //速度测试
                rechargedialogVisible:false, //充值
                withdrawdialogVisible:false, //提款
                transferdialogVisible:false,//快速转账
                activitydialogVisible:false,//优惠活动                
                noticeDialogVisible: false,
                noticeinnerVisible: false,
                noticeArticleTitle: '',
                noticeArticleHtml: '',
                noticeScrollHtml: '',
                notice: null,
                notice_size: 10,
                notice_currentPage: 1,
                notice_total: 0,
                menuPos: {left: 0, top: 0},
                menuActive: false,
                menuData: {},
            }
        },
        mounted(){
            //获取用户信息
            this.checkLogin();
        },
        created() {
        },
        watch: {

        },
        props: ['activeNav'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        components:{
            dialogDownApp,
            dialogTestSpeed,
            dialogRecharge,
            dialogWithdraw,
            dialogTransfer,
            dialogActivity
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            async checkLogin() {
                let userData = await getUser();
                if(userData.code == 0) {
                    this.RECORD_USERINFO(userData.result.userInfo);
                    this.user = userData.result.userInfo;
                    if(this.user.nickName == '') {
                        this.usernickNameText = this.user.userName;
                        //this.user.nickName = this.user.userName;
                    } else {
                        this.usernickNameText = this.user.nickName;
                    }

                    let balance = await getBalance();
                    if(balance.code == 0 && this.accountBalance == null){
                        this.accountBalance = balance.result.accountBalance;
                    }
                } else {
                    this.$router.push('/login')
                }
                //获取跑马灯公告
                let noticeData = await getNotice(1, this.notice_currentPage, this.notice_size);
                if(noticeData.code == 0 && noticeData.result.rows.length > 0){
                    this.noticeScrollHtml = noticeData.result.rows[0].content;
                }
                //加载菜单游戏数据
                let gamesData = await getGames();
                if(gamesData.code == 0){
                    this.menuData = gamesData.result.map(item => {
                        return {
                            gamethumb: require('../../images/g-'+item.id+'.png'),
                            groupName: item.groupName,
                            gamePermission: item.gamePermission
                        }
                    });
                }
            },
            async logout() {
                let logoutData = await signout();
                if(logoutData.code == 0){
                    this.$router.push('/login')
                }
            },
            async call_notice() {
                if(this.notice == null) {
                    let noticeData = await getNotice(2, this.notice_currentPage, this.notice_size);
                    if(noticeData.code == 0 ) {
                        this.notice_total = noticeData.result.total;
                        this.notice = noticeData.result.rows;
                    } else {

                    }
                }
                this.noticeDialogVisible = true;
            },
            noticeArticleShow(index) {
                this.noticeArticleHtml = this.notice[index].content;
                this.noticeArticleTitle = this.notice[index].title;
                this.noticeinnerVisible = true;
                console.log(index)
            },
            showActivity(){
                this.activeNav = "activity";
                this.activitydialogVisible =true;
            },
            noticehandleClose() {
                this.noticeDialogVisible = false;
            },
            async notice_handleSizeChange(val) {
                this.notice_size = val;
                let noticeData = await getNotice(2, this.notice_currentPage, this.notice_size);
                if(noticeData.code == 0 ) {
                    this.notice_total = noticeData.result.total;
                    this.notice = noticeData.result.rows;
                } else {

                }
            },
            async notice_handleCurrentChange(val) {
                this.notice_currentPage = val;
                let noticeData = await getNotice(2, this.notice_currentPage, this.notice_size);
                if(noticeData.code == 0 ) {
                    this.notice_total = noticeData.result.total;
                    this.notice = noticeData.result.rows;
                }
            },
            ondownAppResultChange(val) {
                this.downAppdialogVisible = val;
            },
            ontestspeedResultChange(val) {
                this.testSpeeddialogVisible = val;
            },
            onrechargeResultChange(val) {
                this.rechargedialogVisible = val;
            },
            onrewithdrawResultChange(val){
                this.withdrawdialogVisible = val;
            },
            ontransferResultChange(val){
                this.transferdialogVisible = val;
            },
            onactivityResultChange(val){
                this.activitydialogVisible = val;                
            },
            disGameMenu(e){
                this.menuActive = true;
                var Menu = document.getElementById("GameMenu");
                this.menuPos.left = Menu.clientLeft+160;
                this.menuPos.top = Menu.clientTop+170;
            },
            hideGameMenu(){
                this.menuActive = false;
            },
            toHepleCenter(){
                 this.$router.push('/helpcenter');
            },
            async JumpToThird(gameId, platform){
                console.log(gameId, platform)
                let jumpData = platform == '2' ? await getAgLoginUrl() : await getVrLoginUrl(gameId);
                if(jumpData.code == 0) {
                    window.open(jumpData.result.loginUrl);
                } else {
                    this.$message.error('游戏暂未接入')
                }

            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/main';
    @import url("//unpkg.com/element-ui@2.1.0/lib/theme-chalk/index.css");
    .top{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #ff6666;
    }
    .uls-enter-active {
        transform: translateY(0);
        transition: all 0.3s ease;
    }

    .uls-leave-active {
        transform: translateY(-100%);
        transition: all 0.3s ease;
        opacity: 1;
    }

    .uls-enter {
        transform: translateY(100%);
        opacity: 0;

    }
    .uls-leave {
        transform: translateY(0);
        opacity:0;

    }
    .el-pagination{
        margin: 0 auto;
        text-align: center;
    }
    .el-dialog__body{
        padding: 30px 0px;
    }
    .notice_list {
        margin-bottom: 10px;
    }
    .notice_list li{
        border-bottom: 1px solid #dcdddd;
    }
    .notice_list li a{
        color: #000;
        font-size: 16px;
        padding: 5px 0 5px 10px;
        display: block;
    }
    .notice_list li span{
        float: right;
    }

</style>
