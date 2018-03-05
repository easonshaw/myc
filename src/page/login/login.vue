<template>
    <div class="loginContainer">
        <div class="logo">
            <img src="../../images/login_logo.png" />
        </div>
        <ul class="loginNav">
            <li class="current"><router-link :to="{path: '/login'}">用户登录</router-link></li>
            <li><router-link :to="{path: '/home'}">线路检测</router-link></li>
            <li><a @click="downAppdialogVisible = true">下载中心</a></li>
        </ul>
        <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input class="loginForm-input" placeholder="请输入用户名" type="text" v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input class="loginForm-input" placeholder="请输入密码"  type="password" v-model="loginForm.password" auto-complete="off"> </el-input>
                <span><a class="forgetPasswd" @click="forgetPasswd">忘记密码?</a></span>
            </el-form-item>
            <el-form-item label="验证码" prop="vcode">
                <el-input class="loginForm-input" placeholder="请输入验证码" type="text" v-model="loginForm.vcode"></el-input> <img class="vcode" @click="getCaptchaCode" v-show="captchaCodeImg" :src="captchaCodeImg">
            </el-form-item>
            <el-form-item>
                <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading" class="loginSubmit" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="contact"> <a href="javascript:;" >联系客服</a> </div>
        <footcopyright></footcopyright>
        <dialogDownApp :downAppdialogVisible="downAppdialogVisible" @on-downapp-result-change="ondownAppResultChange"></dialogDownApp>

        <el-dialog :title="agreeloginDialogTitle" custom-class="agreelogin_dialog" :visible.sync="showAgreeLogin"  width="600px" :before-close="agreeloginhandleClose">
            <p class="title">请先仔细阅读《用户协议》（鼠标向下移动右侧的滚动条即可查看全部内容），点击下方的“同意”按钮后，即表示您同意并接受《用户协议》全部内容，同时您将完成本次登录操作！如果您点击”不同意”按钮表示您对本协议有不同意见，将退出本次操作！</p>
            <div class="agreeContent">
                <p>一、   为避免于本网站投注时之争议，请会员务必于进入网站前详阅本平台所定之各项规则，客户一经“我同意”进入本网站进行投注时，即被视为已接受本娱乐城的所有协议与规则。</p>
                <p>二、   请定期修改自己的登录密码及资金密码，会员有责任确保自己的帐户以及登录资料的保密性，以会员帐号及密码进行的任何网上投注，将被视为有效。敬请不定时做密码变更之动作。若帐号密码被盗用，进行的投注，本公司一概不负赔偿责任。</p>
                <p>三、   投注相关条款：<br/>
                    ①网上投注如未能成功提交，投注将被视为无效。<br/>
                    ②凡玩家于开奖途中且尚无结果前自动或强制断线时，并不影响开奖结算之结果。<br/>
                    ③若遇官网未开奖或开奖结果错误，本平台将根据实际情况做退奖退买处理。<br/>
                    ④如遇发生不可抗拒之灾害，黑客入侵，网络问题造成数据丢失的情况，以本公司公告为最终方案。<br/>
                    ⑤本公司将会对所有的电子交易进行记录，如有任何争议，本公司将会以注单记录为准。</p>
                <p>四、   若经本公司发现会员以不正当手法(利用外挂程序)进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注情事发生，本公司保留权利取消该类注单以及注单产生之红利，并停用该会员帐号。无论代理还是会员，发现漏洞隐瞒不报，利用漏洞恶意刷钱、通过非法手段作弊、或造谣污蔑，攻击平台者，经平台核实后一律无条件永久冻结账号处理，账号所有金钱概不退还。</p>
                <p>五、   若发生会员投注彩种时，若因官网因素尚未开奖，将从第一次未开奖期数时间开始累积未开奖期数达5期，平台将统一系统于第6期退还投注本金，不得异议。</p>
                <p>六、   若本公司发现会员有重复申请帐号行为时，保留取消、收回会员所有投注盈利、优惠红利，以及优惠红利所产生的盈利之权利。每位玩家、同一帐户/家庭/户籍地址/电邮地址/电话号码/付款帐号（如借记卡/信用卡）/ IP地址/共享电脑环境(如网吧、学校、公共图书馆或工作场所)只能够拥有一个会员帐号，各项投注盈利、各项优惠申请只适用于每位客户在本公司唯一的帐户。</p>
                <p>七、   本平台高频彩种每期最高派彩金额200,000元，超出按200,000元计算，超出的奖金无效并清0；低频彩种每期最高派彩金额150,000元，超出按150,000元计算，超出的奖金无效并清0。 每位玩家、同一帐户/家庭/户籍地址/电邮地址/电话号码/付款帐号（如借记卡/信用卡）/ IP地址/共享电脑环境 (如网吧、学校、公共图书馆或工作场所)只能够拥有一个会员帐号，若本公司发现会员有重复帐号投注，每期最高盈利奖金视同同一名会员投注，将平均派发盈利奖金。</p>
                <p>八、   本平台任何彩种每期单挑模式每其最高派彩奖金限额30,000元，超出按30,000元计算，超出的奖金无效并清0；单挑模式说明：彩种和玩法通过换算后属于单挑规定之内的，中奖慨率低于1%的均为单挑模式。</p>
                <p>【高频时时彩以及低频彩系列】<br/>
                    （五星）[五星直选玩法]1000注包含以内，[五星组选120]6注包含以内,[五星组选60]16注包含以内,[五星组选30]33注包含以内,[五星组选20]50注包含以内,[五星组选10]90注包含以内,[五星组选5]90注包含以内。<br/>
                    （四星） [四星直选玩法]100注包含以内，[四星组选24]4注包含以内，[四星组选12]8注包含以内，[四星组选6]16注包含以内，[四星组选4]25注包含以内。<br/>
                    （三星） [三星直选玩法]10注包含以内，[三星组三]3注包含以内，[三星组六]1注，[三星混合组选]3注包含以内,[三星组选和值]3注包含以内,[三星特殊玩法系列：豹子、对子、顺子、半顺、杂六]1注。<br/>
                    （二星） [二星直选玩法]1注。<br/>
                    （任选玩法） [任选四直选玩法] 100注包含以内,[任选四组选24] 1注包含以内,[任选四组选12] 8注包含以内,[任选四组选6] 15注包含以内,[任选四组选4] 25注包含以内,[任选三直选玩法]10注包含以内,[任选三组选组三]3注包含以内,[任选三组选组六]1注包含以内, [任选二直选玩法]1注。</p>
                <p>【高频PK10以及11选5系列】<br/>
                    （pk10） [pk10前五玩法]302注包含以内,[pk10前四玩法]50注包含以内,[pk10前三玩法]7注包含以内。
                    （11选5） [11选5前二直选玩法]1注，[11选5前三直选玩法]9注包含以内，[11选5前三组选玩法]1注, [11选5趣味型玩法]4注包含以内,[任选五中五]以及[任选五中五胆拖]5注包含以内。</p>
                <p>【快三系列】 <br/>
                    [和值玩法]2注包含以内,[三同号单选]2注包含以内......等等。
                    每位玩家、同一帐户/家庭/户籍地址/电邮地址/电话号码/付款帐号（如借记卡/信用卡）/ IP地址/共享电脑环境(如网吧、学校、公共图书馆或工作场所)只能够拥有一个会员帐号，若本公司发现会员有重复帐号投注，每期单挑盈利奖金视同同一名会员投注，将平均派发盈利奖金。 </p>
                <p>九、   本平台取款时间为24小时，每日5次，每次最低100元,最高50,000元，由于自身绑定账号错误或者提款自行取消等自身问题造成的取款次数减少失效，平台慨不负责。对于日量较大的客户，根据自身情况可向平台申请专线VIP通道，平台将提供专线服务，让客户享受更便利的取款服务。 </p>
                <p>十、   平台严禁内招，首次发现冻结账号30天处理，期间不允许任何开号和招商。第二次发现直接封号或降级处理。情形严重，扰乱市场者，直接驱逐出平台，拉入平台黑名单，永久不再接纳。 </p>
                <p>十一、  为了防止有人恶意洗钱，会员提款必须要消费充值的30%方可免手续费，否则无法进行提交提款申请单动作。 </p>
                <p>十二、  平台客服没有任何QQ及其他联系方式，唯一途经使用平台内聊天室，其他均为假冒，请牢记，因此类问题上当受骗平台慨不负责。 </p>
                <p>十三、  不经核实乱放高点，恶意利用手中配额扰乱市场者，广告词中以超高返点分红为诱饵，回收全部配额处理，严重的降级或者封号。 </p>
                <p>十四、  银行、支付宝、微信或财付通等平台提供的充值账号不定期更换，请每次充值前务必打开充值界面获取最新收款账号，如自行打款到已停用帐号，造成的任何损失需自行承担，平台一律不予负责。 </p>
                <p>十五、  本公司保留不定时修改或增加本协定或游戏规则或保密条例等的操作权利，更改之条款将从更改发生后立即生效，并保留一切有争议事项及最后的决策权。</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" round @click="agreeLoginMethod(true)">同意</el-button>
                <el-button type="info" round @click="agreeLoginMethod(false)">不同意</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {getcaptchacode, accountLogin, userExists, signout} from '../../service/getData'
    import footcopyright from 'src/components/footer/footCopyright.vue'
    import dialogDownApp from 'src/components/common/dialogDownApp.vue'

    export default {
        data(){
            var validateUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                if (value.length < 5 || value.length > 20) {
                    return callback(new Error('请输入5-20位长度的用户名'));
                }
                callback();
            };
            var validatePassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                if (value.length < 5 || value.length > 20) {
                    return callback(new Error('请输入5-20位长度的密码'));
                }
                callback();
            };
            var validateVcode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                if (value.length != 4) {
                    return callback(new Error('请输入4位长度的验证码'));
                }
                callback();
            };

            return {

                loginForm: {
                    username: 'test001zhis1',
                    password: 'sky888',
                    vcode: '1111'
                },
                loginRule: {
                    username: [{ validator: validateUsername, trigger: 'blur' }],
                    password: [{ validator: validatePassword, trigger: 'blur' }],
                    vcode: [{ validator: validateVcode, trigger: 'blur' }],
                },
                alert: {
                    content: ' ',
                    ok: '返回'
                },
                tipFlag: false,
                fullscreenLoading: false,
                showAgreeLogin: false,
                agreeLogin: false,
                logging: false, //登录中
                downAppdialogVisible: false, // 下载中心
                qrcodeiosActive: true,
                userInfo: null,
                captchaCodeImg: '',
                agreeloginDialogTitle: '',
            }
        },
        created(){
            this.getCaptchaCode();
        },
        components: {
            footcopyright,
            dialogDownApp,
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await getcaptchacode();
                this.captchaCodeImg = "data:image/png;base64,"+res;
            },
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitFormLogin();
                    } else {
                        return false;
                    }
                });

            },
            async submitFormLogin() {
                this.fullscreenLoading = true;
                let my = this.userInfo = await accountLogin(this.loginForm.username, this.loginForm.password, this.loginForm.vcode);
                this.fullscreenLoading = false;
                if(this.userInfo.code == 0){
                    this.showAgreeLogin = true;
                    this.agreeloginDialogTitle = '欢迎回来，'+this.userInfo.result.userName+'';
                } else {
                    this.$message.error(this.userInfo.msg);
                }
            },
            agreeLoginMethod(agree) {
                this.showAgreeLogin = false;
                if(agree == true) {
                    this.$router.push('/main');
                }
            },
            agreeloginhandleClose() {
                this.showAgreeLogin = false;
            },
            ondownAppResultChange(val) {
                this.downAppdialogVisible = val;
            },
            async checkforgetPasswd(value, done) {
                let userExistsData = await userExists(value);
                if(userExistsData.code == 0 && userExistsData.result.flag == true){
                    this.$router.push('/forget/'+value);
                    done();
                } else {
                    this.$message.error('系统不存在此用户');
                }
            },
            forgetPasswd() {
                this.$prompt('用户名', '忘记密码-用户名认证', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-zA-Z0-9_-]{5,20}$/,
                    inputErrorMessage: '请输入5-20位用户名',
                    beforeClose:  (action, instance, done, value) => {
                        if (action === 'confirm') {
                            this.checkforgetPasswd(instance.inputValue, done)
                        } else {
                            done();
                        }
                    }
                }).then(({ value }) => {

                }).catch(() => {

                });
            },
            download (){

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.1.0/lib/theme-chalk/index.css");
    .loginContainer {
        width: 100%;
        height: 100%;
        background: url(../../images/login-bg.png) no-repeat 50%;
        background-size: cover;
        p, span, input {
            font-family: Helvetica Neue, Tahoma, Arial;
        }

        .logo {
            padding-top: 0px;
            text-align: center;
        }

        .loginNav {
            width: 500px;
            margin: 0px auto;
            height: 45px;
            margin-top: 0px;
        }

        .loginNav li {
            width: 160px;
            height: 45px;
            float: left;
            margin-right: 10px;
        }

        .loginNav li:last-child {
            margin-right: 0;
        }

        .loginNav li a {
            background: #c9caca;
            color: #727171;
            display: block;
            height: 40px;
            line-height: 40px;
            margin-bottom: 5px;
            text-decoration: none;
            cursor: pointer;
            font-size: 18px;
            border-radius: 5px 5px 0 0;
            text-align: center;
        }

        .loginNav li.current a {
            background: #fff;
            height: 45px;
            line-height: 40px;
            margin-bottom: 5px;
            margin-bottom: 0;
            color: #eb6464;
        }

        .loginForm {
            width: 500px;
            padding: 30px 0 5px 0;
            margin: 0px auto;
            background: #fff;
            border-radius: 0 0 5px 5px;
            margin-bottom: 0px;
        }

        .loginForm .loginForm-input {
            width: 240px;
            height: 40px;
        }

        .loginForm .loginForm-input .el-input__inner {
            height: 40px;
        }

        .loginForm .vcode {
            height: 40px;
            vertical-align: bottom;
            margin-left: 10px;
            cursor: pointer;
        }

        .loginForm .forgetPasswd {
            cursor: pointer;
            font-size: 12px;
            color: #d84315;
            margin-left: 10px;
        }

        .loginForm .forgetPasswd:hover {
            text-decoration: underline;
        }

        .loginForm .download {
            cursor: pointer;
        }

        .loginForm .loginSubmit {
            width: 300px;
            height: 45px;
            color: #fff;
            font-size: 18px;
            margin: 10px auto;
        }

        .loginForm .loginSubmit > span {
            color: #fff;
        }

        .contact {
            width: 500px;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            list-style: none;
            text-align: right;
        }

        .contact a {
            color: #FFF;
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>
