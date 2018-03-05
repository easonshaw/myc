<template>
    <div id="dialog-downapp">
        <el-dialog title="下载中心" custom-class="downapp_dialog" :visible.sync="dialogVisible" :before-close="downApphandleClose"  width="500px" >
            <div class="downtype">
                <a href="javascript:;" @click="mobile=true" v-bind:class="{ active: mobile }">手机客户端APP下载</a>
                <a href="javascript:;" @click="mobile=false" v-bind:class="{ active: !mobile }">PC客户端下载</a>
            </div>
            <div class="mobileDown" v-if="mobile">
                <div class="attention">
                    <p>注意事项：</p>
                    <p>使用一些微信、QQ等内建QR Code扫描会有被阻挡下载的情况，<em>强烈建议使用推荐QR Code扫描器扫描</em></p>
                </div>
                <ul class="qrcode">
                    <li v-bind:class="{ active: qrcodeiosActive }" qrcodeTye="ios" @click="qrcodeiosActive = true" ><a href="javascript:;"><img src="../../images/qrcode-ios.png" /> <p>IOS<span class="arrow"></span></p></a></li>
                    <li v-bind:class="{ active: !qrcodeiosActive }" qrcodeTye="android" @click="qrcodeiosActive = false" ><a href="javascript:;"><img src="../../images/qrcode-android.png" /> <p>Android<span class="arrow"></span></p></a></li>
                </ul>
                <div class="clear"></div>
                <div class="showcontent">
                    <div v-show="qrcodeiosActive">
                        <p class="title">IOS下载安装步骤（支持IOS7.1以上）</p>
                        <p>支持IOS7.1以上<br/>
                            1. 使用二维码工具扫描二维码。<br/>
                            2. 开启页面后点击立即安装。<br/>
                            3. 安装完成之后，即可在手机桌面看到墨月城图示。<br/>
                            4. 设置信任套件，信任操作：<span>设定</span>＞<span>通用</span>＞<span>描述文件</span>＞<span>信任</span>。</p>
                    </div>
                    <div v-show="!qrcodeiosActive">
                        <p class="title">Android下载安装步骤</p>
                        <p>1.使用二维码工具扫描二维条码。<br/>
                            2.开启页面后，系统将会开始自动下载。<br/>
                            3.下载完成后，点击”安装”按钮即可。</p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="pcdown" v-else>
                <div class="attention">
                    <p>随时随地·畅游无阻</p>
                </div>
                <div class="showimg" >
                    <img  src="../../images/pcdownload.png" />
                    <div class="downloadpc"><el-button type="danger">点击下载</el-button></div>
                </div>
                <div class="showcontent">
                    <div >
                        <p class="title">PC端下载安装</p>
                        <p>支持IOS7.1以上<br/>
                            支持win7/win8/win10<br/>
                            1. 根据您当前最快的网络环境推荐3条最快的登录地址。<br/>
                            2. 随时随地，想开就开，想玩就玩。<br/>
                            3. 下载1次，永久自动更新。</p>
                    </div>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {signout, getUser} from '../../service/getData'
    export default {
        data(){
            return{
                mobile: true,
                qrcodeiosActive: true,
                dialogVisible: this.downAppdialogVisible
            }
        },
        mounted(){

        },
        props: ['downAppdialogVisible'],
        methods: {
            downApphandleClose(){
                this.dialogVisible = false;
            }
        },
        watch: {
            downAppdialogVisible: function (value){
                this.dialogVisible = this.downAppdialogVisible;
            },
            dialogVisible: function(val) {
                this.$emit("on-downapp-result-change",val);
            },

        }
    }
</script>

<style lang="scss" scoped>

</style>