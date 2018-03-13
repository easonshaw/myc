<template>
    <div class="loginContainer">
        <div class="logo">
            <img src="../../images/login_logo.png" />
        </div>
        <div class="speedtest">
            <p>*贴心提醒:测速数值越小，访问速度越快！</p>
            <ul>
                <li v-for="(speed, key) in speeds">
                    <div class="linespeed"> <span class='line'>线路{{key+1}} <em :class="speed.speedlevel">({{speed.speedtag}})</em></span> <span class="speed" :class="'speed'+speed.speedlevel">速度 <i class="iconfont icon-sudu"></i><em >{{speed.speednumber}}ms</em></span></div>
                    <div class="lineurl">{{speed.urltit}} <span v-clipboard:copy="speed.url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></div>
                    <div class="lineaccess"><a class="accessurl" :href="speed.url">立即访问</a></div>
                </li>
            </ul>
            <div class="clear speedstatuslist">
                <span class="a">最佳</span>
                <span class="b">良好</span>
                <span class="c">一般</span>
            </div>
            <div class="refresh">
                <a class="refreshSpeed" href="javascript:;" @click="refreshSpeed">重新刷新检测您的访问速度</a>
            </div>
        </div>
        <ul class="browser">
            <li><a href="http://www.google.cn/chrome/browser/desktop/index.html"><span><i class="iconfont icon-chrome"></i></span>谷歌浏览器</a></li>
            <li><a href="http://www.firefox.com.cn/"><span><i class="iconfont icon-firefox"></i></span>火狐浏览器</a></li>
            <li><a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie"><span><i class="iconfont icon-ie"></i></span>IE 浏览器</a></li>
        </ul>
        <div class="copyright">
            <p>
                © 2018 墨月城 Games. All Rights Reserved. <br>
                为了保证最佳使用体验，请您的屏幕分辨率在1280以上，並建議您使用Chrome,friefox,IE10以上的最佳浏览效果
            </p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import VueClipboard from 'vue-clipboard2'
    import {getcaptchacode, accountLogin, signout} from '../../service/getData'
    Vue.use(VueClipboard);
    export default {
        data(){
            return {
                speeds: [],
            }
        },
        created(){
            
        },
        components: {

        },
        mounted() {
            this.refreshSpeed()
        },
        computed: {
            
        },
        methods: {
            onCopy (){
                this.$message({
                      message: '地址复制成功',
                      type: 'success'
                    });
            },
            onError () {
                this.$message.error('地址复制失败,请手动复制.');
            },
            refreshSpeed() {
                this.speeds = [
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'a', 'speednumber': parseInt(20*Math.random())},
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'a', 'speednumber': parseInt(40*Math.random())},
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'b', 'speednumber': parseInt(60*Math.random())},
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'b', 'speednumber': parseInt(80*Math.random())},
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'c', 'speednumber': parseInt(200*Math.random())},
                    {'url': 'http://d1.myc178.com/index.html#/login', 'urltit':'http://d1.myc178.com/', 'speedtag': '最佳', 'speedlevel': 'c', 'speednumber': parseInt(300*Math.random())},
                ]
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.1.0/lib/theme-chalk/index.css");
    .loginContainer{
        width: 100%;
        height: 100%;
        background: url(../../images/login-bg.png) no-repeat 50%;
        background-size: cover;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        .logo{
            padding-top: 0px;
            text-align: center;
        }

        .contact a{
            color: #FFF;
            cursor: pointer;
            text-decoration: underline;
        }
        .browser{
            width: 500px;
            height: 60px;
            line-height: 60px;
            margin: 0 auto;
            list-style: none;
        }
        .browser li{
            width: 160px;
            height: 60px;
            float: left;
            margin-right: 10px;
            overflow: hidden;
        }
        .browser li:last-child{
            margin-right: 0;
        }
        .browser li a {
            display: block;
            color: #fff;
            text-decoration: none;
            font-size: 14px;
            text-align: left;
        }
        .browser li a:hover{
            text-decoration: none;
            color: #fff;
        }
        .browser li a span{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            margin-right: 10px;
        }
        .browser li:first-child a span{
            background: #56aa72;
        }
        .browser li:nth-child(2)  a span{
            background: #ea8914;
        }
        .browser li:nth-child(3)  a span{
            background: #2f6ab3;
        }
        .browser li a span i{
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
        .copyright{
            width: 700px;
            margin: 0 auto;
            font-size: 12px;
            line-height: 1.6em;
            color: #fff;
            padding: 20px 0;
            text-align: center;
        }
    }

</style>
