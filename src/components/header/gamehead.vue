<template>
    <div class="gameheader">
        <div class="container">
            <div class="logo">
                <span><img :src="logo" alt=""></span>
            </div>
            <div class="gameTime">
                <a @click="musictoggle" href="javascript:;" class="music"><i :class="music.class"></i></a>
                <div class="curissue">第{{gameDt.curissue}}期<br />距离投注截至还有</div>
                <div class="digits remainedtime">
                    <div class="digits_hour">
                        <span class="digits_ele hour_1"><img :src="gameDt.digits.hour1"/> </span>
                        <span class="digits_ele hour_1"><img :src="gameDt.digits.hour1"/></span>
                    </div>
                    <div class="digits_colon"></div>
                    <div class="digits_minute">
                        <span class="digits_ele minute_1"><img :src="gameDt.digits.minute1"/></span>
                        <span class="digits_ele minute_1"><img :src="gameDt.digits.minute2"/></span>
                    </div>
                    <div class="digits_colon"></div>
                    <div class="digits_seconds">
                        <span class="digits_ele seconds_1"><img :src="gameDt.digits.seconds1"/></span>
                        <span class="digits_ele seconds_1"><img :src="gameDt.digits.seconds2"/></span>
                    </div>
                </div>
            </div>
            <div class="lotteryNumber">
                <div class="title">第{{recentissue}}期 <span class="history"><i class="iconfont icon-zoushi"></i><router-link :to="{name: 'main'}"> 更多走势</router-link></span></div>
                <ul class="lastdigit" id="lastdigit">
                    <li>
                        <div class="slotMachineContainer" >
                            <span>{{recentlist.a}}</span>
                            <span class="">00</span>
                            <span class="">01</span>
                            <span class="">02</span>
                            <span class="">03</span>
                            <span class="">04</span>
                            <span class="">05</span>
                            <span class="">06</span>
                            <span class="">07</span>
                            <span class="">08</span>
                            <span class="">09</span>
                            <span>00</span>
                        </div>
                    </li>
                    <li>
                        <div class="slotMachineContainer" >
                            <span>{{recentlist.b}}</span>
                            <span class="">00</span>
                            <span class="">01</span>
                            <span class="">02</span>
                            <span class="">03</span>
                            <span class="">04</span>
                            <span class="">05</span>
                            <span class="">06</span>
                            <span class="">07</span>
                            <span class="">08</span>
                            <span class="">09</span>
                            <span>00</span>
                        </div>
                    </li>
                    <li>
                        <div class="slotMachineContainer" >
                            <span>{{recentlist.c}}</span>
                            <span class="">00</span>
                            <span class="">01</span>
                            <span class="">02</span>
                            <span class="">03</span>
                            <span class="">04</span>
                            <span class="">05</span>
                            <span class="">06</span>
                            <span class="">07</span>
                            <span class="">08</span>
                            <span class="">09</span>
                            <span>00</span>
                        </div>
                    </li>
                    <li>
                        <div class="slotMachineContainer" >
                            <span>{{recentlist.d}}</span>
                            <span class="">00</span>
                            <span class="">01</span>
                            <span class="">02</span>
                            <span class="">03</span>
                            <span class="">04</span>
                            <span class="">05</span>
                            <span class="">06</span>
                            <span class="">07</span>
                            <span class="">08</span>
                            <span class="">09</span>
                            <span>00</span>
                        </div>
                    </li>
                    <li>
                        <div class="slotMachineContainer" >
                            <span>{{recentlist.e}}</span>
                            <span class="">00</span>
                            <span class="">01</span>
                            <span class="">02</span>
                            <span class="">03</span>
                            <span class="">04</span>
                            <span class="">05</span>
                            <span class="">06</span>
                            <span class="">07</span>
                            <span class="">08</span>
                            <span class="">09</span>
                            <span>00</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <dialogIssueClose :timeout="3" @on-issue-result-change="onIssueResultChange" center :issue="gameDt.curissue" :issueClosedialogVisible="issueClosedialogVisible" ></dialogIssueClose>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {} from '../../service/getData'
    import dialogIssueClose from 'src/components/common/dialogIssueClose.vue'
    export default {
        data(){
            return{
                issueClosedialogVisible: false,
                logo: '',
                timeTag:{
                    0: require('../../images/time-0.png'),
                    1: require('../../images/time-1.png'),
                    2: require('../../images/time-2.png'),
                    3: require('../../images/time-3.png'),
                    4: require('../../images/time-4.png'),
                    5: require('../../images/time-5.png'),
                    6: require('../../images/time-6.png'),
                    7: require('../../images/time-7.png'),
                    8: require('../../images/time-8.png'),
                    9: require('../../images/time-9.png'),
                },
                gameDt: {
                    curissue: '0000000000',
                    endtime: '',
                    digits:{
                        hour1: require('../../images/time-0.png'),
                        hour2: require('../../images/time-0.png'),
                        minute1: require('../../images/time-0.png'),
                        minute2: require('../../images/time-0.png'),
                        seconds1: require('../../images/time-0.png'),
                        seconds2: require('../../images/time-0.png'),
                    }
                },
                music:{
                    class: 'iconfont icon-guanbishengyin',
                    allow: true,
                },
                recentissue: '',
                recentlist: {a:0, b:0, c:0, d:0, e:0},
            }
        },
        props: ['gameId', 'platform', 'recent', 'issue'],
        mounted(){
        },
        components:{
            dialogIssueClose
        },
        computed:{
        },
        created(){
            this.initHeadData();
            this.loadrecent();
        },
        watch: {
            '$route': function(to, from) {
                this.initHeadData();
                this.loadcurissue();
            },
            'recent': function(to, form) {
                this.loadrecent();
            },
            'issue': function(to, form) {
                this.loadcurissue();
                console.log('to:', to, 'form', form)
                this.issuetimer();
            }
        },
        methods:{
            initHeadData(to) {
                if(this.platform == '1'){
                    //平台
                    let lg = this.$route.params.id == undefined ? (this.gameId == undefined ? 3 : this.gameId) : this.$route.params.id;
                    this.logo = require('../../images/game-logo-'+lg+'.png');
                }
            },
            musictoggle(){
                console.log(this.music)
                this.music.allow = !this.music.allow;
                this.music.class = this.music.allow == true ? 'iconfont icon-guanbishengyin' : 'iconfont icon-wenxintishi';
            },
            loadrecent(){
                if(this.recent != null){
                    let recentArray = this.recent.lotteryNumber.split(' ');
                    this.recentissue = this.recent.issue;
                    this.recentlist.a = recentArray[0];
                    this.recentlist.b = recentArray[1];
                    this.recentlist.c = recentArray[2];
                    this.recentlist.d = recentArray[3];
                    this.recentlist.e = recentArray[4];
                }
            },
            loadcurissue() {
                this.gameDt.curissue = this.issue.issue;
                let issueData = this.issue;
            },
            onIssueResultChange(val){
                this.issueClosedialogVisible = val;
            },
            issuetimer() {
                let self = this;
                let timepieces = self.issue.currentTime - (new Date()).getTime() ;
                let timer = setInterval(function(){
                    let nowTime = new Date(new Date().getTime() + timepieces); // + timepieces
                    let endTime = new Date(self.issue.closeTime);
                    let t = endTime.getTime() - nowTime.getTime();
                    if(t > 0) {
                        let day = Math.floor(t / 86400000);
                        let hour = Math.floor((t / 3600000) % 24);
                        let min = Math.floor((t / 60000) % 60);
                        let sec = Math.floor((t / 1000) % 60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        let format = '';
                        if (day > 0) {
                            format = `${day}天${hour}小时${min}分${sec}秒`;
                        }
                        if (day <= 0 && hour > 0) {
                            format = `${hour}小时${min}分${sec}秒`;
                        }
                        if (day <= 0 && hour <= 0) {
                            format = `${min}分${sec}秒`;
                        }
                        format = `${hour}:${min}:${sec}`;
                        self.gameDt.digits.hour1 = self.timeTag[(hour.toString().split(''))[0]];
                        self.gameDt.digits.hour2 = self.timeTag[(hour.toString().split(''))[1]];
                        self.gameDt.digits.minute1 = self.timeTag[(min.toString().split(''))[0]];
                        self.gameDt.digits.minute2 = self.timeTag[(min.toString().split(''))[1]];
                        self.gameDt.digits.seconds1 = self.timeTag[(sec.toString().split(''))[0]];
                        self.gameDt.digits.seconds2 = self.timeTag[(sec.toString().split(''))[1]];
                    }else{
                        clearInterval(timer);
                        self.issueClosedialogVisible = true;
                        self.$emit('refreshIssue');
                        setTimeout(function() {
                            //issuebetclose.close()
                        }, 3000);
                        console.log(t, nowTime, endTime, timer);
                    }
                }, 1000);
            }
        },
    }

</script>

<style lang="scss" scoped>
    .gameheader{
        width: 100%;
        background: #FFF;
        height: 110px;
        border-top: 1px solid #ff9966;
        border-bottom: 1px solid #ff9966;
        margin-bottom: 20px;
    }
    .gameheader .container{
        width: 1200px;
        margin: 0 auto;
    }
    .gameheader .container .logo{
        height: 110px;
        padding: 10px 20px 10px 0;
        float: left;
    }
    .gameheader .container .logo span{
        height: 90px;
        width: 200px;
        float: left;
        text-align: center;
    }
    .gameheader .container .logo span img{
        height: 100%;
    }
    .gameTime{
        width: 430px;
        height: 90px;
        margin-top: 10px;
        padding: 25px 0;
        padding-left: 40px;
        border-left: 1px solid #e1e1e6;
        float: left;
        position: relative;
        margin-right: 60px;
    }
    .gameTime .curissue{
        color: #515151;
        float: left;
    }
    .gameTime .music{
        width: 25px;
        height: 25px;
        position: absolute;
        top: 0;
        right: 0;
    }
    .gameTime .music .iconfont{
        font-size: 25px;
        color: #ff6666;
    }
    .digits{
        float: right;
        padding-top: 3px;
    }
    .digits_hour,
    .digits_minute,
    .digits_seconds{
        width: 68px;
        height: 37px;
        float: left;
    }
    .digits_colon{
        width: 15px;
        height: 37px;
        background: url('../../images/colon.png') top center no-repeat;
        float: left;
        margin-right: 3px;
    }
    .digits_ele{
        width: 31px;
        height: 37px;
        float: left;
        margin-right: 3px;
    }
    .lotteryNumber{
        width: 290px;
        height: 90px;
        margin-top: 10px;
        float: left;
    }
    .lotteryNumber .title{
        color: #515151;
        font-size: 14px;
    }
    .lotteryNumber .title span.history{
        float: right;
    }
    .lotteryNumber .title span.history .iconfont{
        color: #f63942;
    }
    .lotteryNumber .title span.history a{
        color: #515151;
    }
    .lotteryNumber .lastdigit{
        margin-top: 15px;
        width: 295px;
        height: 43px;
        overflow: hidden;
    }
    .lotteryNumber .lastdigit li{
        width: 43px;
        height: 43px;
        line-height: 43px;
        margin-right: 20px;
        border-radius: 50%;
        float: left;
        border: 2px solid #ff9966;
        background: -moz-radial-gradient(left top,#ffffff 0%,#fafafa);
        background: -webkit-radial-gradient(left top,#ffffff 0%,#fafafa);
    }
    .lotteryNumber .lastdigit li:last-child{
        margin-right: 0;
    }
    .lotteryNumber .lastdigit li .slotMachineContainer{
        width: 39px;
        height: 39px;
        line-height: 39px;
        text-align: center;
    }
    .lotteryNumber .lastdigit li .slotMachineContainer span{
        width: 39px;
        height: 39px;
        line-height: 39px;
        display: block;
        color: #ff9966;
        font-size: 16px;
        font-weight: bold;
    }
</style>
