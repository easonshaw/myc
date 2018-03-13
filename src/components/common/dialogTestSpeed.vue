<template>
    <div id="dialog-testspeed">
        <el-dialog  :show-close="false" title="" custom-class="testspeed_dialog" :visible.sync="dialogVisible" :before-close="testspeedhandleClose"  width="940px" >
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

            </div>
            <div class="clear"></div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser} from '../../service/getData'
    import VueClipboard from 'vue-clipboard2'
    Vue.use(VueClipboard);
    export default {
        data(){
            return{
                dialogVisible: this.testspeeddialogVisible,
                speeds: [],
            }
        },
        mounted() {
            this.refreshSpeed()
        },
        props: ['testspeeddialogVisible'],
        methods: {
            testspeedhandleClose(){
                this.dialogVisible = false;
            },
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
        },
        watch: {
            testspeeddialogVisible: function (value){
                this.dialogVisible = this.testspeeddialogVisible;
                this.refreshSpeed();
            },
            dialogVisible: function(val) {
                this.$emit("on-testspeed-result-change",val);
            },

        }
    }
</script>

<style lang="scss" scoped>
    .speedtest{
        width: 900px;
        padding:25px 0px;
        background: #FFF;
        margin: 0 auto;
        border-radius: 3px;
        margin-bottom: 0px;
        height: auto;
    }
    .speedtest ul{
        width: 840px;
        margin: 0 auto;
    }
</style>